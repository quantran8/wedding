import React, { useEffect, useRef, useState } from "react";

// ===== IMPORT LOCAL ASSETS ===== //
import HeaderImage from "./assets/header-wedding.jpg";
import FooterImage from "./assets/footer-wedding.jpg";
import PerfectSong from "./assets/perfect.mp3";
// import QrGroom from "./assets/qr-groom.png";
// import QrBride from "./assets/qr-bride.png";

interface PersonInfo {
  name: string;
  fatherName: string;
  motherName: string;
  bankName: string;
  bankOwner: string;
  bankNumber: string;
  address: string;
  mapEmbedUrl: string;
  // qrImage?: string;
}

interface WeddingInfo {
  title: string;
  mainImage: string;
  footerImage: string;
  coupleNames: string;
  partyDate: string;
  ceremonyDate: string;
}

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showFireworks, setShowFireworks] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const groom: PersonInfo = {
    name: "Đình Quân",
    fatherName: "Ông: Trần Đại Nghĩa",
    motherName: "Bà: Dương Thị Hạnh",
    bankName: "Vietcombank",
    bankOwner: "DINH QUAN",
    bankNumber: "0123456789",
    address: "Nhà trai: Yên Ninh, Hiền Ninh, Sóc Sơn, Hà Nội",
    mapEmbedUrl:
      "https://www.google.com/maps?q=21.244423, 105.788692&z=16&output=embed",
  };

  const bride: PersonInfo = {
    name: "Ngọc Anh",
    fatherName: "Ông: Dương Văn Tầm",
    motherName: "Bà: Nguyễn Mai Lan",
    bankName: "Techcombank",
    bankOwner: "NGOC ANH",
    bankNumber: "0987654321",
    address: "Nhà gái: Số 10, Thanh trí, Minh phú, Hà Nội",
    mapEmbedUrl:
      "https://www.google.com/maps?q=21.270180, 105.763232&z=16&output=embed",
  };

  const weddingInfo: WeddingInfo = {
    title: "Wedding Invitation",
    mainImage: HeaderImage,
    footerImage: FooterImage,
    coupleNames: "Đình Quân & Ngọc Anh",
    partyDate: "20 / 12 / 2025",
    ceremonyDate: "21 / 12 / 2025",
  };

  // ==== AUTO PLAY NHẠC (NẾU BROWSER CHO PHÉP) ==== //
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playMusic = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

    void playMusic();
  }, []);

  // ==== ẨN FIREWORKS SAU 4 GIÂY ==== //
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowFireworks(false);
    }, 4000);
    return () => window.clearTimeout(timer);
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Cannot play audio:", err);
      }
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-[#f5f7f2] text-stone-800 relative overflow-hidden">
      {/* ==== FIREWORKS OVERLAY ==== */}
      {showFireworks && (
        <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
          <div className="firework firework-1" />
          <div className="firework firework-2" />
          <div className="firework firework-3" />
        </div>
      )}

      {/* ==== AUDIO ==== */}
      <audio ref={audioRef} src={PerfectSong} loop />

      {/* ==== BUTTON MUSIC ==== */}
      <button
        type="button"
        onClick={togglePlay}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-[#5E7941] text-white shadow-lg flex items-center justify-center hover:bg-[#4b6234] hover:scale-105 active:scale-95 transition-transform duration-150"
        title={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc"}
      >
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5h3v14H8zM13 5h3v14h-3z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* ===== WRAPPER CĂN GIỮA + MAX WIDTH ===== */}
      <div className="flex justify-center px-4 py-4 md:py-6">
        <div className="w-full max-w-4xl">
          {/* ===== HEADER FULL IMAGE (TITLE Ở TRÊN) ===== */}
          <header className="relative w-full overflow-hidden rounded-3xl bg-white shadow-lg border border-[#5E7941]/20">
            <img
              src={weddingInfo.mainImage}
              alt="Ảnh cưới header"
              className="w-full h-auto object-contain block"
            />

            {/* Text nằm trên cùng – KHÔNG overlay */}
            <div className="absolute inset-x-0 top-0 flex flex-col items-center text-center px-6 pt-4 md:pt-6 text-[#5E7941]">
              <p className="text-[11px] tracking-[0.4em] uppercase text-[#5E7941]/80">
                Trân trọng kính mời
              </p>

              {/* Mobile: h2, Desktop: h1 */}
              <h2 className="font-script text-3xl md:hidden drop-shadow-sm mt-1">
                {weddingInfo.title}
              </h2>
              <h1 className="font-script text-4xl hidden md:block drop-shadow-sm mt-1">
                {weddingInfo.title}
              </h1>

              <p className="mt-2 mb-3 text-[11px] md:text-xs tracking-[0.3em] uppercase text-[#5E7941]/70">
                {weddingInfo.coupleNames}
              </p>
            </div>
          </header>

          {/* ===== MAIN CONTENT (THIỆP) ===== */}
          <main className="max-w-3xl mx-auto px-0 pb-10 pt-6 md:pt-8">
            <div className="rounded-[24px] bg-white/95 backdrop-blur-md shadow-md border border-[#5E7941]/18 overflow-hidden">
              {/* TOP DECOR LINE */}
              <div className="h-1 w-full bg-gradient-to-r from-[#5E7941]/10 via-[#5E7941]/40 to-[#5E7941]/10" />

              <div className="px-6 pb-7 pt-6 md:px-8 md:pb-9 space-y-6 md:space-y-7">
                {/* LỜI MỜI */}
                <section className="text-center space-y-2">
                  <p className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-[#5E7941]">
                    Lời mời
                  </p>
                  <p className="text-sm md:text-base text-stone-700">
                    Chúng mình rất hân hạnh được đón tiếp bạn đến chung vui
                    trong ngày trọng đại của{" "}
                    <h2 className="font-semibold text-[#5E7941]">
                      {weddingInfo.coupleNames}
                    </h2>
                    .
                  </p>
                </section>

                {/* DIVIDER */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#5E7941]/20 to-transparent" />

                {/* ĐỊA CHỈ + TÊN + CHA MẸ */}
                <section className="space-y-4">
                  <p className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-[#5E7941] text-center">
                    Gia đình hai bên
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nhà trai */}
                    <div className="rounded-2xl bg-[#5E7941]/5 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.25em] text-[#5E7941]">
                        Nhà trai
                      </p>
                      <p className="mt-1 font-semibold text-stone-800">
                        {groom.name}
                      </p>
                      <p className="mt-1 text-xs md:text-sm text-stone-700">
                        {groom.fatherName}
                      </p>
                      <p className="text-xs md:text-sm text-stone-700">
                        {groom.motherName}
                      </p>
                      <p className="mt-1 text-xs md:text-sm text-stone-600">
                        {groom.address}
                      </p>
                    </div>

                    {/* Nhà gái */}
                    <div className="rounded-2xl bg-[#5E7941]/5 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.25em] text-[#5E7941]">
                        Nhà gái
                      </p>
                      <p className="mt-1 font-semibold text-stone-800">
                        {bride.name}
                      </p>
                      <p className="mt-1 text-xs md:text-sm text-stone-700">
                        {bride.fatherName}
                      </p>
                      <p className="text-xs md:text-sm text-stone-700">
                        {bride.motherName}
                      </p>
                      <p className="mt-1 text-xs md:text-sm text-stone-600">
                        {bride.address}
                      </p>
                    </div>
                  </div>
                </section>

                {/* DIVIDER */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#5E7941]/20 to-transparent" />

                {/* THỜI GIAN DẠNG 2 CỘT */}
                <section className="space-y-4">
                  <p className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-[#5E7941] text-center">
                    Thời gian tổ chức
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-[#f9faf7] px-4 py-3 text-center">
                      <p className="text-xs uppercase tracking-[0.25em] text-[#5E7941]">
                        Tiệc cưới
                      </p>
                      <p className="mt-2 text-base font-semibold text-stone-800">
                        {weddingInfo.partyDate}
                      </p>
                      <p className="mt-1 text-xs md:text-sm text-stone-600">
                        Tiệc chung vui cùng gia đình hai họ.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#f9faf7] px-4 py-3 text-center">
                      <p className="text-xs uppercase tracking-[0.25em] text-[#5E7941]">
                        Lễ thành hôn
                      </p>
                      <p className="mt-2 text-base font-semibold text-stone-800">
                        {weddingInfo.ceremonyDate}
                      </p>
                      <p className="mt-1 text-xs md:text-sm text-stone-600">
                        Lễ thành hôn trong không khí ấm áp và thân mật.
                      </p>
                    </div>
                  </div>
                </section>

                {/* DIVIDER */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#5E7941]/20 to-transparent" />

                {/* BẢN ĐỒ */}
                <section className="space-y-4">
                  <p className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-[#5E7941] text-center">
                    Bản đồ
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-[#f9faf7] p-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#5E7941]">
                        Nhà trai
                      </p>
                      <p className="mt-1 text-xs md:text-sm text-stone-600">
                        {groom.address}
                      </p>
                      <div className="mt-2 w-full h-40 md:h-44 rounded-xl overflow-hidden">
                        <iframe
                          src={groom.mapEmbedUrl}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="w-full h-full border-0"
                          title="Google Map nhà trai"
                        />
                      </div>
                    </div>

                    <div className="rounded-2xl bg-[#f9faf7] p-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#5E7941]">
                        Nhà gái
                      </p>
                      <p className="mt-1 text-xs md:text-sm text-stone-600">
                        {bride.address}
                      </p>
                      <div className="mt-2 w-full h-40 md:h-44 rounded-xl overflow-hidden">
                        <iframe
                          src={bride.mapEmbedUrl}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="w-full h-full border-0"
                          title="Google Map nhà gái"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* DIVIDER */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#5E7941]/20 to-transparent" />

                {/* QR / MỪNG CƯỚI */}
                <section className="space-y-4">
                  <p className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-[#5E7941] text-center">
                    Gửi lời chúc & mừng cưới
                  </p>
                  <p className="text-center text-xs md:text-sm text-stone-600 max-w-xl mx-auto">
                    Nếu không tiện đến chung vui, bạn có thể gửi lời chúc và
                    mừng cưới qua thông tin bên dưới. Mọi lời chúc đều là món
                    quà vô cùng trân quý với chúng mình.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-[#f9faf7] px-4 py-3 text-center">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#5E7941]">
                        Chú rể
                      </p>
                      <p className="mt-1 font-semibold">{groom.name}</p>
                      <p className="mt-1 text-xs md:text-sm text-stone-600">
                        {groom.bankName} – {groom.bankOwner}
                      </p>
                      <p className="mt-1 text-xs md:text-sm text-stone-800">
                        STK:{" "}
                        <span className="font-semibold">
                          {groom.bankNumber}
                        </span>
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#f9faf7] px-4 py-3 text-center">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#5E7941]">
                        Cô dâu
                      </p>
                      <p className="mt-1 font-semibold">{bride.name}</p>
                      <p className="mt-1 text-xs md:text-sm text-stone-600">
                        {bride.bankName} – {bride.bankOwner}
                      </p>
                      <p className="mt-1 text-xs md:text-sm text-stone-800">
                        STK:{" "}
                        <span className="font-semibold">
                          {bride.bankNumber}
                        </span>
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </main>

          {/* ===== FOOTER FULL IMAGE (TEXT Ở DƯỚI) ===== */}
          <footer className="max-w-3xl mx-auto w-full mt-2 md:mt-4">
            <div className="relative w-full overflow-hidden rounded-3xl bg-white shadow-lg border border-[#5E7941]/20">
              <img
                src={weddingInfo.footerImage}
                alt="Ảnh cưới footer"
                className="w-full h-auto object-contain block"
              />
              {/* <div className="absolute inset-0 bg-black/20" /> */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-3 md:pb-4">
                <p className="text-center text-xs md:text-sm text-[#5E7941]/70 px-4">
                  Rất mong nhận được sự hiện diện và lời chúc phúc của bạn trong
                  ngày vui của chúng mình ✨
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;
