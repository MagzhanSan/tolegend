"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import NProgress from "nprogress";
import Image from "next/image";

// Данные для главных изображений дизайна
const designMainGallery = [
  {
    id: "design-god-rab-prof",
    src: "/new-content/design/Главная галерея/Год раб проф.webp",
    alt: "Год рабочих профессий",
    childFolder: "Год рабочих профессий",
    title: "Год рабочих профессий",
    description:
      "Мы разработали визуальные и коммуникационные материалы для проекта «Год рабочих профессий». Подготовили макеты для соцсетей, наружной рекламы и официальных носителей. Проект направлен на повышение престижа рабочих специальностей и уважения к труду.",
  },
  {
    id: "design-zhetisu",
    src: "/new-content/design/Главная галерея/Жетысу.webp",
    alt: "Жетысу",
    childFolder: "Жетысу",
    title: "Жетысу",
    description:
      "Мы создали фирменный стиль региона: логотип, паттерны и фирменную палитру. Новый визуальный язык сделал Жетысу узнаваемым брендом, основанным на природе и культуре Семиречья!",
  },
  {
    id: "design-zakon-poryadok",
    src: "/new-content/design/Главная галерея/Закон и порядок.webp",
    alt: "Закон и порядок",
    childFolder: "Закон и порядок",
    title: "Закон и Порядок",
    description:
      "Мы разработали визуальную коммуникацию для проекта, направленного на формирование культуры правосознания и укрепление гражданской ответственности. Подготовили серию образовательных материалов, инфографику и медиа-контент, которые объясняют важные правовые нормы простым и понятным языком. Проект способствует повышению доверия к государственным институтам и формирует уважение к закону.",
  },
  {
    id: "design-zakon-poryadok-chb",
    src: "/new-content/design/Главная галерея/Закон и порядок ЧБ.webp",
    alt: "Закон и порядок ЧБ",
    childFolder: "Закон и порядок",
    title: "Закон и Порядок",
    description:
      "Мы разработали визуальную коммуникацию для проекта, направленного на формирование культуры правосознания и укрепление гражданской ответственности. Подготовили серию образовательных материалов, инфографику и медиа-контент, которые объясняют важные правовые нормы простым и понятным языком. Проект способствует повышению доверия к государственным институтам и формирует уважение к закону.",
  },
  {
    id: "design-regbi",
    src: "/new-content/design/Главная галерея/Регби_.webp",
    alt: "Регби",
    childFolder: "Регби",
    title: "Казахстан Регби",
    description:
      "Мы провели полный ребрендинг национальной федерации: новый логотип, фирменные цвета и айдентика для формы, мерча и медиа. Федерация получила современный образ, адаптированный под международные площадки.",
  },
];

// Дочерние изображения для каждого проекта
const designChildGalleries: Record<string, string[]> = {
  "Год рабочих профессий": [
    "/new-content/design/Дочерняя галерея /Год рабочих профессий/автобус грп.webp",
    "/new-content/design/Дочерняя галерея /Год рабочих профессий/билборд 2 грп доч.webp",
    "/new-content/design/Дочерняя галерея /Год рабочих профессий/билборд грп доч.webp",
    "/new-content/design/Дочерняя галерея /Год рабочих профессий/кепки грп доч.webp",
    "/new-content/design/Дочерняя галерея /Год рабочих профессий/остановки грп доч.webp",
    "/new-content/design/Дочерняя галерея /Год рабочих профессий/флаги грп доч.webp",
    "/new-content/design/Дочерняя галерея /Год рабочих профессий/футболки грп доч.webp",
    "/new-content/design/Дочерняя галерея /Год рабочих профессий/худи грп доч.webp",
  ],
  Жетысу: [
    "/new-content/design/Дочерняя галерея /Жетысу/билборд жетысу доч.webp",
    "/new-content/design/Дочерняя галерея /Жетысу/одежда жетысу доч.webp",
    "/new-content/design/Дочерняя галерея /Жетысу/скамейка жетысу доч.webp",
    "/new-content/design/Дочерняя галерея /Жетысу/флаг жетысу доч.webp",
  ],
  "Закон и порядок": [
    "/new-content/design/Дочерняя галерея /Закон и порядок/автобус зип.webp",
    "/new-content/design/Дочерняя галерея /Закон и порядок/билборд зип доч.webp",
    "/new-content/design/Дочерняя галерея /Закон и порядок/кепки зип.webp",
    "/new-content/design/Дочерняя галерея /Закон и порядок/остановки закон доч.webp",
    "/new-content/design/Дочерняя галерея /Закон и порядок/пресс стена зип.webp",
    "/new-content/design/Дочерняя галерея /Закон и порядок/стаканы зип.webp",
    "/new-content/design/Дочерняя галерея /Закон и порядок/худи зип.webp",
  ],
  Регби: [
    "/new-content/design/Дочерняя галерея /Регби/5d047ed408a7b02ff188174ebbdf79935d9cfad1 (3).webp",
    "/new-content/design/Дочерняя галерея /Регби/9b16e58f2c1adca41995f7a0a24402ec98f1d9c5.webp",
    "/new-content/design/Дочерняя галерея /Регби/автобус.webp",
    "/new-content/design/Дочерняя галерея /Регби/баннер.webp",
    "/new-content/design/Дочерняя галерея /Регби/диплом.webp",
    "/new-content/design/Дочерняя галерея /Регби/мяч.webp",
    "/new-content/design/Дочерняя галерея /Регби/папка.webp",
    "/new-content/design/Дочерняя галерея /Регби/пресс стена.webp",
    "/new-content/design/Дочерняя галерея /Регби/Регби.webp",
  ],
};

function ImageWithPlaceholder({
  src,
  alt,
  title,
  className,
  priority = false,
  quality = 90,
}: {
  src: string;
  alt: string;
  title: string;
  className?: string;
  priority?: boolean;
  quality?: number;
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const imgElement = document.createElement("img");
    imgElement.src = src;
    imgElement.onload = () => setImageLoaded(true);
    imgElement.onerror = () => setImageError(true);
  }, [src]);

  return (
    <div className={`relative h-full w-full ${className || ""}`}>
      {!imageError && imageLoaded ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`${
            className || "object-cover"
          } opacity-100 transition-opacity duration-500`}
          loading={priority ? "eager" : "lazy"}
          quality={quality}
          priority={priority}
          unoptimized={false}
        />
      ) : null}
      {imageError || !imageLoaded ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white p-8">
          <svg
            className="mb-4 h-16 w-16 text-gray-400"
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
          <p className="text-center text-lg font-medium text-gray-600">
            {imageError ? "Изображение не найдено" : "Изображение загружается"}
          </p>
          <p className="mt-2 text-center text-sm text-gray-400">{title}</p>
        </div>
      ) : null}
    </div>
  );
}

export default function DesignGalleryItemPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [image, setImage] = useState(
    designMainGallery.find((img) => img.id === id)
  );
  const galleryScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const foundImage = designMainGallery.find((img) => img.id === id);
    if (!foundImage) {
      if (typeof window !== "undefined") {
        NProgress.start();
      }
      router.push("/");
      return;
    }
    setImage(foundImage);

    const childImages = designChildGalleries[foundImage.childFolder] || [];
    childImages.forEach((imageSrc, index) => {
      setTimeout(() => {
        if (typeof document !== "undefined") {
          const link = document.createElement("link");
          link.rel = "preload";
          link.as = "image";
          link.href = imageSrc;
          link.fetchPriority = index === 0 ? "high" : "low";
          document.head.appendChild(link);
        }
        const img = new window.Image();
        img.src = imageSrc;
      }, index * 30);
    });
  }, [id, router]);

  useEffect(() => {
    const galleryElement = galleryScrollRef.current;
    if (!galleryElement) return;

    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth >= 768) {
        const rect = galleryElement.getBoundingClientRect();
        const isOverGallery =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (isOverGallery && e.deltaY !== 0) {
          e.preventDefault();
          galleryElement.scrollLeft += e.deltaY;
        }
      }
    };

    galleryElement.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      galleryElement.removeEventListener("wheel", handleWheel);
    };
  }, []);

  if (!image) {
    return null;
  }

  const childImages = designChildGalleries[image.childFolder] || [];

  return (
    <div className="min-h-screen bg-(--color-deep-forest) text-(--color-mist) px-4 py-4 md:px-0">
      <button
        onClick={() => {
          if (typeof window !== "undefined") {
            NProgress.start();
          }
          router.push("/");
        }}
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

      <div className="min-h-screen">
        <div
          className="w-full max-w-5xl mx-auto"
          style={{
            animation: "galleryContainerFade 0.8s ease-out",
          }}
        >
          {/* Баннер с главным изображением */}
          <div
            className={`relative mb-8 overflow-hidden rounded-2xl border border-white/10 backdrop-blur-sm h-[600px] ${
              id === "design-zakon-poryadok" ? "bg-black" : "bg-white"
            }`}
            style={{
              animation: "galleryScale 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <ImageWithPlaceholder
              src={image.src}
              alt={image.alt}
              title={image.title}
              priority={true}
              quality={100}
              className="object-contain"
            />
          </div>

          {/* Описание проекта */}
          <div
            className="text-center mb-12"
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
        </div>

        {/* Дочерняя галерея */}
        {childImages.length > 0 && (
          <div
            className="mt-12"
            style={{
              animation: "galleryFade 0.8s ease-out 0.4s both",
            }}
          >
            <div className="hidden md:block w-full">
              <div
                ref={galleryScrollRef}
                className="gallery-scroll h-[600px] overflow-x-auto overflow-y-hidden"
                style={{
                  maxWidth: "100%",
                }}
              >
                <div className="flex gap-2 h-full">
                  {childImages.map((imageSrc, index) => {
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
                    const fileName = imageSrc.split("/").pop() || "";

                    return (
                      <div
                        key={imageSrc}
                        className="group relative w-[600px] h-full cursor-pointer overflow-hidden bg-black/30 backdrop-blur-sm flex-shrink-0"
                        style={{
                          animation: `${animationType} 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s both`,
                          opacity: 0,
                        }}
                      >
                        <div className="absolute inset-0">
                          <ImageWithPlaceholder
                            src={imageSrc}
                            alt={fileName}
                            title={fileName}
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:opacity-0" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="md:hidden grid grid-cols-1 gap-4">
              {childImages.map((imageSrc, index) => {
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
                const fileName = imageSrc.split("/").pop() || "";

                return (
                  <div
                    key={imageSrc}
                    className="group relative w-full aspect-square cursor-pointer overflow-hidden bg-black/30 backdrop-blur-sm"
                    style={{
                      animation: `${animationType} 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s both`,
                      opacity: 0,
                    }}
                  >
                    <div className="absolute inset-0">
                      <ImageWithPlaceholder
                        src={imageSrc}
                        alt={fileName}
                        title={fileName}
                      />
                    </div>
                    <div className="hidden md:block absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:opacity-0" />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
