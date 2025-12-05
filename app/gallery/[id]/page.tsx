"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import NProgress from "nprogress";
import Image from "next/image";

const projectInfo: Record<string, { title: string; description: string }> = {
  "god-rabochih-profesii": {
    title: "Год рабочих профессий",
    description:
      "Мы разработали визуальные и коммуникационные материалы для национального проекта «Год рабочих профессий». Подготовили макеты для соцсетей, наружной рекламы и официальных носителей. Проект направлен на повышение престижа рабочих специальностей и уважения к труду.",
  },
  jetisu: {
    title: "Казахстан Регби",
    description:
      "Мы провели полный ребрендинг национальной федерации: новый логотип, фирменные цвета и айдентика для формы, мерча и медиа. Федерация получила современный образ, адаптированный под международные площадки.",
  },
  regbi: {
    title: "Область Жетысу",
    description:
      "Мы создали фирменный стиль региона: логотип, паттерны и фирменную палитру. Новый визуальный язык сделал Жетысу узнаваемым брендом, основанным на природе и культуре Семиречья!",
  },
};

const galleryImages = [
  {
    id: 1,
    src: "/projects/god-rabochih-profesii/Айбек Таңатаров.webp",
    alt: "Айбек Таңатаров",
    folder: "god-rabochih-profesii",
  },
  {
    id: 2,
    src: "/projects/god-rabochih-profesii/Айбек Шенгельбаев.webp",
    alt: "Айбек Шенгельбаев",
    folder: "god-rabochih-profesii",
  },
  {
    id: 3,
    src: "/projects/god-rabochih-profesii/Андрей Руш.webp",
    alt: "Андрей Руш",
    folder: "god-rabochih-profesii",
  },
  {
    id: 4,
    src: "/projects/god-rabochih-profesii/Балымқұл Иманбаева.webp",
    alt: "Балымқұл Иманбаева",
    folder: "god-rabochih-profesii",
  },
  {
    id: 5,
    src: "/projects/god-rabochih-profesii/Дмитрий Зубарев.webp",
    alt: "Дмитрий Зубарев",
    folder: "god-rabochih-profesii",
  },
  {
    id: 6,
    src: "/projects/god-rabochih-profesii/Ермек Қасымбеков.webp",
    alt: "Ермек Қасымбеков",
    folder: "god-rabochih-profesii",
  },
  {
    id: 7,
    src: "/projects/god-rabochih-profesii/Жанар Сагитова.webp",
    alt: "Жанар Сагитова",
    folder: "god-rabochih-profesii",
  },
  {
    id: 8,
    src: "/projects/god-rabochih-profesii/Каиржан Алимгожин.webp",
    alt: "Каиржан Алимгожин",
    folder: "god-rabochih-profesii",
  },
  {
    id: 9,
    src: "/projects/god-rabochih-profesii/Лейла Амангельдинова.webp",
    alt: "Лейла Амангельдинова",
    folder: "god-rabochih-profesii",
  },
  {
    id: 10,
    src: "/projects/god-rabochih-profesii/Людмила Харанжевская.webp",
    alt: "Людмила Харанжевская",
    folder: "god-rabochih-profesii",
  },
  {
    id: 11,
    src: "/projects/god-rabochih-profesii/Мереке Сыздыков.webp",
    alt: "Мереке Сыздыков",
    folder: "god-rabochih-profesii",
  },
  {
    id: 12,
    src: "/projects/god-rabochih-profesii/Нурлан Сыздыкбаев.webp",
    alt: "Нурлан Сыздыкбаев",
    folder: "god-rabochih-profesii",
  },
  {
    id: 13,
    src: "/projects/god-rabochih-profesii/Сәулет Абзалов.webp",
    alt: "Сәулет Абзалов",
    folder: "god-rabochih-profesii",
  },
  {
    id: 14,
    src: "/projects/god-rabochih-profesii/Шадимов Берик.webp",
    alt: "Шадимов Берик",
    folder: "god-rabochih-profesii",
  },
  {
    id: 15,
    src: "/projects/god-rabochih-profesii/Шаханова Алмагуль.webp",
    alt: "Шаханова Алмагуль",
    folder: "god-rabochih-profesii",
  },
  {
    id: 16,
    src: "/projects/jetisu/banner.webp",
    alt: "Jetisu Banner",
    folder: "jetisu",
  },
  {
    id: 17,
    src: "/projects/jetisu/j-flag.webp",
    alt: "Jetisu Flag",
    folder: "jetisu",
  },
  {
    id: 18,
    src: "/projects/jetisu/seat.webp",
    alt: "Jetisu Seat",
    folder: "jetisu",
  },
  {
    id: 19,
    src: "/projects/regbi/ball.webp",
    alt: "Regbi Ball",
    folder: "regbi",
  },
  {
    id: 20,
    src: "/projects/regbi/r-flag.webp",
    alt: "Regbi Flag",
    folder: "regbi",
  },
];

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
    <div className={`relative h-full w-full`}>
      {!imageError && imageLoaded ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover opacity-100 transition-opacity duration-500 ${className}`}
          loading={priority ? "eager" : "lazy"}
          quality={quality}
          priority={priority}
          unoptimized={false}
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
  const galleryScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const foundImage = galleryImages.find((img) => img.id === id);
    if (!foundImage) {
      if (typeof window !== "undefined") {
        NProgress.start();
      }
      router.push("/");
      return;
    }
    setImage(foundImage);

    const projectImages = galleryImages.filter(
      (img) => img.folder === foundImage.folder
    );

    projectImages.forEach((projectImage, index) => {
      setTimeout(() => {
        if (typeof document !== "undefined") {
          const link = document.createElement("link");
          link.rel = "preload";
          link.as = "image";
          link.href = projectImage.src;
          link.fetchPriority = index === 0 ? "high" : "low";
          document.head.appendChild(link);
        }
        const img = new window.Image();
        img.src = projectImage.src;
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

  const project = projectInfo[image.folder];

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
          <div
            className="relative mb-8 overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm h-[600px]"
            style={{
              animation: "galleryScale 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <ImageWithPlaceholder
              src={image.src}
              alt={image.alt}
              title={project?.title || image.alt}
              priority={true}
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {project && (
            <div
              className="text-center mb-12"
              style={{
                animation:
                  "gallerySlideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both",
              }}
            >
              <h1 className="mb-6 text-4xl font-semibold text-white md:text-6xl">
                {project.title}
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
                {project.description}
              </p>
            </div>
          )}

        </div>
        {(() => {
          const projectImages = galleryImages.filter(
            (img) => img.folder === image.folder && img.id !== image.id
          );

          if (projectImages.length === 0) return null;

          const shouldCenter = projectImages.length <= 4;

          return (
            <div
              className="mt-12"
              style={{
                animation: "galleryFade 0.8s ease-out 0.4s both",
              }}
            >
              <div
                className={`hidden md:block w-full ${shouldCenter ? "" : ""}`}
              >
                <div
                  ref={galleryScrollRef}
                  className={`gallery-scroll h-[600px] overflow-x-auto overflow-y-hidden ${
                    shouldCenter ? "flex items-center justify-center" : ""
                  }`}
                  style={
                    shouldCenter
                      ? {}
                      : {
                          maxWidth: "100%",
                        }
                  }
                >
                  <div
                    className="flex gap-2 h-full"
                    style={shouldCenter ? {} : { maxWidth: "100%" }}
                  >
                    {(() => {
                      if (projectImages.length === 1) {
                        const image = projectImages[0];
                        const animationTypes = [
                          "gallerySlideUp",
                          "gallerySlideRight",
                          "gallerySlideLeft",
                          "galleryScale",
                          "galleryFade",
                        ];
                        const animationType = animationTypes[0];
                        const delay = 0;

                        return (
                          <div
                            key={image.id}
                            onClick={() => {
                              if (typeof window !== "undefined") {
                                NProgress.start();
                              }
                              router.push(`/gallery/${image.id}`);
                            }}
                            className="group relative w-[800px] h-full cursor-pointer overflow-hidden bg-black/30 backdrop-blur-sm"
                            style={{
                              animation: `${animationType} 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s both`,
                              opacity: 0,
                            }}
                          >
                            <div className="absolute inset-0">
                              <ImageWithPlaceholder
                                src={image.src}
                                alt={image.alt}
                                title={image.alt}
                              />
                            </div>
                            <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:opacity-0" />
                          </div>
                        );
                      }

                      if (projectImages.length === 2) {
                        return (
                          <>
                            {projectImages.map((image, index) => {
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
                                  onClick={() => {
                                    if (typeof window !== "undefined") {
                                      NProgress.start();
                                    }
                                    router.push(`/gallery/${image.id}`);
                                  }}
                                  className="group relative w-[600px] h-full cursor-pointer overflow-hidden bg-black/30 backdrop-blur-sm"
                                  style={{
                                    animation: `${animationType} 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s both`,
                                    opacity: 0,
                                  }}
                                >
                                  <div className="absolute inset-0">
                                    <ImageWithPlaceholder
                                      src={image.src}
                                      alt={image.alt}
                                      title={image.alt}
                                    />
                                  </div>
                                  <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:opacity-0" />
                                </div>
                              );
                            })}
                          </>
                        );
                      }

                      const rowHeightsDesktop = [
                        14, 16, 18, 15, 17, 14, 18, 16,
                      ];
                      const rowHeightsDesktopLarge = [
                        28, 32, 36, 30, 34, 28, 36, 32,
                      ];
                      const sizeVariants = [
                        {
                          width: "w-32",
                          widthTablet: "sm:w-40",
                          widthDesktop: "lg:w-80",
                          isLarge: false,
                        },
                        {
                          width: "w-64",
                          widthTablet: "sm:w-80",
                          widthDesktop: "lg:w-[648px]",
                          isLarge: true,
                        },
                        {
                          width: "w-32",
                          widthTablet: "sm:w-40",
                          widthDesktop: "lg:w-80",
                          isLarge: false,
                        },
                        {
                          width: "w-32",
                          widthTablet: "sm:w-40",
                          widthDesktop: "lg:w-80",
                          isLarge: false,
                        },
                        {
                          width: "w-96",
                          widthTablet: "sm:w-[512px]",
                          widthDesktop: "lg:w-[648px]",
                          isLarge: true,
                        },
                        {
                          width: "w-32",
                          widthTablet: "sm:w-40",
                          widthDesktop: "lg:w-80",
                          isLarge: false,
                        },
                        {
                          width: "w-32",
                          widthTablet: "sm:w-40",
                          widthDesktop: "lg:w-80",
                          isLarge: false,
                        },
                        {
                          width: "w-48",
                          widthTablet: "sm:w-64",
                          widthDesktop: "lg:w-80",
                          isLarge: false,
                        },
                        {
                          width: "w-32",
                          widthTablet: "sm:w-40",
                          widthDesktop: "lg:w-80",
                          isLarge: false,
                        },
                        {
                          width: "w-64",
                          widthTablet: "sm:w-80",
                          widthDesktop: "lg:w-[648px]",
                          isLarge: true,
                        },
                      ];

                      const columns: Array<{
                        items: Array<{
                          image: (typeof projectImages)[0];
                          index: number;
                          rowIndex: number;
                        }>;
                        hasLargeImage: boolean;
                        largeImageOnTop: boolean;
                      }> = [];

                      let i = 0;
                      while (i < projectImages.length) {
                        let hasLargeImage = false;
                        let largeImageIndex = -1;
                        for (
                          let check = 0;
                          check < 3 && i + check < projectImages.length;
                          check++
                        ) {
                          const checkIndex = i + check;
                          const checkSize =
                            sizeVariants[checkIndex % sizeVariants.length];
                          if (checkSize.isLarge) {
                            hasLargeImage = true;
                            largeImageIndex = checkIndex;
                            break;
                          }
                        }

                        const column: Array<{
                          image: (typeof projectImages)[0];
                          index: number;
                          rowIndex: number;
                        }> = [];

                        if (hasLargeImage) {
                          const largeImageOnTop = columns.length % 2 === 0;

                          const smallImages: Array<{
                            image: (typeof projectImages)[0];
                            index: number;
                          }> = [];
                          let largeImage: {
                            image: (typeof projectImages)[0];
                            index: number;
                          } | null = null;

                          for (
                            let j = 0;
                            j < 3 && i + j < projectImages.length;
                            j++
                          ) {
                            const currentIndex = i + j;
                            const currentSize =
                              sizeVariants[currentIndex % sizeVariants.length];

                            if (currentSize.isLarge) {
                              largeImage = {
                                image: projectImages[currentIndex],
                                index: currentIndex,
                              };
                            } else if (smallImages.length < 2) {
                              smallImages.push({
                                image: projectImages[currentIndex],
                                index: currentIndex,
                              });
                            }
                          }

                          let nextIndex = i + 3;
                          while (
                            smallImages.length < 2 &&
                            nextIndex < projectImages.length
                          ) {
                            const currentSize =
                              sizeVariants[nextIndex % sizeVariants.length];
                            if (!currentSize.isLarge) {
                              smallImages.push({
                                image: projectImages[nextIndex],
                                index: nextIndex,
                              });
                            }
                            nextIndex++;
                          }

                          if (largeImage) {
                            if (largeImageOnTop) {
                              column.push({
                                image: largeImage.image,
                                index: largeImage.index,
                                rowIndex: 0,
                              });
                              smallImages.forEach((item) => {
                                column.push({
                                  image: item.image,
                                  index: item.index,
                                  rowIndex: 1,
                                });
                              });
                            } else {
                              smallImages.forEach((item) => {
                                column.push({
                                  image: item.image,
                                  index: item.index,
                                  rowIndex: 0,
                                });
                              });
                              column.push({
                                image: largeImage.image,
                                index: largeImage.index,
                                rowIndex: 1,
                              });
                            }
                          }

                          i = Math.max(i + 3, nextIndex);
                          columns.push({
                            items: column,
                            hasLargeImage: true,
                            largeImageOnTop,
                          });
                          continue;
                        } else {
                          for (
                            let j = 0;
                            j < 3 && i + j < projectImages.length;
                            j++
                          ) {
                            column.push({
                              image: projectImages[i + j],
                              index: i + j,
                              rowIndex: j,
                            });
                          }
                          i += 3;
                        }

                        columns.push({
                          items: column,
                          hasLargeImage: false,
                          largeImageOnTop: false,
                        });
                      }

                      return columns.map((column, columnIndex) => {
                        if (column.hasLargeImage) {
                          const topRowItems = column.items.filter(
                            (item) => item.rowIndex === 0
                          );
                          const bottomRowItems = column.items.filter(
                            (item) => item.rowIndex === 1
                          );

                          const topRowHasLarge = topRowItems.some((item) => {
                            const size =
                              sizeVariants[item.index % sizeVariants.length];
                            return size.isLarge;
                          });

                          const topRowHeight = topRowHasLarge
                            ? rowHeightsDesktopLarge[0] || 28
                            : topRowItems.length > 0
                            ? rowHeightsDesktop[0] || 14
                            : 0;
                          const bottomRowHeight = topRowHasLarge
                            ? bottomRowItems.length > 0
                              ? rowHeightsDesktop[0] || 14
                              : 0
                            : bottomRowItems.length > 0
                            ? rowHeightsDesktopLarge[1] || 28
                            : 0;
                          const totalHeight = topRowHeight + bottomRowHeight;
                          const topRowHeightPercent =
                            (topRowHeight / totalHeight) * 100;
                          const bottomRowHeightPercent =
                            (bottomRowHeight / totalHeight) * 100;

                          const renderImage = (
                            item: {
                              image: (typeof projectImages)[0];
                              index: number;
                            },
                            heightPercent: number,
                            isRow: boolean
                          ) => {
                            const { image, index } = item;
                            const size =
                              sizeVariants[index % sizeVariants.length];

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
                                onClick={() => {
                                  if (typeof window !== "undefined") {
                                    NProgress.start();
                                  }
                                  router.push(`/gallery/${image.id}`);
                                }}
                                className={`group relative ${
                                  isRow ? "flex-1" : ""
                                } ${size.width} ${size.widthTablet} ${size.widthDesktop} cursor-pointer overflow-hidden bg-black/30 backdrop-blur-sm`}
                                style={{
                                  height: isRow
                                    ? "100%"
                                    : `calc(${heightPercent}% - 0.5rem)`,
                                  flexShrink: 0,
                                  animation: `${animationType} 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s both`,
                                  opacity: 0,
                                }}
                              >
                                <div className="absolute inset-0">
                                  <ImageWithPlaceholder
                                    src={image.src}
                                    alt={image.alt}
                                    title={image.alt}
                                  />
                                </div>
                                <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:opacity-0" />
                              </div>
                            );
                          };

                          return (
                            <div
                              key={columnIndex}
                              className="flex flex-col gap-2 shrink-0 h-full"
                            >
                              {topRowHasLarge ? (
                                topRowItems.map((item) =>
                                  renderImage(item, topRowHeightPercent, false)
                                )
                              ) : (
                                <div
                                  className="flex gap-2 shrink-0"
                                  style={{
                                    height: `calc(${topRowHeightPercent}% - 0.5rem)`,
                                  }}
                                >
                                  {topRowItems.map((item) =>
                                    renderImage(item, 0, true)
                                  )}
                                </div>
                              )}

                              {topRowHasLarge ? (
                                <div
                                  className="flex gap-2 shrink-0"
                                  style={{
                                    height: `calc(${bottomRowHeightPercent}% - 0.5rem)`,
                                  }}
                                >
                                  {bottomRowItems.map((item) =>
                                    renderImage(item, 0, true)
                                  )}
                                </div>
                              ) : (
                                bottomRowItems.map((item) =>
                                  renderImage(
                                    item,
                                    bottomRowHeightPercent,
                                    false
                                  )
                                )
                              )}
                            </div>
                          );
                        } else {
                          const rowHeights = column.items.map((item) => {
                            const rowIndex = item.rowIndex;
                            const size =
                              sizeVariants[item.index % sizeVariants.length];
                            const heightsArray = size.isLarge
                              ? rowHeightsDesktopLarge
                              : rowHeightsDesktop;
                            return (
                              heightsArray[rowIndex % heightsArray.length] || 14
                            );
                          });
                          const totalHeight = rowHeights.reduce(
                            (sum, h) => sum + h,
                            0
                          );
                          const heightPercentages = rowHeights.map(
                            (h) => (h / totalHeight) * 100
                          );

                          return (
                            <div
                              key={columnIndex}
                              className="flex flex-col gap-2 shrink-0 h-full"
                            >
                              {column.items.map((item, itemIndex) => {
                                const { image, index } = item;
                                const size =
                                  sizeVariants[index % sizeVariants.length];
                                const heightPercentage =
                                  heightPercentages[itemIndex];

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
                                    onClick={() => {
                                      if (typeof window !== "undefined") {
                                        NProgress.start();
                                      }
                                      router.push(`/gallery/${image.id}`);
                                    }}
                                    className={`group relative ${size.width} ${size.widthTablet} ${size.widthDesktop} cursor-pointer overflow-hidden bg-black/30 backdrop-blur-sm`}
                                    style={{
                                      height: `calc(${heightPercentage}% - 0.5rem)`,
                                      flexShrink: 0,
                                      animation: `${animationType} 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s both`,
                                      opacity: 0,
                                    }}
                                  >
                                    <div className="absolute inset-0">
                                      <ImageWithPlaceholder
                                        src={image.src}
                                        alt={image.alt}
                                        title={image.alt}
                                      />
                                    </div>
                                    <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:opacity-0" />
                                  </div>
                                );
                              })}
                            </div>
                          );
                        }
                      });
                    })()}
                  </div>
                </div>
              </div>

              <div className="md:hidden grid grid-cols-1 gap-4">
                {projectImages.map((projectImage, index) => {
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
                      key={projectImage.id}
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          NProgress.start();
                        }
                        router.push(`/gallery/${projectImage.id}`);
                      }}
                      className="group relative w-full aspect-square cursor-pointer overflow-hidden bg-black/30 backdrop-blur-sm"
                      style={{
                        animation: `${animationType} 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s both`,
                        opacity: 0,
                      }}
                    >
                      <div className="absolute inset-0">
                        <ImageWithPlaceholder
                          src={projectImage.src}
                          alt={projectImage.alt}
                          title={projectImage.alt}
                        />
                      </div>
                      <div className="hidden md:block absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:opacity-0" />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
