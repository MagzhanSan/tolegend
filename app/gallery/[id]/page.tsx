"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import NProgress from "nprogress";

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

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
  }, [src]);

  return (
    <div className="relative h-full w-full min-h-[400px]">
      {!imageError && imageLoaded ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover opacity-100 transition-opacity duration-500"
          loading="eager"
        />
      ) : null}
      {imageError || !imageLoaded ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-(--color-deep-forest) via-(--color-teal) to-(--color-deep-forest) p-8">
          <svg
            className="mb-4 h-16 w-16 text-(--color-peach)/50"
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
          <p className="text-center text-lg font-medium text-white/70">
            {imageError ? "Изображение не найдено" : "Изображение загружается"}
          </p>
          <p className="mt-2 text-center text-sm text-white/50">{title}</p>
        </div>
      ) : null}
    </div>
  );
}

export default function GalleryItemPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);
  const [image, setImage] = useState(
    galleryImages.find((img) => img.id === id)
  );
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  useEffect(() => {
    const foundImage = galleryImages.find((img) => img.id === id);
    if (!foundImage) {
      NProgress.start();
      router.push("/");
      return;
    }
    setImage(foundImage);
  }, [id, router]);

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

  if (!image) {
    return null;
  }

  return (
    <div className="min-h-screen bg-(--color-deep-forest) text-(--color-mist)">
      <button
        onClick={() => {
          NProgress.start();
          router.back();
        }}
        onMouseEnter={() => setIsHoveringLink(true)}
        onMouseLeave={() => setIsHoveringLink(false)}
        className="fixed top-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/40 backdrop-blur-md text-white transition-all duration-300 hover:border-(--color-peach) hover:bg-black/60 hover:scale-110"
        aria-label="Назад"
        style={{
          animation: "slideUp 0.6s ease-out",
        }}
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="flex min-h-screen items-center justify-center px-6 py-20">
        <div
          className="mx-auto w-full max-w-5xl"
          style={{
            animation: "galleryContainerFade 0.8s ease-out",
          }}
        >
          <div
            className="relative mb-8 overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm"
            style={{
              animation: "galleryScale 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <ImageWithPlaceholder
              src={image.src}
              alt={image.alt}
              title={image.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          <div
            className="text-center"
            style={{
              animation:
                "gallerySlideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both",
            }}
          >
            <h1 className="mb-6 text-4xl font-semibold text-white md:text-6xl">
              {image.title}
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
              {image.description}
            </p>
          </div>

          <div
            className="mt-12 flex flex-wrap items-center justify-center gap-6"
            style={{
              animation: "galleryFade 0.8s ease-out 0.4s both",
            }}
          >
            {/* <div className="rounded-full border border-white/20 bg-black/30 px-6 py-3 backdrop-blur-sm">
              <span className="text-sm text-white/70">ID:</span>
              <span className="ml-2 text-white">#{image.id}</span>
            </div> */}
            <div className="rounded-full border border-white/20 bg-black/30 px-6 py-3 backdrop-blur-sm">
              <span className="text-sm text-white/70">Коллекция:</span>
              <span className="ml-2 text-white">TOLEGEND Gallery</span>
            </div>
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
    </div>
  );
}
