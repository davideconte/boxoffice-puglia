import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-6xl">🔒</div>
        <h1 className="text-3xl font-bold">Accesso riservato</h1>
        <p className="text-gray-400 text-lg">
          Questo sito è protetto. Contatta il team Box Office Puglia per ottenere le credenziali di accesso.
        </p>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left text-sm text-gray-400">
          <p className="font-semibold text-white mb-2">Come accedere:</p>
          <p>1. Richiedi il token di accesso al team</p>
          <p>2. Visita: <code className="text-white bg-white/10 px-1 rounded">https://boxofficepuglia.it/?token=IL_TUO_TOKEN</code></p>
        </div>
        <Link
          href="/"
          className="inline-block mt-4 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
        >
          Torna alla home
        </Link>
      </div>
    </div>
  );
}
