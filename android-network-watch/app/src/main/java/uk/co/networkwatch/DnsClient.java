package uk.co.networkwatch;

import android.util.Base64;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Read-only opt-in AdGuard Home API reader. Never collects packet traffic. */
public final class DnsClient {
  public static class Result {
    public final Map<String,List<String>> recent = new LinkedHashMap<>();
    public int requests = 0;
  }
  private static boolean localAddress(String address) {
    try {
      String[] parts=address.split("\\.");
      if(parts.length!=4)return false;
      int[] n=new int[4];
      for(int i=0;i<4;i++){n[i]=Integer.parseInt(parts[i]);if(n[i]<0||n[i]>255)return false;}
      return n[0]==10||(n[0]==192&&n[1]==168)||(n[0]==172&&n[1]>=16&&n[1]<=31);
    }catch(Exception e){return false;}
  }
  public static Result read(String endpoint,String user,String password)throws Exception{
    URI base=new URI(endpoint.trim());
    String scheme=base.getScheme();
    if(!("https".equalsIgnoreCase(scheme)||"http".equalsIgnoreCase(scheme))||base.getHost()==null
        ||!localAddress(base.getHost())||base.getUserInfo()!=null||base.getQuery()!=null
        ||base.getFragment()!=null)throw new Exception("Use an AdGuard Home URL at a private LAN IPv4 address.");
    String prefix=endpoint.trim().replaceAll("/+$","");
    if(!prefix.endsWith("/control"))prefix+="/control";
    URL url=new URL(prefix+"/querylog?limit=250");
    HttpURLConnection connection=(HttpURLConnection)url.openConnection();
    connection.setConnectTimeout(5000);connection.setReadTimeout(6000);
    connection.setRequestProperty("Accept","application/json");
    if(!user.isEmpty()) {
      String credentials=user+":"+password;
      String auth=Base64.encodeToString(credentials.getBytes(StandardCharsets.UTF_8),Base64.NO_WRAP);
      connection.setRequestProperty("Authorization","Basic "+auth);
    }
    try{
      int code=connection.getResponseCode();
      if(code!=200)throw new Exception("AdGuard replied HTTP "+code+(code==401?" (check login details)":""));
      StringBuilder body=new StringBuilder();
      try(BufferedReader reader=new BufferedReader(new InputStreamReader(connection.getInputStream(),StandardCharsets.UTF_8))){
        char[] part=new char[1024];int count;
        while((count=reader.read(part))!=-1){
          body.append(part,0,count);
          if(body.length()>1200000)throw new Exception("DNS log response too large");
        }
      }
      JSONArray data=new JSONObject(body.toString()).optJSONArray("data");
      if(data==null)throw new Exception("Not a supported AdGuard Home query log");
      Result result=new Result();
      for(int i=0;i<data.length();i++){
        JSONObject entry=data.optJSONObject(i);if(entry==null)continue;
        String ip=entry.optString("client","");
        JSONObject question=entry.optJSONObject("question");
        if(!localAddress(ip)||question==null)continue;
        String domain=question.optString("name",question.optString("host","")).trim();
        if(domain.isEmpty())continue;
        String time=entry.optString("time","");
        if(time.length()>=19)time=time.substring(0,19).replace('T',' ');
        String blocked=entry.optString("reason","").toLowerCase(java.util.Locale.ROOT).contains("blocked")?" [blocked]":"";
        List<String> list=result.recent.get(ip);
        if(list==null){list=new ArrayList<>();result.recent.put(ip,list);}
        if(list.size()<6)list.add(domain+"  "+time+blocked);
        result.requests++;
      }
      return result;
    }finally{connection.disconnect();}
  }
}
