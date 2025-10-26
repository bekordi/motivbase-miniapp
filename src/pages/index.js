import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";

const QUOTES = [
  "Her 'bugün' yeni bir fırsattır.",
  "Küçük adımlar büyük farklar yaratır.",
  "Yapabileceğine inan; yarı yoldasın.",
  "Bir deneme, bin pişmanlıktan iyidir.",
  "Başarı, istikrarlı çabanın sonucudur."
];

const BACKGROUNDS = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
  "https://images.unsplash.com/photo-1503264116251-35a269479413?w=1200&q=80",
  "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200&q=80"
];

export default function Home() {
  const [quote, setQuote] = useState(QUOTES[0]);
  const [bg, setBg] = useState(BACKGROUNDS[0]);
  const [loadingPay, setLoadingPay] = useState(false);
  const [paid, setPaid] = useState(false);
  const [message, setMessage] = useState("");
  const cardRef = useRef();

  useEffect(() => {
    randomize();
  }, []);

  function randomize() {
    setQuote(QUOTES[Math.floor(Math.random()*QUOTES.length)]);
    setBg(BACKGROUNDS[Math.floor(Math.random()*BACKGROUNDS.length)]);
    setPaid(false);
    setMessage("");
  }

  // Mock payment function - simulate paying $0.1
  async function handlePayAndShare() {
    setLoadingPay(true);
    setMessage("Ödeme işleniyor... (mock)");
    try {
      // Simulate network/payment delay
      await new Promise(r => setTimeout(r, 1500));
      // Mock success
      setPaid(true);
      setMessage("Ödeme başarılı! Görsel oluşturuluyor...");
      // generate image
      const canvas = await html2canvas(cardRef.current, {useCORS:true});
      const dataUrl = canvas.toDataURL("image/png");
      // create a downloadable link
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'motivbase-share.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setMessage("Görsel indirildi. (Simüle: paylaşım yapıldı.)");
    } catch (err) {
      console.error(err);
      setMessage("Ödeme sırasında hata oluştu (mock).");
    } finally {
      setLoadingPay(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="max-w-xl w-full">
        <div ref={cardRef} className="relative rounded-xl overflow-hidden shadow-2xl w-full h-96">
          <img src={bg} alt="bg" className="absolute inset-0 w-full h-full object-cover filter brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
            <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">MotivBase</h2>
            <p className="text-white text-2xl md:text-3xl font-bold drop-shadow">{quote}</p>
            <p className="text-white/80 mt-4 text-sm">İstersen bu görseli profilinde paylaşabilirsin — ücret: $0.10</p>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button onClick={randomize} className="flex-1 bg-white/10 text-white py-2 rounded-md">Yeni Söz</button>
          <button onClick={handlePayAndShare} disabled={loadingPay} className="bg-emerald-500 text-white py-2 px-4 rounded-md">
            {loadingPay ? "Ödeniyor..." : "Paylaş - $0.10"}
          </button>
        </div>

        <p className="mt-3 text-sm text-white/70">{message}</p>

        <div className="mt-6 text-xs text-white/60">
          <strong>Not:</strong> Bu sürümde ödeme ve paylaşım **mock** (simülasyon). Gerçek Base ödemesi ve Farcaster cast entegrasyonu için sonraki adımları uygulayacağız.
        </div>
      </div>
    </main>
  );
}
