export default function EmbedPage() {
  const embed = `<script src="https://tradeconnectai.co.uk/widget.js" data-business="YOUR_ID"></script>`;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-4xl font-bold mb-6">Add TradeConnectAI to your website</h1>

      <p className="text-slate-300 mb-4">
        Copy and paste this code into your website’s &lt;head&gt; section.
      </p>

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
        <pre className="text-blue-400 text-sm whitespace-pre-wrap">{embed}</pre>
      </div>

      <p className="text-slate-500 text-sm mt-4">
        Works on WordPress, Wix, Squarespace, Shopify, and any HTML site.
      </p>
    </main>
  );
}
