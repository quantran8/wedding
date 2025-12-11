import React, { useEffect, useRef, useState } from "react";

// ===== IMPORT LOCAL ASSETS ===== //
import HeaderImage from "./assets/header-wedding.jpg";
import FooterImage from "./assets/footer-wedding.jpg";
import PerfectSong from "./assets/perfect.mp3";
import QrGroom from "./assets/chure_qr.jpg";
import QrBride from "./assets/codau_qr.jpg";
import CopyIcon from "./assets/copy.png";

import MusicLottie from "./assets/music-icon.json"; // 👈 your Lottie JSON
import FireworkLottie from "./assets/firework.json"; // 👈 your Lottie JSON

import Lottie from "react-lottie-player"; // 👈 Lottie component
import { Analytics } from "@vercel/analytics/next";

interface PersonInfo {
  name: string;
  fatherName: string;
  motherName: string;
  bankName: string;
  bankOwner: string;
  bankNumber: string;
  address: string;
  mapEmbedUrl: string;
  qrImage: string;
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
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<any>(null);

  const searchParams = new URLSearchParams(window.location.search);
  const isBride = searchParams.get("isbride") === "true";
  const isGroom = searchParams.get("isgroom") === "true";

  const showBride = isBride || (!isBride && !isGroom);
  const showGroom = isGroom || (!isBride && !isGroom);

  const groom: PersonInfo = {
    name: "Đình Quân",
    fatherName: "Trần Đại Nghĩa",
    motherName: "Dương Thị Hạnh",
    bankName: "Techcombank",
    bankOwner: "TRAN DINH QUAN",
    bankNumber: "555633888888",
    qrImage: QrGroom,
    address: "Xóm sau, Yên Ninh, Nội Bài, Hà Nội",
    mapEmbedUrl:
      "https://www.google.com/maps?q=21.244423, 105.788692&z=16&output=embed",
  };

  const bride: PersonInfo = {
    name: "Ngọc Anh",
    fatherName: "Dương Văn Tầm",
    motherName: "Nguyễn Mai Lan",
    bankName: "Techcombank",
    bankOwner: "DUONG THI NGOC ANH",
    bankNumber: "19135591419017",
    qrImage: QrBride,
    address: "Số 10, Thanh trí, Minh phú, Hà Nội",
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

  const showToast = (message: string) => {
    setToastMessage(message);

    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);

    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast("Đã sao chép số tài khoản");
    });
  };

  // ==== AUTO PLAY NHẠC (NẾU BROWSER CHO PHÉP) ==== //
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playMusic = () => {
      if (isPlaying) {
        removeListeners();
        return;
      }
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          console.error("Cannot play audio");
        });
    };

    const onFirstTap = () => playMusic();
    const onFirstScroll = () => playMusic();

    const removeListeners = () => {
      window.removeEventListener("touchstart", onFirstTap);
      window.removeEventListener("click", onFirstTap);
      window.removeEventListener("scroll", onFirstScroll);
    };

    window.addEventListener("touchstart", onFirstTap, { once: true });
    window.addEventListener("click", onFirstTap, { once: true });
    window.addEventListener("scroll", onFirstScroll, { once: true });

    return removeListeners;
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
    <div className="min-h-screen bg-[#f5f7f2] text-stone-800 relative overflow-hidden">
      {/* FIREWORKS, AUDIO, etc. */}
      <div className="relative max-w-4xl mx-auto px-4 py-4 md:py-6">
        {showFireworks && (
          <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden w-full h-full">
            <Lottie
              loop
              animationData={FireworkLottie}
              play
              className="w-full h-full"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              speed={0.7}
            />
          </div>
        )}

        {/* ==== AUDIO ==== */}
        <audio id="audio" ref={audioRef} src={PerfectSong} loop />

        {/* ==== BUTTON MUSIC ==== */}
        <div className="fixed bottom-2 right-2 z-50">
          <Lottie
            loop
            animationData={MusicLottie}
            play={isPlaying} // 👈 play/pause animation according to music
            style={{ width: 80, height: 80 }} // ~w-8 h-8
            speed={0.5}
            onClick={togglePlay}
          />
        </div>

        <div className="w-full max-w-4xl mx-auto">
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
          <main className="max-w-3xl mx-auto px-0 pb-10 pt-6 md:pt-8 text-scale">
            <div className="rounded-[24px] bg-white/95 backdrop-blur-md shadow-md border border-[#5E7941]/18 overflow-hidden">
              {/* TOP DECOR LINE */}
              <div className="h-1 w-full bg-gradient-to-r from-[#5E7941]/10 via-[#5E7941]/40 to-[#5E7941]/10" />

              <div className="px-6 pb-7 pt-6 md:px-8 md:pb-9 space-y-6 md:space-y-7">
                {/* LỜI MỜI */}
                <section className="text-center space-y-2">
                  <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#5E7941]">
                    Lời mời
                  </p>

                  <p className="text-sm md:text-base text-stone-700">
                    Chúng mình rất hân hạnh được đón tiếp bạn đến chung vui
                    trong ngày trọng đại của{" "}
                  </p>

                  <p className="font-playfair text-[#5E7941] text-2xl md:text-4xl">
                    {weddingInfo.coupleNames}
                  </p>
                </section>

                {/* DIVIDER */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#5E7941]/20 to-transparent" />

                {/* ĐỊA CHỈ + TÊN + CHA MẸ */}
                <section className="space-y-4">
                  <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#5E7941] text-center">
                    Gia đình hai bên
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nhà trai */}
                    <div className="rounded-2xl bg-[#5E7941]/5 px-4 py-3">
                      <div className="flex justify-center mb-3">
                        <p className="text-sm uppercase tracking-[0.25em] text-[#5E7941]">
                          Nhà Trai
                        </p>
                      </div>

                      <div className="mt-2 space-y-1.5 text-sm md:text-base text-stone-700">
                        <div className="grid grid-cols-12 gap-1">
                          <span className="col-span-4 font-medium">
                            Chú rể:
                          </span>
                          <span className="col-span-8 text-stone-800 font-semibold">
                            {groom.name}
                          </span>
                        </div>

                        <div className="grid grid-cols-12 gap-1">
                          <span className="col-span-4 font-medium">Ông:</span>
                          <span className="col-span-8">{groom.fatherName}</span>
                        </div>

                        <div className="grid grid-cols-12 gap-1">
                          <span className="col-span-4 font-medium">Bà:</span>
                          <span className="col-span-8">{groom.motherName}</span>
                        </div>

                        <div className="grid grid-cols-12 gap-1">
                          <span className="col-span-4 font-medium">
                            Địa chỉ:
                          </span>
                          <span className="col-span-8 text-stone-600">
                            {groom.address}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Nhà gái */}
                    <div className="rounded-2xl bg-[#5E7941]/5 px-4 py-3">
                      <div className="flex justify-center mb-3">
                        <p className="text-sm uppercase tracking-[0.25em] text-[#5E7941]">
                          Nhà gái
                        </p>
                      </div>

                      <div className="mt-2 space-y-1.5 text-sm md:text-base text-stone-700">
                        <div className="grid grid-cols-12 gap-1">
                          <span className="col-span-4 font-medium">
                            Cô dâu:
                          </span>
                          <span className="col-span-8 text-stone-800 font-semibold">
                            {bride.name}
                          </span>
                        </div>

                        <div className="grid grid-cols-12 gap-1">
                          <span className="col-span-4 font-medium">Ông:</span>
                          <span className="col-span-8">{bride.fatherName}</span>
                        </div>

                        <div className="grid grid-cols-12 gap-1">
                          <span className="col-span-4 font-medium">Bà:</span>
                          <span className="col-span-8">{bride.motherName}</span>
                        </div>

                        <div className="grid grid-cols-12 gap-1">
                          <span className="col-span-4 font-medium">
                            Địa chỉ:
                          </span>
                          <span className="col-span-8 text-stone-600">
                            {bride.address}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* DIVIDER */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#5E7941]/20 to-transparent" />

                {/* THỜI GIAN DẠNG 2 CỘT */}
                <section className="space-y-4">
                  <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#5E7941] text-center">
                    Thời gian tổ chức
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-[#f9faf7] px-4 py-3 text-center">
                      <p className="text-sm uppercase tracking-[0.25em] text-[#5E7941]">
                        Tiệc cưới
                      </p>
                      <p className="mt-1 text-sm md:text-base text-stone-600">
                        Được tổ chức vào 16h00, thứ bảy
                      </p>
                      <p className="mt-2 text-3xl font-semibold text-stone-800">
                        {weddingInfo.partyDate}
                      </p>
                      <p className="mt-1 text-sm md:text-base text-stone-600">
                        Tiệc chung vui cùng gia đình hai họ.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#f9faf7] px-4 py-3 text-center">
                      <p className="text-sm uppercase tracking-[0.25em] text-[#5E7941]">
                        Lễ thành hôn
                      </p>
                      <p className="mt-1 text-sm md:text-base text-stone-600">
                        Được tổ chức vào 10h00, chủ nhật
                      </p>
                      <p className="mt-2 text-3xl font-semibold text-stone-800">
                        {weddingInfo.ceremonyDate}
                      </p>
                      <p className="mt-1 text-sm md:text-base text-stone-600">
                        Lễ thành hôn trong không khí ấm áp và thân mật.
                      </p>
                    </div>
                  </div>
                </section>

                {/* DIVIDER */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#5E7941]/20 to-transparent" />

                {/* BẢN ĐỒ */}
                <section className="space-y-4">
                  <p className="text-sm md:text-sm tracking-[0.3em] uppercase text-[#5E7941] text-center">
                    Bản đồ
                  </p>

                  <div
                    className={`grid gap-4 ${
                      showBride && showGroom
                        ? "grid-cols-1 md:grid-cols-2"
                        : "grid-cols-1"
                    }`}
                  >
                    {showGroom && (
                      <div className="rounded-2xl bg-[#f9faf7] p-3">
                        <p className="text-sm uppercase tracking-[0.2em] text-[#5E7941]">
                          Nhà trai
                        </p>
                        <p className="mt-1 text-sm md:text-base text-stone-600">
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
                    )}

                    {showBride && (
                      <div className="rounded-2xl bg-[#f9faf7] p-3">
                        <p className="text-sm uppercase tracking-[0.2em] text-[#5E7941]">
                          Nhà gái
                        </p>
                        <p className="mt-1 text-sm md:text-base text-stone-600">
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
                    )}
                  </div>
                </section>

                {/* DIVIDER */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#5E7941]/20 to-transparent" />

                {/* QR / MỪNG CƯỚI */}
                <section className="space-y-4">
                  <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#5E7941] text-center">
                    Gửi lời chúc & mừng cưới
                  </p>

                  <p className="text-center text-sm md:text-base text-stone-600 max-w-xl mx-auto">
                    Nếu không tiện đến chung vui, bạn có thể gửi lời chúc và
                    mừng cưới qua thông tin bên dưới. Mọi lời chúc đều là món
                    quà vô cùng trân quý với chúng mình.
                  </p>

                  <div
                    className={`grid gap-4 ${
                      showBride && showGroom
                        ? "grid-cols-1 md:grid-cols-2"
                        : "grid-cols-1"
                    }`}
                  >
                    {showGroom && (
                      <div className="rounded-2xl bg-[#f9faf7] px-4 py-3 text-center">
                        <p className="text-sm uppercase tracking-[0.2em] text-[#5E7941]">
                          Chú rể
                        </p>
                        <p className="mt-1 font-semibold">{groom.name}</p>

                        <p className="mt-1 text-sm md:text-base text-stone-600">
                          {groom.bankName} – {groom.bankOwner}
                        </p>

                        <div className="flex items-center justify-center gap-2 mt-1">
                          <p className="text-sm md:text-base text-stone-800">
                            STK:{" "}
                            <span className="font-semibold">
                              {groom.bankNumber}
                            </span>
                          </p>

                          <img
                            src={CopyIcon}
                            alt="copy"
                            className="w-4 h-4 cursor-pointer hover:opacity-70 active:scale-90"
                            onClick={() => copyToClipboard(groom.bankNumber)}
                          />
                        </div>

                        <img
                          src={groom.qrImage}
                          alt="qr code"
                          className="mt-2 mx-auto w-40"
                        />
                      </div>
                    )}

                    {showBride && (
                      <div className="rounded-2xl bg-[#f9faf7] px-4 py-3 text-center">
                        <p className="text-sm uppercase tracking-[0.2em] text-[#5E7941]">
                          Cô dâu
                        </p>
                        <p className="mt-1 font-semibold">{bride.name}</p>

                        <p className="mt-1 text-sm md:text-base text-stone-600">
                          {bride.bankName} – {bride.bankOwner}
                        </p>

                        <div className="flex items-center justify-center gap-2 mt-1">
                          <p className="text-sm md:text-base text-stone-800">
                            STK:{" "}
                            <span className="font-semibold">
                              {bride.bankNumber}
                            </span>
                          </p>

                          <img
                            src={CopyIcon}
                            alt="copy"
                            className="w-4 h-4 cursor-pointer hover:opacity-70 active:scale-90"
                            onClick={() => copyToClipboard(bride.bankNumber)}
                          />
                        </div>

                        <img
                          src={bride.qrImage}
                          alt="qr code"
                          className="mt-2 mx-auto w-40"
                        />
                      </div>
                    )}
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
                <p className="text-center text-sm md:text-base text-[#5E7941]/70 px-4">
                  Rất mong nhận được sự hiện diện và lời chúc phúc của bạn trong
                  ngày vui của chúng mình ✨
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
      {/* === TOAST === */}
      {/* === TOAST === */}
      {toastMessage && (
        <div
          className="
            fixed bottom-6 left-1/2
            -translate-x-1/2
            bg-[#5E7941] text-white px-4 py-2 rounded-full shadow-lg
            text-sm md:text-base z-[999]
            animate-toast-up
          "
        >
          {toastMessage}
        </div>
      )}
      <Analytics />
    </div>
  );
};

export default App;
