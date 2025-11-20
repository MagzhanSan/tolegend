"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const slides = [
  {
    video: "/video.mp4",
    title: "Фото",
    caption: "Фотографии, сделанные в разных странах и городах.",
    isVisibleText: true,
  },
  {
    video: "/video.mp4",
    title: "Видео",
    caption: "Видео, сделанные в разных странах и городах.",
    isVisibleText: true,
  },
  {
    video: "/video.mp4",
    title: "Дизайн",
    caption: "Дизайн, сделанный в разных странах и городах.",
    isVisibleText: true,
  },
];

const galleryImages = [
  {
    id: 1,
    src: "/projects/rugby-1.jpg",
    alt: "Ребрендинг Федерации Регби РК",
    title: "РЕБРЕНДИНГ ФЕДЕРАЦИИ РЕГБИ РК",
    description:
      "Обновление визуального стиля всей федерации. Разработка брендбука, логотипа, визуальных стандартов. Единый современный образ, адаптированный под международные площадки.",
  },
  {
    id: 2,
    src: "/projects/rugby-2.jpg",
    alt: "Qazaqstan Rugby Брендинг",
    title: "QAZAQSTAN RUGBY",
    description:
      "Создание нового визуального стиля для Федерации Регби Казахстана. Разработка логотипа со стилизованным орлом, фирменного стиля и применение на различных носителях.",
  },
  {
    id: 3,
    src: "/projects/workers-year-1.jpg",
    alt: "Брендбук Год рабочих профессий",
    title: "БРЕНДБУК ДЛЯ 'ГОД РАБОЧИХ ПРОФЕССИЙ'",
    description:
      "Разработка брендбука и визуальных стандартов для проекта 'Год рабочих профессий'. Создание логотипа с шестеренкой и применение на различных рекламных носителях.",
  },
  {
    id: 4,
    src: "/projects/workers-year-2.jpg",
    alt: "Год рабочих профессий Билборды",
    title: "ГОД РАБОЧИХ ПРОФЕССИЙ",
    description:
      "Создание рекламных материалов для проекта 'Год рабочих профессий'. Билборды, флаги и промо-материалы с портретами рабочих и мотивирующими слоганами.",
  },
  {
    id: 5,
    src: "/projects/jetisu-1.jpg",
    alt: "Туристический бренд Жетысу",
    title: "ТУРИСТИЧЕСКИЙ БРЕНД ДЛЯ ОБЛАСТИ ЖЕТЫСУ",
    description:
      "Разработка туристического бренда JETISU для области Жетысу. Создание логотипа, вдохновленного природными элементами региона: горами, полями, рассветами, реками и подводным миром.",
  },
  {
    id: 6,
    src: "/projects/jetisu-2.jpg",
    alt: "JETISU Брендинг",
    title: "JETISU",
    description:
      "Визуальная идентичность туристического бренда JETISU. Применение на билбордах, флагах и рекламных материалах с использованием цветовой палитры, отражающей природное разнообразие региона.",
  },
  {
    id: 7,
    src: "/projects/abstract-1.jpg",
    alt: "Абстрактная графика",
    title: "АБСТРАКТНАЯ ГРАФИКА",
    description:
      "Создание абстрактных визуальных элементов с использованием органических форм и геометрических структур. Работа с цветовыми градиентами и современными дизайн-решениями.",
  },
  {
    id: 8,
    src: "/projects/dragon-1.jpg",
    alt: "Пиксельный дракон",
    title: "ПИКСЕЛЬНЫЙ ДРАКОН",
    description:
      "Стилизованный дракон в технике пиксель-арт с элементами оригами. Современная интерпретация традиционных мотивов с использованием цифровых технологий.",
  },
  {
    id: 9,
    src: "/projects/dragon-2.jpg",
    alt: "Градиентный дракон",
    title: "ГРАДИЕНТНЫЙ ДРАКОН",
    description:
      "Геометрическая интерпретация дракона с градиентной заливкой. Минималистичный дизайн с акцентом на форму и цветовые переходы.",
  },
];

function ImageWithPlaceholder({
  src,
  alt,
  title,
}: {
  src: string;
  alt: string;
  title: string;
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative h-full w-full">
      {!imageError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          onLoad={() => setImageLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 ${
            imageLoaded
              ? "opacity-100 group-hover:scale-110 group-hover:brightness-110"
              : "opacity-0"
          }`}
          loading="lazy"
        />
      ) : null}
      {imageError || !imageLoaded ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-(--color-deep-forest) via-(--color-teal) to-(--color-deep-forest) p-4">
          <svg
            className="mb-4 h-12 w-12 text-(--color-peach)/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-center text-sm font-medium text-white/70">
            Изображение загружается
          </p>
          <p className="mt-1 text-center text-xs text-white/50">{title}</p>
        </div>
      ) : null}
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const currentVisibleIndexRef = useRef<number>(-1);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);

  useEffect(() => {
    if (isGalleryOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isGalleryOpen]);

  useEffect(() => {
    if (!isGalleryOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsGalleryOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGalleryOpen]);

  const sectionHeight = useMemo(() => `${slides.length * 100}vh`, []);
  const trackWidth = useMemo(() => `${slides.length * 100}vw`, []);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouchDevice) {
      setIsHovering(false);
      return;
    }

    let rafId: number | null = null;
    const cursorPosRef = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    let needsUpdate = false;

    setCursorPos({ x: cursorPosRef.x, y: cursorPosRef.y });
    setIsHovering(true);

    const updateCursor = () => {
      if (needsUpdate) {
        setCursorPos({ x: cursorPosRef.x, y: cursorPosRef.y });
        needsUpdate = false;
      }
      rafId = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      cursorPosRef.x = e.clientX;
      cursorPosRef.y = e.clientY;
      setIsHovering(true);
      if (!needsUpdate) {
        needsUpdate = true;
        if (rafId === null) {
          rafId = requestAnimationFrame(updateCursor);
        }
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const startAllVideos = () => {
      videoRefs.current.forEach((video) => {
        if (video && video.paused && video.readyState >= 2) {
          video.play().catch(() => {});
        }
      });
    };

    startAllVideos();

    const cleanupFunctions: (() => void)[] = [];
    videoRefs.current.forEach((video) => {
      if (video) {
        const handleCanPlay = () => {
          if (video.paused) {
            video.play().catch(() => {});
          }
        };
        video.addEventListener("canplay", handleCanPlay);
        cleanupFunctions.push(() => {
          video.removeEventListener("canplay", handleCanPlay);
        });
      }
    });

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, []);

  useEffect(() => {
    const section = scrollSectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let horizontalScrollPosition = 0;
    const maxTranslate = track.scrollWidth - window.innerWidth;

    const updateTrackPosition = (translate: number) => {
      const clampedTranslate = Math.max(0, Math.min(translate, maxTranslate));
      track.style.transform = `translateX(-${clampedTranslate}px)`;
      return clampedTranslate;
    };

    const handleScroll = () => {
      if (!section || !track) return;

      const scrollTop = window.scrollY - section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      const totalScrollable = sectionHeight - windowHeight;

      if (totalScrollable <= 0) return;

      const progress = Math.min(Math.max(scrollTop / totalScrollable, 0), 1);
      horizontalScrollPosition = progress * maxTranslate;
      updateTrackPosition(horizontalScrollPosition);
      updateVisibleVideo();
    };

    const handleWheel = (e: WheelEvent) => {
      if (!section || !track) return;

      const deltaX = e.deltaX;
      const deltaY = e.deltaY;

      if (deltaX === 0 || Math.abs(deltaX) < Math.abs(deltaY)) return;

      const rect = section.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      if (maxTranslate <= 0) return;

      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      const totalScrollable = sectionHeight - windowHeight;

      if (totalScrollable <= 0) return;

      const scrollRatio = totalScrollable / maxTranslate;
      const currentScrollTop = Math.max(0, window.scrollY - section.offsetTop);
      const deltaY_scroll = deltaX * scrollRatio;
      const newScrollTop = Math.max(
        0,
        Math.min(currentScrollTop + deltaY_scroll, totalScrollable)
      );

      window.scrollTo({
        top: section.offsetTop + newScrollTop,
        behavior: "auto",
      });
    };

    let updateVideoRafId: number | null = null;
    const videos = videoRefs.current;
    const videosLength = videos.length;

    const updateVisibleVideo = () => {
      if (updateVideoRafId !== null) return;

      updateVideoRafId = requestAnimationFrame(() => {
        if (!trackRef.current) {
          updateVideoRafId = null;
          return;
        }

        const viewportCenter = window.innerWidth * 0.5;
        let maxVisibleArea = 0;
        let mostVisibleIndex = 0;

        for (let i = 0; i < videosLength; i++) {
          const video = videos[i];
          if (!video) continue;

          const videoRect = video.getBoundingClientRect();
          const videoCenter = videoRect.left + videoRect.width * 0.5;
          const distanceFromCenter = Math.abs(viewportCenter - videoCenter);
          const visibleArea = Math.max(
            0,
            videoRect.width - distanceFromCenter * 2
          );

          if (visibleArea > maxVisibleArea) {
            maxVisibleArea = visibleArea;
            mostVisibleIndex = i;
          }
        }

        const prevIndex = currentVisibleIndexRef.current;
        if (prevIndex !== mostVisibleIndex && prevIndex !== -1) {
          setIsSoundOn(false);
        }
        currentVisibleIndexRef.current = mostVisibleIndex;

        for (let i = 0; i < videosLength; i++) {
          const video = videos[i];
          if (!video) continue;

          const isActive = i === mostVisibleIndex;
          const shouldHaveSound = isSoundOn && isActive;

          if (
            !video.paused &&
            video.playbackRate !== 1 &&
            video.playbackRate !== 0
          ) {
            video.playbackRate = 1;
          }

          if (video.paused && video.readyState >= 2) {
            video.play().catch(() => {});
          }
          if (shouldHaveSound) {
            if (video.readyState < 3) {
              video.preload = "auto";
            }
            if (video.muted) {
              video.muted = false;
              video.volume = 1;
            }
          } else if (!video.muted) {
            video.muted = true;
          }
        }

        updateVideoRafId = null;
      });
    };

    handleScroll();
    updateVisibleVideo();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      if (updateVideoRafId !== null) {
        cancelAnimationFrame(updateVideoRafId);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isSoundOn]);

  return (
    <div className="min-h-screen bg-(--color-deep-forest) text-(--color-mist)">
      <header className="fixed top-0 left-0 right-0 z-50 mx-auto w-full max-w-7xl px-3 py-3 sm:px-6 sm:py-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src="/logo.webp"
              alt="TOLEGEND"
              className="h-8 w-auto sm:h-10"
            />
            <span className="text-base sm:text-xl font-semibold tracking-wider text-white">
              TOLEGEND
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-6">
            <a
              href="https://api.whatsapp.com/message/Z53V5ZNNML53D1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsHoveringLink(true)}
              onMouseLeave={() => setIsHoveringLink(false)}
              className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white/70 transition hover:border-(--color-peach) hover:bg-(--color-peach)/20 hover:text-(--color-peach)"
              aria-label="WhatsApp"
            >
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/tolegend.art"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsHoveringLink(true)}
              onMouseLeave={() => setIsHoveringLink(false)}
              className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white/70 transition hover:border-(--color-peach) hover:bg-(--color-peach)/20 hover:text-(--color-peach)"
              aria-label="Instagram"
            >
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://t.me/tolegend_production"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsHoveringLink(true)}
              onMouseLeave={() => setIsHoveringLink(false)}
              className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white/70 transition hover:border-(--color-peach) hover:bg-(--color-peach)/20 hover:text-(--color-peach)"
              aria-label="Telegram"
            >
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@tolegend.art"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsHoveringLink(true)}
              onMouseLeave={() => setIsHoveringLink(false)}
              className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white/70 transition hover:border-(--color-peach) hover:bg-(--color-peach)/20 hover:text-(--color-peach)"
              aria-label="TikTok"
            >
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
          </div>
        </div>
      </header>
      <div
        ref={scrollSectionRef}
        style={{ height: sectionHeight }}
        className="relative"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div
            ref={trackRef}
            className="flex h-full will-change-transform"
            style={{ width: trackWidth }}
          >
            {slides.map((slide, index) => (
              <section
                key={slide.title}
                className="relative h-full w-screen shrink-0 cursor-pointer"
                onClick={() => {
                  setSelectedSlideIndex(index);
                  setIsGalleryOpen(true);
                }}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  className="absolute inset-0 h-full w-full object-cover"
                  src={slide.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div
                  className={`absolute inset-0 bg-black transition-opacity duration-1000 ease-in-out ${
                    isSoundOn ? "opacity-0" : "opacity-70"
                  }`}
                />
                {slide.isVisibleText && (
                  <div
                    className={`relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6 text-center transition-opacity duration-1000 ease-in-out ${
                      isSoundOn ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <div className="rounded-2xl bg-black/20 px-8 py-6 backdrop-blur-md">
                      <p className="text-xs uppercase tracking-[0.7em] text-(--color-peach)">
                        TOLEGEND
                      </p>
                      <h1 className="mt-4 text-4xl font-semibold text-white md:text-6xl">
                        {slide.title}
                      </h1>
                      <p className="mt-4 max-w-2xl text-lg text-white/80">
                        {slide.caption}
                      </p>
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none fixed z-[10000] mix-blend-difference"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: "translate(-50%, -50%)",
          opacity: isHovering ? 1 : 0,
          transition:
            "opacity 0.2s, transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-(--color-peach) bg-transparent transition-all duration-300 ${
            isHoveringLink ? "h-16 w-16" : "h-10 w-10"
          }`}
          style={{
            animation: "cursorPulse 2s ease-in-out infinite",
          }}
        />
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--color-peach) transition-all duration-300 ${
            isHoveringLink ? "h-4 w-4" : "h-3 w-3"
          }`}
        />
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--color-peach)/20 ${
            isHoveringLink ? "h-16 w-16" : "h-10 w-10"
          }`}
          style={{
            animation: "cursorRipple 2s ease-out infinite",
          }}
        />
      </div>
      <button
        onClick={() => setIsSoundOn(!isSoundOn)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/40 backdrop-blur-md text-white transition-all duration-300 hover:border-(--color-peach) hover:bg-black/60 hover:scale-110"
        aria-label={isSoundOn ? "Выключить звук" : "Включить звук"}
      >
        {isSoundOn ? (
          <svg
            className="h-6 w-6 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            />
          </svg>
        )}
      </button>

      {/* Модальное окно галереи */}
      {isGalleryOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-(--color-deep-forest)"
          onClick={() => setIsGalleryOpen(false)}
        >
          {/* Фон с анимацией */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-500"
            style={{
              animation: "fadeIn 0.5s ease-out",
            }}
          />

          {/* Контент галереи */}
          <div
            className="relative z-10 h-full w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: "slideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            {/* Кнопка закрытия */}
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="fixed top-6 right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/40 backdrop-blur-md text-white transition-all duration-300 hover:border-(--color-peach) hover:bg-black/60 hover:scale-110"
              aria-label="Закрыть"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Галерея */}
            <div
              className="h-full w-full overflow-y-auto px-6 py-20"
              style={{
                animation: "galleryContainerFade 0.8s ease-out",
              }}
            >
              <div className="mx-auto w-full max-w-7xl">
                {/* Сетка картинок */}
                <div
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  style={{
                    animation: "galleryGridReveal 1s ease-out 0.2s both",
                  }}
                >
                  {galleryImages.map((image, index) => {
                    const animationTypes = [
                      "gallerySlideUp",
                      "gallerySlideRight",
                      "gallerySlideLeft",
                      "galleryScale",
                      "galleryFade",
                    ];
                    const animationType =
                      animationTypes[index % animationTypes.length];
                    const delay = index * 0.08;

                    return (
                      <div
                        key={image.id}
                        onClick={() => router.push(`/gallery/${image.id}`)}
                        className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm transition-all duration-700 hover:scale-105 hover:border-(--color-peach) hover:shadow-2xl hover:shadow-(--color-peach)/30"
                        style={{
                          animation: `${animationType} 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s both`,
                          opacity: 0,
                        }}
                      >
                        <ImageWithPlaceholder
                          src={image.src}
                          alt={image.alt}
                          title={image.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />
                        <div className="absolute bottom-4 left-4 translate-y-4 text-sm font-semibold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                          #{image.id}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
