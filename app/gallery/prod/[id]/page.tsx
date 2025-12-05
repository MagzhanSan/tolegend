"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import NProgress from "nprogress";

// Видео для раздела Продакшн
const prodVideos = [
  {
    id: "prod-akimat",
    src: "/new-content/prod/Акимат қайда қарап отыр.mp4",
    title: "Акимат қайда қарап отыр",
    description:
      "Акимат қайда қарап отыр — документальный проект о том, как работают городские службы и специалисты, обеспечивающие повседневный комфорт и безопасность жителей. Сейчас фильм находится в процессе съёмок. Он показывает скрытую сторону города: энергетику, воду, транспорт, медицину, экосистему обслуживания и людей, которые делают жизнь в Астане устойчивой и удобной.",
  },
  {
    id: "prod-parad-pobedy",
    src: "/new-content/prod/Парад победы_.mp4",
    title: "Парад ко Дню Победы",
    description:
      "Мы обеспечили полное медиасопровождение Парада ко Дню Победы. Отсняли всё: от тяжелой военной техники и парадных расчётов до репетиций и торжественного марша. Работали в режиме реального времени — каждый репортаж выходил в день съёмки. Мы справились с экстремальными сроками и показали стране настоящий масштаб событий!",
  },
  {
    id: "prod-podkasty",
    src: "/new-content/prod/Подкасты и прямые эфиры.mp4",
    title: "Подкасты и прямые эфиры",
    description:
      "Мы производим подкасты и трансляции полного цикла: тысячи часов записей и прямых эфиров. Современная студия со звукоизоляцией, профессиональным светом, микрофонами и видеосистемами. Мы создаём контент для YouTube, Instagram и любых цифровых платформ, обеспечивая стабильное качество, чистый звук и удобный формат для зрителей.",
  },
  {
    id: "prod-prezidentskiy-rezerv",
    src: "/new-content/prod/Президентский резерв_.mp4",
    title: "Президентский резерв",
    description:
      "Мы создали 16 документальных фильмов о молодых лидерах и будущих резервах Казахстана. 25 дней съёмок, 6 городов, 3 000 километров пути и 8 терабайтов материала! Проект стал одним из самых масштабных в нашей практике — глубокие интервью, поездки по разным регионам и герои, которые вдохновляют своим профессионализмом и миссией.",
  },
];

export default function ProdGalleryItemPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [video, setVideo] = useState(prodVideos.find((v) => v.id === id));
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const foundVideo = prodVideos.find((v) => v.id === id);
    if (!foundVideo) {
      if (typeof window !== "undefined") {
        NProgress.start();
      }
      router.push("/");
      return;
    }
    setVideo(foundVideo);

    // Предзагрузка видео
    if (typeof document !== "undefined") {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "video";
      link.href = foundVideo.src;
      document.head.appendChild(link);
    }
  }, [id, router]);

  useEffect(() => {
    // Автовоспроизведение видео
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Игнорируем ошибки автовоспроизведения
      });
    }
  }, [video]);

  if (!video) {
    return null;
  }

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
          {/* Баннер с видео */}
          <div
            className="relative mb-8 overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm h-[600px]"
            style={{
              animation: "galleryScale 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={video.src}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Текст описания */}
          <div
            className="text-center mb-12"
            style={{
              animation:
                "gallerySlideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both",
            }}
          >
            <h1 className="mb-6 text-4xl font-semibold text-white md:text-6xl">
              {video.title}
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
              {video.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

