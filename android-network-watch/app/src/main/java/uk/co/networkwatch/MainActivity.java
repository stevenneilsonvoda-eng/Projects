package uk.co.networkwatch;

import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.net.ConnectivityManager;
import android.net.NetworkCapabilities;
import android.net.Uri;
import android.net.DhcpInfo;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.ConnectException;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.ConcurrentHashMap;

public class MainActivity extends Activity {
  private static final int BG=Color.rgb(9,17,31), PANEL=Color.rgb(21,36,57),
      WHITE=Color.rgb(239,246,252), MUTED=Color.rgb(151,176,198), GREEN=Color.rgb(50,222,174);
  private final ExecutorService background=Executors.newSingleThreadExecutor();
  private SharedPreferences prefs;
  private LinearLayout root,rows;
  private TextView wifiLine,status,summary;
  private Button scan;
  private boolean busy=false;
  private final Set<String> online=new HashSet<>();
  private final Map<String,String> openServices=new ConcurrentHashMap<>();

  @Override public void onCreate(Bundle b) {
    super.onCreate(b);
    getWindow().setStatusBarColor(BG); getWindow().setNavigationBarColor(BG);
    prefs=getSharedPreferences("inventory",MODE_PRIVATE);
    draw();
    wifiInfo();
    render();
  }
  int dp(int n) { return (int)(n*getResources().getDisplayMetrics().density+0.5f); }
  LinearLayout column() { LinearLayout l=new LinearLayout(this); l.setOrientation(1); return l; }
  TextView txt(String value,int size,int color,boolean bold) {
    TextView t=new TextView(this); t.setText(value); t.setTextColor(color); t.setTextSize(size);
    if(bold)t.setTypeface(Typeface.DEFAULT,Typeface.BOLD);return t;
  }
  void add(LinearLayout parent,View v,int gap){
    LinearLayout.LayoutParams lp=new LinearLayout.LayoutParams(-1,-2);lp.topMargin=dp(gap);parent.addView(v,lp);
  }
  GradientDrawable shape(int c,int radius){
    GradientDrawable g=new GradientDrawable();g.setColor(c);g.setCornerRadius(dp(radius));return g;
  }
  Button button(String name) {
    Button b=new Button(this);b.setText(name);b.setAllCaps(false);b.setTextColor(BG);
    b.setBackground(shape(GREEN,12));return b;
  }
  void draw(){
    ScrollView scroll=new ScrollView(this);scroll.setFillViewport(true);scroll.setBackgroundColor(BG);
    root=column();root.setPadding(dp(18),dp(22),dp(18),dp(28));scroll.addView(root);
    add(root,txt("NETWORK WATCH",13,GREEN,true),0);
    add(root,txt("Your Vodafone network",25,WHITE,true),8);
    wifiLine=txt("Checking Wi-Fi...",14,MUTED,false);add(root,wifiLine,8);
    scan=button("Scan my Wi-Fi network");add(root,scan,20);
    scan.setOnClickListener(v->begin());
    status=txt("Connect to your own home Wi-Fi, then scan.",14,MUTED,false);add(root,status,12);
    LinearLayout tools=column();tools.setPadding(dp(14),dp(10),dp(14),dp(12));tools.setBackground(shape(PANEL,14));add(root,tools,18);
    Button router=button("Open Vodafone router");add(tools,router,0);
    router.setOnClickListener(v->{
      try { startActivity(new Intent(Intent.ACTION_VIEW,Uri.parse("http://192.168.1.1"))); }
      catch(Exception e){ status.setText("Unable to open router page."); }
    });
    TextView note=txt("Router device list: SSID, bands and access points where Vodafone exposes them. DNS website activity requires a separate DNS monitoring service. This app never intercepts traffic.",12,MUTED,false);add(tools,note,12);
    summary=txt("Devices",19,WHITE,true);add(root,summary,20);
    rows=column();add(root,rows,6);
    add(root,txt("Diagnostics show detectable open TCP services, not websites visited. DNS/domain activity needs a separate DNS log source such as AdGuard Home.",13,MUTED,false),12);
    add(root,txt("Only scans your private Wi-Fi subnet. Devices blocking scans may not appear. MAC addresses, other devices' Wi-Fi bands and browsing history cannot reliably be obtained from an Android phone alone.",12,MUTED,false),18);
    setContentView(scroll);
  }
  String ip4(int n){return (n&255)+"."+((n>>>8)&255)+"."+((n>>>16)&255)+"."+((n>>>24)&255);}
  boolean isPrivate(int[] a){
    return a[0]==10 || a[0]==192&&a[1]==168 || a[0]==172&&a[1]>=16&&a[1]<=31;
  }
  boolean wifiConnected(){
    ConnectivityManager c=(ConnectivityManager)getSystemService(Context.CONNECTIVITY_SERVICE);
    NetworkCapabilities n=c==null?null:c.getNetworkCapabilities(c.getActiveNetwork());
    return n!=null&&n.hasTransport(NetworkCapabilities.TRANSPORT_WIFI);
  }
  void wifiInfo(){
    if(!wifiConnected()){wifiLine.setText("Not connected to Wi-Fi");return;}
    try{
      WifiManager w=(WifiManager)getApplicationContext().getSystemService(Context.WIFI_SERVICE);
      WifiInfo i=w.getConnectionInfo();
      DhcpInfo d=w.getDhcpInfo();
      String ssid=i==null?"Wi-Fi":i.getSSID();
      if(ssid==null||ssid.contains("unknown"))ssid="Wi-Fi connected (SSID unavailable)";
      int f=i==null?0:i.getFrequency();String band=f>=5925?"6 GHz":f>=4900?"5 GHz":f>=2400?"2.4 GHz":"band unknown";
      wifiLine.setText(ssid+"  ·  "+band+"\nLocal IP: "+(d==null?"unavailable":ip4(d.ipAddress)));
    }catch(Exception e){wifiLine.setText("Wi-Fi connected (details restricted)");}
  }
  void begin(){
    if(busy)return;
    if(!wifiConnected()){status.setText("Connect to your Vodafone Wi-Fi first, not mobile data.");return;}
    if(Build.VERSION.SDK_INT>=23 && checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION)!=PackageManager.PERMISSION_GRANTED){
      requestPermissions(new String[]{Manifest.permission.ACCESS_FINE_LOCATION},17);
      status.setText("Location permission allows Android to identify your own Wi-Fi SSID; scanning works without GPS tracking.");
      return;
    }
    busy=true;scan.setEnabled(false);online.clear();openServices.clear();render();status.setText("Checking nearby addresses and network services...");
    background.execute(()->{
      try{
        WifiManager w=(WifiManager)getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        DhcpInfo dhcp=w.getDhcpInfo();
        if(dhcp==null||dhcp.ipAddress==0){fail("No valid Wi-Fi IPv4 address.");return;}
        int[] a={dhcp.ipAddress&255,(dhcp.ipAddress>>>8)&255,(dhcp.ipAddress>>>16)&255,(dhcp.ipAddress>>>24)&255};
        if(!isPrivate(a)){fail("For safety, only private IPv4 networks can be scanned.");return;}
        String prefix=a[0]+"."+a[1]+"."+a[2]+".";
        ExecutorService pool=Executors.newFixedThreadPool(32);
        ArrayList<Future<?>> tasks=new ArrayList<>();
        Set<String> found=Collections.synchronizedSet(new HashSet<>());
        AtomicInteger finished=new AtomicInteger();
        int own=a[3];
        int[] ports={21,22,53,80,139,443,445,554,631,1883,3389,5000,5900,8009,8080,8123,9100,32400};
        for(int i=1;i<=254;i++){
          final int host=i; if(host==own)continue;
          tasks.add(pool.submit(()->{
            String ip=prefix+host;
            if(responds(ip,ports))found.add(ip);
            int n=finished.incrementAndGet();
            if(n%35==0)runOnUiThread(()->status.setText("Checking devices... "+n+"/253"));
          }));
        }
        for(Future<?> task:tasks)try{task.get();}catch(Exception ignored){}
        pool.shutdown();
        long now=System.currentTimeMillis();
        SharedPreferences.Editor edit=prefs.edit();
        for(String ip:found){ if(!prefs.contains("first_"+ip))edit.putLong("first_"+ip,now); edit.putLong("last_"+ip,now); edit.putInt("scans_"+ip,prefs.getInt("scans_"+ip,0)+1); edit.putString("ports_"+ip,openServices.getOrDefault(ip,"")); }
        edit.apply();
        runOnUiThread(()->{
          online.addAll(found);busy=false;scan.setEnabled(true);
          wifiInfo();status.setText("Scan complete. "+found.size()+" reachable devices. Tap a device to name it. Detected services may differ from actual use.");render();
        });
      }catch(Exception e){fail("Scan failed: "+e.getClass().getSimpleName());}
    });
  }
  boolean responds(String ip,int[] ports){
    boolean active=false;
    ArrayList<String> detected=new ArrayList<>();
    try { if(InetAddress.getByName(ip).isReachable(130))active=true; }catch(Exception ignored){}
    for(int port:ports){
      try(Socket sock=new Socket()){
        sock.connect(new InetSocketAddress(ip,port),90);
        active=true;detected.add(port+" "+serviceName(port));
      }catch(ConnectException e){active=true;}
      catch(Exception ignored){}
    }
    if(active)openServices.put(ip,android.text.TextUtils.join(", ",detected));
    return active;
  }
  String serviceName(int port){
    switch(port){
      case 21:return "FTP";case 22:return "SSH";case 53:return "DNS";case 80:return "HTTP";
      case 139:return "NetBIOS";case 443:return "HTTPS";case 445:return "SMB file sharing";
      case 554:return "RTSP stream";case 631:return "IPP print";case 1883:return "MQTT";
      case 3389:return "Remote Desktop";case 5000:return "web/NAS";case 5900:return "VNC";
      case 8009:return "Cast";case 8123:return "home automation";case 9100:return "printer";
      case 32400:return "Plex";default:return "TCP";
    }
  }
  void fail(String s){runOnUiThread(()->{busy=false;scan.setEnabled(true);status.setText(s);});}
  void render(){
    if(rows==null)return;
    rows.removeAllViews();
    ArrayList<String> ips=new ArrayList<>();
    for(Map.Entry<String,?> entry:prefs.getAll().entrySet())if(entry.getKey().startsWith("last_"))ips.add(entry.getKey().substring(5));
    Collections.sort(ips,(a,b)->{
      if(online.contains(a)!=online.contains(b))return online.contains(a)?-1:1;
      return a.compareTo(b);
    });
    summary.setText("Devices  ·  "+online.size()+" responded");
    if(ips.isEmpty()){add(rows,txt("No devices recorded yet. Tap Scan my Wi-Fi network.",14,MUTED,false),10);return;}
    for(String ip:ips){
      LinearLayout card=column();card.setPadding(dp(15),dp(13),dp(15),dp(13));card.setBackground(shape(PANEL,12));
      String alias=prefs.getString("name_"+ip,"");boolean active=online.contains(ip);
      add(card,txt((active?"●  ":"○  ")+(alias.isEmpty()?"Unknown device":alias),16,active?GREEN:WHITE,true),0);
      add(card,txt(ip+"  ·  "+(active?"Responded this scan":"Previously seen"),13,MUTED,false),6);
      long seen=prefs.getLong("last_"+ip,0);
      if(seen>0)add(card,txt("Last detected "+DateFormat.getDateTimeInstance().format(new Date(seen)),12,MUTED,false),3);
      long first=prefs.getLong("first_"+ip,0);
      if(first>0)add(card,txt("First seen "+DateFormat.getDateInstance().format(new Date(first))+"  ·  Seen on "+prefs.getInt("scans_"+ip,0)+" scans",12,MUTED,false),3);
      String ports=prefs.getString("ports_"+ip,"");
      add(card,txt(ports.isEmpty()?"No open service detected on tested ports":"Services exposed: "+ports,12,MUTED,false),5);
      card.setOnClickListener(v->rename(ip));add(rows,card,9);
    }
  }
  void rename(String ip){
    EditText t=new EditText(this);t.setSingleLine(true);t.setText(prefs.getString("name_"+ip,""));t.setHint("e.g. Living room TV");
    new AlertDialog.Builder(this).setTitle("Name device "+ip).setView(t)
      .setNegativeButton("Cancel",null).setPositiveButton("Save",(dialog,which)->{
        prefs.edit().putString("name_"+ip,t.getText().toString().trim()).apply();render();
      }).show();
  }
  @Override public void onRequestPermissionsResult(int req,String[] perms,int[] grants){
    super.onRequestPermissionsResult(req,perms,grants);if(req==17){wifiInfo();beginAfterPermission();}
  }
  void beginAfterPermission(){
    // Location can be refused: direct discovery still works; start on a second tap.
    status.setText("Permission updated. Tap Scan to discover devices.");
  }
  @Override protected void onDestroy(){background.shutdownNow();super.onDestroy();}
}
