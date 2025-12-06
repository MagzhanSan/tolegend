"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  memo,
} from "react";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";
import Image from "next/image";

const slides = [
  {
    videoMp4: "/new-content/design/left.mp4",
    title: "Дизайн",
    isVisibleText: true,
  },
  {
    videoMp4: "/middle.mp4",
    title: "Продакшн",
    isVisibleText: true,
  },
  {
    videoMp4: "/new-content/events/right.mp4",
    title: "Мероприятия",
    isVisibleText: true,
  },
];

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

// Новые изображения для раздела Дизайн
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

// Новые изображения для раздела Мероприятия (Events)
const eventsMainGallery = [
  {
    id: "events-ne-yo",
    src: "/new-content/events/Фотки/Ne Yo/Ne Yo главная.webp",
    alt: "Ne Yo",
    childFolder: "Ne Yo",
    title: "Ne-Yo — Gentleman Tour (Astana Arena, 2010)",
    description:
      "Мы обеспечили организацию и полное техническое сопровождение международного концерта Ne-Yo в рамках Gentleman Tour. Координировали команды, работу площадки, оборудование и все процессы на арене. Наше участие позволило провести шоу мирового уровня в Астане с точной логистикой, стабильной технической поддержкой и безупречной организацией.",
  },
  {
    id: "events-aziada",
    src: "/new-content/events/Фотки/Азиада/Азиада главная.webp",
    alt: "Азиада",
    childFolder: "Азиада",
    title: "Азиада 2011 — Церемония открытия (Astana Arena)",
    description:
      "Наш креативный директор выступил режиссёром церемонии открытия VII Зимних Азиатских игр. Мы участвовали в организации масштабного международного шоу: синхронизировали свет, экраны, декорации и постановочные элементы. Проект стал знаковым событием, который смотрели миллионы зрителей.",
  },
  {
    id: "events-bezrukov",
    src: "/new-content/events/Фотки/Безруков/Безруков главнаяя.webp",
    alt: "Безруков",
    childFolder: "Безруков",
    title: "Сергей Безруков — Театральный тур «Сирано де Бержерак»",
    description:
      "В 2013 году в Астане мы обеспечили организацию и полное сопровождение театрального тура Сергея Безрукова. От технического обеспечения до координации команд — всё было выстроено так, чтобы спектакль прошёл безупречно и сохранил художественную цельность.",
  },
  {
    id: "events-nish",
    src: "/new-content/events/Фотки/НИШ/НИШ главная.webp",
    alt: "НИШ",
    childFolder: "НИШ",
    title: "Сценография и экстерьер для NIS",
    description:
      "Мы разработали сценографию и экстерьер для мероприятий Назарбаев Интеллектуальных Школ (NIS). Проработали визуальный стиль, сценические конструкции, оформление входных зон и наружные элементы, создали световые решения и композицию пространства.",
  },
  {
    id: "events-nur-otan",
    src: "/new-content/events/Фотки/Нур Отан/НурОтан главная.webp",
    alt: "Нур Отан",
    childFolder: "Нур Отан",
    title: "Сценография для Nur Otan",
    description:
      "Для партии Nur Otan мы подготовили комплексную сценографию официальных мероприятий: сценические элементы, свет, экранную графику и визуальное оформление пространства. Наши решения усилили коммуникацию и сделали мероприятия выразительными и визуально цельными.",
  },
];

// Дочерние изображения для каждого мероприятия
const eventsChildGalleries: Record<string, string[]> = {
  "Ne Yo": [
    "/new-content/events/Фотки/Ne Yo/Ne Yo дочерняя_.webp",
    "/new-content/events/Фотки/Ne Yo/Ne Yo дочка.webp",
    "/new-content/events/Фотки/Ne Yo/Нио дочка 5.webp",
    "/new-content/events/Фотки/Ne Yo/Нио дочка.webp",
  ],
  Азиада: [
    "/new-content/events/Фотки/Азиада/Азиада1.webp",
    "/new-content/events/Фотки/Азиада/Азиада2.webp",
    "/new-content/events/Фотки/Азиада/Азиада3.webp",
  ],
  Безруков: [
    "/new-content/events/Фотки/Безруков/безруков1.webp",
    "/new-content/events/Фотки/Безруков/безруков2.webp",
    "/new-content/events/Фотки/Безруков/безруков3.webp",
  ],
  НИШ: [
    "/new-content/events/Фотки/НИШ/НИШ1.webp",
    "/new-content/events/Фотки/НИШ/НИШ2.webp",
    "/new-content/events/Фотки/НИШ/НИШ3.webp",
  ],
  "Нур Отан": [
    "/new-content/events/Фотки/Нур Отан/НурОтан(3).webp",
    "/new-content/events/Фотки/Нур Отан/НурОтан(4).webp",
    "/new-content/events/Фотки/Нур Отан/НурОтан1.webp",
    "/new-content/events/Фотки/Нур Отан/НурОтан2.webp",
    "/new-content/events/Фотки/Нур Отан/НурОтан5.webp",
  ],
};

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

// Мемоизированный компонент для изображений - предотвращает ненужные ререндеры
const ImageWithPlaceholder = memo(function ImageWithPlaceholder({
  src,
  alt,
  title,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  title: string;
  priority?: boolean;
  className?: string;
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Мемоизированные обработчики
  const handleError = useCallback(() => setImageError(true), []);
  const handleLoad = useCallback(() => setImageLoaded(true), []);

  // Мемоизированный className
  const imageClassName = useMemo(
    () =>
      `${className || "object-cover"} transition-all duration-500 ${
        imageLoaded
          ? "opacity-100 group-hover:scale-105 group-hover:brightness-110"
          : "opacity-0"
      }`,
    [className, imageLoaded]
  );

  return (
    <div className="relative h-full w-full">
      {!imageError ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={handleError}
          onLoad={handleLoad}
          className={imageClassName}
          loading={priority ? "eager" : "lazy"}
          unoptimized={false}
          priority={priority}
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
});

export default function Home() {
  const router = useRouter();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const galleryScrollRef = useRef<HTMLDivElement | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [hoveredVideoIndex, setHoveredVideoIndex] = useState<number | null>(
    null
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [mobileSelectedVideoIndex, setMobileSelectedVideoIndex] = useState<
    number | null
  >(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideosLoading, setIsVideosLoading] = useState(true);
  const [loadedVideosCount, setLoadedVideosCount] = useState(0);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    // Загружаем только первые 5 секунды для максимально быстрого старта
    const TARGET_BUFFER_SECONDS = 5;

    const checkVideosLoaded = () => {
      const totalVideos = slides.length;
      let loaded = 0;

      videoRefs.current.forEach((video) => {
        if (!video) return;

        let hasEnoughBuffer = false;

        // Проверяем готовность видео к воспроизведению
        if (video.readyState >= 3) {
          hasEnoughBuffer = true;
        } else if (video.buffered.length > 0) {
          const bufferedEnd = video.buffered.end(0);
          // Проверяем, загружены ли первые 3 секунды
          hasEnoughBuffer = bufferedEnd >= TARGET_BUFFER_SECONDS;
        }

        if (hasEnoughBuffer) {
          loaded++;
        }
      });

      setLoadedVideosCount(loaded);

      // Скрываем лоадер как только первые секунды всех видео загружены
      if (loaded >= totalVideos) {
        setIsVideosLoading(false);
      }
    };

    const interval = setInterval(checkVideosLoaded, 100);
    const handleProgress = () => {
      checkVideosLoaded();
    };

    const handleCanPlay = () => {
      checkVideosLoaded();
    };

    const handleLoadedData = () => {
      checkVideosLoaded();
    };

    const handleTimeUpdate = () => {
      checkVideosLoaded();
    };

    videoRefs.current.forEach((video) => {
      if (video) {
        video.addEventListener("progress", handleProgress);
        video.addEventListener("canplay", handleCanPlay);
        video.addEventListener("canplaythrough", handleCanPlay);
        video.addEventListener("loadeddata", handleLoadedData);
        video.addEventListener("timeupdate", handleTimeUpdate);
      }
    });

    checkVideosLoaded();

    return () => {
      clearInterval(interval);
      videoRefs.current.forEach((video) => {
        if (video) {
          video.removeEventListener("progress", handleProgress);
          video.removeEventListener("canplay", handleCanPlay);
          video.removeEventListener("canplaythrough", handleCanPlay);
          video.removeEventListener("loadeddata", handleLoadedData);
          video.removeEventListener("timeupdate", handleTimeUpdate);
        }
      });
    };
  }, []);

  useEffect(() => {
    if (isGalleryOpen || isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isGalleryOpen, isMenuOpen]);

  useEffect(() => {
    if (!isGalleryOpen && !isMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isGalleryOpen) {
          setIsGalleryOpen(false);
          setSelectedVideoIndex(null);
        }
        if (isMenuOpen) setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGalleryOpen, isMenuOpen]);

  const [userInteracted, setUserInteracted] = useState(false);

  // Регистрация Service Worker для кэширования
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered:", registration.scope);
        })
        .catch((error) => {
          console.log("SW registration failed:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined" && slides.length > 0) {
      const video = document.createElement("video");
      const supportsWebM =
        video.canPlayType('video/webm; codecs="vp8, vorbis"') !== "" ||
        video.canPlayType('video/webm; codecs="vp9"') !== "";

      if (
        !document.querySelector(
          'link[rel="dns-prefetch"][href="' + window.location.origin + '"]'
        )
      ) {
        const dnsPrefetch = document.createElement("link");
        dnsPrefetch.rel = "dns-prefetch";
        dnsPrefetch.href = window.location.origin;
        document.head.appendChild(dnsPrefetch);
      }

      if (
        !document.querySelector(
          'link[rel="preconnect"][href="' + window.location.origin + '"]'
        )
      ) {
        const preconnect = document.createElement("link");
        preconnect.rel = "preconnect";
        preconnect.href = window.location.origin;
        preconnect.crossOrigin = "anonymous";
        document.head.appendChild(preconnect);
      }

      // Предзагрузка метаданных главных видео (быстро, только информация о видео)
      slides.forEach((slide, index) => {
        const videoUrl = slide.videoMp4;

        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "video";
        link.href = videoUrl;
        link.fetchPriority = index === 0 ? "high" : "auto";
        document.head.appendChild(link);
      });

      // Параллельно начинаем загрузку видео из prod раздела с низким приоритетом
      prodVideos.forEach((video) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "video";
        link.href = video.src;
        link.fetchPriority = "low"; // Низкий приоритет, чтобы не мешать главным видео
        document.head.appendChild(link);
      });
    }
  }, []);

  useEffect(() => {
    const preloadImages = () => {
      galleryImages.forEach((image, index) => {
        setTimeout(() => {
          const img = new window.Image();
          img.src = image.src;
          if (typeof document !== "undefined") {
            const link = document.createElement("link");
            link.rel = "preload";
            link.as = "image";
            link.href = image.src;
            link.fetchPriority = index < 12 ? "high" : "low";
            document.head.appendChild(link);
          }
        }, index * 50);
      });
    };

    const timer = setTimeout(preloadImages, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const unlockVideos = () => {
    setUserInteracted((prev) => {
      if (prev) return prev;

      setTimeout(() => {
        videoRefs.current.forEach((video) => {
          if (video && (video.paused || video.ended)) {
            video.play().catch(() => {});
          }
        });
      }, 0);

      return true;
    });
  };

  useEffect(() => {
    const startAllVideos = () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          if (video.readyState >= 2) {
            if (video.paused) {
              video.play().catch(() => {
                setTimeout(() => {
                  video.play().catch(() => {});
                }, 100);
              });
            }
          } else {
            const handleCanPlay = () => {
              if (video.paused) {
                video.play().catch(() => {
                  setTimeout(() => {
                    video.play().catch(() => {});
                  }, 100);
                });
              }
              video.removeEventListener("canplay", handleCanPlay);
            };
            video.addEventListener("canplay", handleCanPlay, { once: true });
          }
        }
      });
    };

    startAllVideos();

    const interval = setInterval(() => {
      if (!userInteracted) return;
      videoRefs.current.forEach((video) => {
        if (video && video.paused && video.readyState >= 2) {
          video.play().catch(() => {});
        }
      });
    }, 150);

    return () => {
      clearInterval(interval);
    };
  }, [userInteracted]);

  useEffect(() => {
    const checkAndPlayVideos = () => {
      if (!userInteracted) return;
      videoRefs.current.forEach((video) => {
        if (video && video.readyState >= 2) {
          if (video.paused || video.ended) {
            video.play().catch(() => {
              setTimeout(() => {
                if (video && video.paused) {
                  video.play().catch(() => {});
                }
              }, 100);
            });
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;

          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            if (video.paused || video.ended) {
              video.play().catch(() => {
                setTimeout(() => {
                  video.play().catch(() => {});
                }, 100);
              });
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRefs.current.forEach((video) => {
      if (video) {
        observer.observe(video);
      }
    });

    checkAndPlayVideos();
    setTimeout(() => checkAndPlayVideos(), 50);
    setTimeout(() => checkAndPlayVideos(), 150);
    const interval = setInterval(checkAndPlayVideos, 100);

    return () => {
      clearInterval(interval);
      videoRefs.current.forEach((video) => {
        if (video) {
          observer.unobserve(video);
        }
      });
    };
  }, [userInteracted]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (!isSoundOn) {
        video.muted = true;
      } else {
        video.muted = index !== 1;
      }
    });
  }, [isSoundOn]);

  useEffect(() => {
    if (!isGalleryOpen) return;

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
  }, [isGalleryOpen]);

  useEffect(() => {
    if (!isGalleryOpen) return;

    const updateHeights = () => {
      const items = document.querySelectorAll(".gallery-image-item");
      items.forEach((item) => {
        const mobile = item.getAttribute("data-height-mobile");
        const tablet = item.getAttribute("data-height-tablet");
        const desktop = item.getAttribute("data-height-desktop");

        if (!mobile || !tablet || !desktop) return;

        const width = window.innerWidth;
        let height: string;

        if (width >= 1024) {
          height = `${desktop}rem`;
        } else if (width >= 640) {
          height = `${tablet}rem`;
        } else {
          height = `${mobile}rem`;
        }

        (item as HTMLElement).style.height = height;
      });
    };

    updateHeights();
    window.addEventListener("resize", updateHeights);

    return () => {
      window.removeEventListener("resize", updateHeights);
    };
  }, [isGalleryOpen]);

  useEffect(() => {
    const updateVideoFlex = () => {
      requestAnimationFrame(() => {
        const videoSections = document.querySelectorAll(".video-section");
        const isDesktop = window.innerWidth >= 768;
        const activeIndex = isMobile
          ? mobileSelectedVideoIndex
          : hoveredVideoIndex;
        const hasActive = activeIndex !== null;

        videoSections.forEach((section, index) => {
          let flexGrow = 1;
          if (hasActive) {
            if (activeIndex === index) {
              flexGrow = 8;
            } else {
              flexGrow = 1;
            }
          }
          (section as HTMLElement).style.flex = `${flexGrow} 1 0%`;
        });
      });
    };

    updateVideoFlex();
    window.addEventListener("resize", updateVideoFlex);

    return () => {
      window.removeEventListener("resize", updateVideoFlex);
    };
  }, [hoveredVideoIndex, mobileSelectedVideoIndex, isMobile]);

  return (
    <div className="min-h-screen bg-(--color-deep-forest) text-(--color-mist)">
      {isVideosLoading && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-(--color-deep-forest) transition-opacity duration-500">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <img
                src="/logo.webp"
                alt="TOLEGEND"
                className="h-16 w-auto sm:h-20 opacity-80"
              />
            </div>

            <div className="flex gap-2">
              <div
                className="w-2 h-2 rounded-full bg-(--color-peach) animate-pulse"
                style={{ animationDelay: "0s" }}
              />
              <div
                className="w-2 h-2 rounded-full bg-(--color-peach) animate-pulse"
                style={{ animationDelay: "0.2s" }}
              />
              <div
                className="w-2 h-2 rounded-full bg-(--color-peach) animate-pulse"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
          </div>
        </div>
      )}

      <header
        className="fixed top-0 left-0 right-0 z-50 mx-auto w-full max-w-7xl px-3 py-3 sm:px-6 sm:py-6 border-b border-white/10"
        onClick={(e) => {
          if (isMobile) {
            const target = e.target as HTMLElement;
            if (
              target === e.currentTarget ||
              (target.closest("header > div") &&
                !target.closest("button") &&
                !target.closest("a") &&
                !target.closest("img"))
            ) {
              const firstVideo = document.querySelector(".video-section");
              if (firstVideo) {
                (firstVideo as HTMLElement).click();
              }
            }
          }
        }}
      >
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 md:absolute md:left-1/2 md:-translate-x-1/2">
            <img
              src="/logo.webp"
              alt="TOLEGEND"
              className="h-12 w-auto sm:h-15"
            />
          </div>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex h-10 w-10 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white/70 transition hover:border-(--color-peach) hover:bg-(--color-peach)/20 hover:text-(--color-peach) cursor-pointer md:order-first"
            aria-label="Меню"
            title="Контакты"
          >
            <svg
              className="h-6 w-6 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="hidden md:flex items-center gap-2 sm:gap-6">
            <a
              href="https://wa.me/77715259701"
              target="_blank"
              rel="noopener noreferrer"
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
              href="https://www.instagram.com/tolegend.art?igsh=Zm55OTlwZ3Flc29w"
              target="_blank"
              rel="noopener noreferrer"
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
              href="https://www.tiktok.com/@tolegend.art?_t=ZM-8z0EeVDqEe0&_r=1"
              target="_blank"
              rel="noopener noreferrer"
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

      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 md:hidden">
        <a
          href="https://wa.me/77715259701"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white/70 transition hover:border-(--color-peach) hover:bg-(--color-peach)/20 hover:text-(--color-peach)"
          aria-label="WhatsApp"
        >
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
        <a
          href="https://www.instagram.com/tolegend.art?igsh=Zm55OTlwZ3Flc29w"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white/70 transition hover:border-(--color-peach) hover:bg-(--color-peach)/20 hover:text-(--color-peach)"
          aria-label="Instagram"
        >
          <svg
            className="h-5 w-5"
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
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white/70 transition hover:border-(--color-peach) hover:bg-(--color-peach)/20 hover:text-(--color-peach)"
          aria-label="Telegram"
        >
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
          </svg>
        </a>
        <a
          href="https://www.tiktok.com/@tolegend.art?_t=ZM-8z0EeVDqEe0&_r=1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white/70 transition hover:border-(--color-peach) hover:bg-(--color-peach)/20 hover:text-(--color-peach)"
          aria-label="TikTok"
        >
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
          </svg>
        </a>
      </div>
      <div
        className="relative flex flex-col md:flex-row h-screen md:h-screen overflow-hidden"
        onTouchStart={() => unlockVideos()}
        onClick={(e) => {
          unlockVideos();
          if (isMobile && e.target === e.currentTarget) {
            setMobileSelectedVideoIndex(null);
          }
        }}
        onWheel={() => unlockVideos()}
      >
        {slides.map((slide, index) => {
          const isHovered = isMobile
            ? mobileSelectedVideoIndex === index
            : hoveredVideoIndex === index;
          const hasHoveredVideo = isMobile
            ? mobileSelectedVideoIndex !== null
            : hoveredVideoIndex !== null;

          let flexGrow = 1;
          if (hasHoveredVideo) {
            if (isHovered) {
              flexGrow = 8;
            } else {
              flexGrow = 1;
            }
          }

          const handleClick = () => {
            unlockVideos();

            if (isMobile) {
              if (mobileSelectedVideoIndex === index) {
                setSelectedVideoIndex(index);
                setIsGalleryOpen(true);
                setMobileSelectedVideoIndex(null);
              } else {
                setMobileSelectedVideoIndex(index);
              }
            } else {
              setSelectedVideoIndex(index);
              setIsGalleryOpen(true);
            }
          };

          return (
            <Fragment key={slide.title}>
              <section
                key={slide.title}
                className="relative cursor-pointer transition-all duration-700 ease-in-out flex-1 md:flex-none md:h-full video-section"
                style={
                  {
                    minWidth: 0,
                    minHeight: 0,
                    "--flex-grow": flexGrow,
                  } as React.CSSProperties & { "--flex-grow": number }
                }
                data-flex-grow={flexGrow}
                onMouseEnter={() => !isMobile && setHoveredVideoIndex(index)}
                onMouseLeave={() => !isMobile && setHoveredVideoIndex(null)}
                onClick={handleClick}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={(e) => {
                    // После загрузки метаданных, начинаем загружать первые 7 секунд
                    const video = e.currentTarget;
                    // Переключаемся на загрузку первых 7 секунд для быстрого старта
                    video.preload = "auto";
                    // После начала воспроизведения, продолжаем догружать остальное
                    const onPlay = () => {
                      // Видео играет, продолжаем загрузку остального контента
                      video.removeEventListener("play", onPlay);
                    };
                    video.addEventListener("play", onPlay);
                  }}
                >
                  <source src={slide.videoMp4} type="video/mp4" />
                </video>
                <div
                  className={`absolute inset-0 bg-black transition-opacity duration-700 ease-in-out ${
                    isHovered ? "opacity-0" : "opacity-70"
                  }`}
                />
                {slide.isVisibleText && (
                  <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-center px-6 pb-8 transition-all duration-700 ease-in-out md:pb-12">
                    <div className="relative mix-blend-screen">
                      <h1
                        style={{ fontFamily: "var(--font-share-tech)" }}
                        className={`font-light uppercase tracking-[0.3em] text-gray-200 transition-all duration-700 ease-in-out ${
                          isHovered
                            ? "text-lg md:text-xl lg:text-2xl opacity-50"
                            : "text-xl md:text-2xl lg:text-3xl opacity-80"
                        }`}
                      >
                        {slide.title}
                      </h1>
                      <div
                        className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent transition-opacity duration-700 ease-in-out"
                        style={{ opacity: isHovered ? 0.3 : 0.6 }}
                      />
                    </div>
                  </div>
                )}
              </section>
              {index < slides.length - 1 && (
                <div
                  key={`divider-${index}`}
                  className="relative z-20 flex items-center justify-center md:w-px md:h-full w-full h-[0.5px] shrink-0"
                  style={{
                    animation: `dividerSlideDown 0.8s ease-out ${
                      0.3 + index * 0.2
                    }s both`,
                    opacity: 0,
                    backgroundColor: "rgba(255, 245, 235, 0.4)",
                  }}
                >
                  <div
                    className="absolute inset-0 blur-sm"
                    style={{
                      backgroundColor: "rgba(255, 245, 235, 0.4)",
                    }}
                  />
                  <div
                    className="relative h-full w-full"
                    style={{
                      backgroundColor: "rgba(255, 245, 235, 0.4)",
                    }}
                  />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>

      {isGalleryOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-(--color-deep-forest)"
          onClick={() => {
            setIsGalleryOpen(false);
            setSelectedVideoIndex(null);
          }}
        >
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-500"
            style={{
              animation: "fadeIn 0.5s ease-out",
            }}
            onClick={() => {
              setIsGalleryOpen(false);
              setSelectedVideoIndex(null);
            }}
          />

          <div
            className="relative z-10 h-full w-full overflow-hidden"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsGalleryOpen(false);
                setSelectedVideoIndex(null);
              }
            }}
            style={{
              animation: "slideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            <button
              onClick={() => {
                setIsGalleryOpen(false);
                setSelectedVideoIndex(null);
              }}
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

            <div
              ref={galleryScrollRef}
              className="gallery-scroll h-full w-full overflow-y-auto overflow-x-hidden md:overflow-x-auto md:overflow-y-hidden px-4 sm:px-6 py-20"
              style={{
                animation: "galleryContainerFade 0.8s ease-out",
              }}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsGalleryOpen(false);
                  setSelectedVideoIndex(null);
                }
              }}
            >
              <div className="md:hidden grid grid-cols-1 gap-4 pb-4">
                {(selectedVideoIndex === 0
                  ? designMainGallery
                  : selectedVideoIndex === 1
                  ? prodVideos
                  : selectedVideoIndex === 2
                  ? eventsMainGallery
                  : galleryImages
                ).map((item, index) => {
                  // Для prod это видео, для остальных - изображения
                  const isVideo = selectedVideoIndex === 1;
                  const imageId = item.id;
                  const imageSrc = isVideo ? null : item.src;
                  const imageAlt = isVideo
                    ? (item as any).title || (item as any).description || ""
                    : (item as any).alt || (item as any).description || "";
                  const videoSrc = isVideo ? item.src : null;
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
                      key={imageId}
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          NProgress.start();
                        }
                        if (selectedVideoIndex === 0) {
                          router.push(`/gallery/design/${imageId}`);
                        } else if (selectedVideoIndex === 1) {
                          router.push(`/gallery/prod/${imageId}`);
                        } else if (selectedVideoIndex === 2) {
                          router.push(`/gallery/events/${imageId}`);
                        } else {
                          router.push(`/gallery/${imageId}`);
                        }
                      }}
                      className={`group relative w-full cursor-pointer overflow-hidden backdrop-blur-sm ${
                        selectedVideoIndex === 0
                          ? imageId === "design-zakon-poryadok"
                            ? "bg-black aspect-square"
                            : "bg-white aspect-square"
                          : selectedVideoIndex === 1
                          ? "bg-black/30 aspect-video"
                          : "bg-black/30 aspect-square"
                      }`}
                      style={{
                        animation: `${animationType} 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s both`,
                        opacity: 0,
                      }}
                    >
                      {isVideo && videoSrc ? (
                        <>
                          <video
                            className="h-full w-full object-cover"
                            src={videoSrc}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload={
                              selectedVideoIndex === 1 ? "auto" : "metadata"
                            }
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 md:p-5">
                            <h3 className="text-white text-base md:text-xl font-semibold drop-shadow-lg">
                              {(item as any).title || ""}
                            </h3>
                          </div>
                        </>
                      ) : imageSrc ? (
                        <>
                          <div className="absolute inset-0">
                            <ImageWithPlaceholder
                              src={imageSrc}
                              alt={imageAlt}
                              title={imageAlt}
                              priority={index < 6}
                            />
                          </div>
                          {(selectedVideoIndex === 2 ||
                            selectedVideoIndex === 0) &&
                            (item as any).title && (
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 md:p-5">
                                <h3 className="text-white text-base md:text-xl font-semibold drop-shadow-lg">
                                  {(item as any).title || ""}
                                </h3>
                              </div>
                            )}
                        </>
                      ) : null}
                      <div
                        className={`hidden md:block absolute inset-0 transition-opacity duration-500 group-hover:opacity-0 ${
                          selectedVideoIndex === 0
                            ? String(imageId) === "design-zakon-poryadok"
                              ? "bg-black/20"
                              : "bg-white/20"
                            : "bg-black/20"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              <div
                className="hidden md:flex h-full gap-2"
                style={{ minWidth: "max-content" }}
              >
                {(() => {
                  const currentItems =
                    selectedVideoIndex === 0
                      ? designMainGallery
                      : selectedVideoIndex === 1
                      ? prodVideos
                      : selectedVideoIndex === 2
                      ? eventsMainGallery
                      : galleryImages;
                  const isVideo = selectedVideoIndex === 1;
                  // Для видео используем одинаковые размеры, чтобы все были видны
                  const sizeVariants = isVideo
                    ? [
                        {
                          width: "w-80",
                          widthTablet: "sm:w-96",
                          widthDesktop: "lg:w-[500px]",
                          isLarge: false,
                        },
                        {
                          width: "w-80",
                          widthTablet: "sm:w-96",
                          widthDesktop: "lg:w-[500px]",
                          isLarge: false,
                        },
                        {
                          width: "w-80",
                          widthTablet: "sm:w-96",
                          widthDesktop: "lg:w-[500px]",
                          isLarge: false,
                        },
                        {
                          width: "w-80",
                          widthTablet: "sm:w-96",
                          widthDesktop: "lg:w-[500px]",
                          isLarge: false,
                        },
                      ]
                    : [
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
                          width: "w-64",
                          widthTablet: "sm:w-80",
                          widthDesktop: "lg:w-80",
                          isLarge: false,
                        },
                        {
                          width: "w-64",
                          widthTablet: "sm:w-80",
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
                  const rowHeightsDesktop = isVideo
                    ? [16, 16, 16, 16]
                    : [14, 16, 18, 15, 17, 14, 18, 16];
                  const rowHeightsDesktopLarge = isVideo
                    ? [16, 16, 16, 16]
                    : [28, 32, 36, 30, 34, 28, 36, 32];

                  const columns: Array<{
                    items: Array<{
                      image: any;
                      index: number;
                      rowIndex: number;
                    }>;
                    hasLargeImage: boolean;
                    largeImageOnTop: boolean;
                  }> = [];

                  let i = 0;
                  while (i < currentItems.length) {
                    let hasLargeImage = false;
                    let largeImageIndex = -1;
                    for (
                      let check = 0;
                      check < 3 && i + check < currentItems.length;
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
                      image: any;
                      index: number;
                      rowIndex: number;
                    }> = [];

                    if (hasLargeImage) {
                      const largeImageOnTop = columns.length % 2 === 0;

                      const smallImages: Array<{
                        image: any;
                        index: number;
                      }> = [];
                      let largeImage: {
                        image: any;
                        index: number;
                      } | null = null;

                      for (
                        let j = 0;
                        j < 3 && i + j < currentItems.length;
                        j++
                      ) {
                        const currentIndex = i + j;
                        const currentSize =
                          sizeVariants[currentIndex % sizeVariants.length];

                        if (currentSize.isLarge) {
                          largeImage = {
                            image: currentItems[currentIndex],
                            index: currentIndex,
                          };
                        } else if (smallImages.length < 2) {
                          smallImages.push({
                            image: currentItems[currentIndex],
                            index: currentIndex,
                          });
                        }
                      }

                      let nextIndex = i + 3;
                      while (
                        smallImages.length < 2 &&
                        nextIndex < currentItems.length
                      ) {
                        const currentSize =
                          sizeVariants[nextIndex % sizeVariants.length];
                        if (!currentSize.isLarge) {
                          smallImages.push({
                            image: currentItems[nextIndex],
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
                        j < 3 && i + j < currentItems.length;
                        j++
                      ) {
                        column.push({
                          image: currentItems[i + j],
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

                  // Для видео и дизайна показываем в виде квадрата 2x2
                  if (isVideo || selectedVideoIndex === 0) {
                    return (
                      <div
                        key={isVideo ? "videos-grid" : "design-grid"}
                        className="grid grid-cols-2 gap-2 h-full w-full"
                      >
                        {currentItems.map((item, index) => {
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
                          const isDesign = selectedVideoIndex === 0;
                          const bgColor = isDesign
                            ? String(item.id) === "design-zakon-poryadok"
                              ? "bg-black"
                              : "bg-white"
                            : "bg-black/30";

                          return (
                            <div
                              key={item.id}
                              onClick={() => {
                                if (typeof window !== "undefined") {
                                  NProgress.start();
                                }
                                if (isVideo) {
                                  router.push(`/gallery/prod/${item.id}`);
                                } else if (isDesign) {
                                  router.push(`/gallery/design/${item.id}`);
                                }
                              }}
                              className={`group relative cursor-pointer overflow-hidden backdrop-blur-sm ${bgColor}`}
                              style={{
                                animation: `${animationType} 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s both`,
                                opacity: 0,
                              }}
                            >
                              {isVideo ? (
                                <>
                                  <video
                                    className="h-full w-full object-cover"
                                    src={item.src}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload={
                                      selectedVideoIndex === 1
                                        ? "auto"
                                        : "metadata"
                                    }
                                  />
                                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 md:p-5">
                                    <h3 className="text-white text-base md:text-xl font-semibold drop-shadow-lg">
                                      {(item as any).title || ""}
                                    </h3>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="absolute inset-0">
                                    <ImageWithPlaceholder
                                      src={item.src}
                                      alt={
                                        (item as any).alt ||
                                        (item as any).title ||
                                        ""
                                      }
                                      title={
                                        (item as any).title ||
                                        (item as any).alt ||
                                        ""
                                      }
                                      className={
                                        isDesign ? "object-contain" : undefined
                                      }
                                    />
                                  </div>
                                  {isDesign && (item as any).title && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 md:p-5">
                                      <h3 className="text-white text-base md:text-xl font-semibold drop-shadow-lg">
                                        {(item as any).title || ""}
                                      </h3>
                                    </div>
                                  )}
                                </>
                              )}
                              <div
                                className={`absolute inset-0 transition-opacity duration-500 group-hover:opacity-0 ${
                                  isDesign
                                    ? String(item.id) ===
                                      "design-zakon-poryadok"
                                      ? "bg-black/20"
                                      : "bg-white/20"
                                    : "bg-black/20"
                                }`}
                              />
                            </div>
                          );
                        })}
                      </div>
                    );
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
                          image: (typeof galleryImages)[0];
                          index: number;
                        },
                        heightPercent: number,
                        isRow: boolean
                      ) => {
                        const { image, index } = item;
                        const size = sizeVariants[index % sizeVariants.length];

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

                        const itemSrc = isVideo ? image.src : image.src;
                        const itemAlt = isVideo
                          ? (image as any).title || (image as any).description
                          : (image as any).alt || (image as any).description;
                        const itemTitle = isVideo
                          ? (image as any).title || (image as any).description
                          : (image as any).alt || (image as any).description;

                        return (
                          <div
                            key={image.id || image.src}
                            onClick={() => {
                              if (typeof window !== "undefined") {
                                NProgress.start();
                              }
                              if (selectedVideoIndex === 0) {
                                router.push(`/gallery/design/${image.id}`);
                              } else if (selectedVideoIndex === 1) {
                                router.push(`/gallery/prod/${image.id}`);
                              } else if (selectedVideoIndex === 2) {
                                router.push(`/gallery/events/${image.id}`);
                              } else {
                                router.push(`/gallery/${image.id}`);
                              }
                            }}
                            className={`group relative ${
                              isRow ? "flex-1" : ""
                            } ${size.width} ${size.widthTablet} ${
                              size.widthDesktop
                            } cursor-pointer overflow-hidden backdrop-blur-sm ${
                              selectedVideoIndex === 0
                                ? String(image.id) === "design-zakon-poryadok"
                                  ? "bg-black"
                                  : "bg-white"
                                : "bg-black/30"
                            }`}
                            style={{
                              height: isRow
                                ? "100%"
                                : `calc(${heightPercent}% - 0.5rem)`,
                              flexShrink: 0,
                              animation: `${animationType} 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s both`,
                              opacity: 0,
                            }}
                          >
                            {isVideo ? (
                              <>
                                <video
                                  className="h-full w-full object-cover"
                                  src={itemSrc}
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  preload={
                                    selectedVideoIndex === 1
                                      ? "auto"
                                      : "metadata"
                                  }
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 md:p-5">
                                  <h3 className="text-white text-base md:text-xl font-semibold drop-shadow-lg">
                                    {itemTitle || ""}
                                  </h3>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="absolute inset-0">
                                  <ImageWithPlaceholder
                                    src={itemSrc}
                                    alt={itemAlt}
                                    title={itemTitle}
                                    className={
                                      selectedVideoIndex === 0
                                        ? "object-contain"
                                        : undefined
                                    }
                                  />
                                </div>
                                {(selectedVideoIndex === 2 ||
                                  (selectedVideoIndex === 0 && !isVideo)) &&
                                  (image as any).title && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 md:p-5">
                                      <h3 className="text-white text-base md:text-xl font-semibold drop-shadow-lg">
                                        {(image as any).title || ""}
                                      </h3>
                                    </div>
                                  )}
                              </>
                            )}
                            <div
                              className={`absolute inset-0 transition-opacity duration-500 group-hover:opacity-0 ${
                                selectedVideoIndex === 0
                                  ? String(image.id) === "design-zakon-poryadok"
                                    ? "bg-black/20"
                                    : "bg-white/20"
                                  : "bg-black/20"
                              }`}
                            />
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
                              renderImage(item, bottomRowHeightPercent, false)
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

                            const itemSrc = isVideo ? image.src : image.src;
                            const itemAlt = isVideo
                              ? (image as any).title ||
                                (image as any).description ||
                                ""
                              : (image as any).alt ||
                                (image as any).description ||
                                "";
                            const itemTitle = isVideo
                              ? (image as any).title ||
                                (image as any).description ||
                                ""
                              : (image as any).alt ||
                                (image as any).description ||
                                "";

                            return (
                              <div
                                key={image.id || image.src}
                                onClick={() => {
                                  if (typeof window !== "undefined") {
                                    NProgress.start();
                                  }
                                  if (selectedVideoIndex === 0) {
                                    router.push(`/gallery/design/${image.id}`);
                                  } else if (selectedVideoIndex === 1) {
                                    router.push(`/gallery/prod/${image.id}`);
                                  } else if (selectedVideoIndex === 2) {
                                    router.push(`/gallery/events/${image.id}`);
                                  } else {
                                    router.push(`/gallery/${image.id}`);
                                  }
                                }}
                                className={`group relative ${size.width} ${
                                  size.widthTablet
                                } ${
                                  size.widthDesktop
                                } cursor-pointer overflow-hidden backdrop-blur-sm ${
                                  selectedVideoIndex === 0
                                    ? String(image.id) ===
                                      "design-zakon-poryadok"
                                      ? "bg-black"
                                      : "bg-white"
                                    : "bg-black/30"
                                }`}
                                style={{
                                  height: `calc(${heightPercentage}% - 0.5rem)`,
                                  flexShrink: 0,
                                  animation: `${animationType} 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s both`,
                                  opacity: 0,
                                }}
                              >
                                {isVideo ? (
                                  <>
                                    <video
                                      className="h-full w-full object-cover"
                                      src={itemSrc}
                                      autoPlay
                                      muted
                                      loop
                                      playsInline
                                      preload={
                                        selectedVideoIndex === 1
                                          ? "auto"
                                          : "metadata"
                                      }
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 md:p-5">
                                      <h3 className="text-white text-base md:text-xl font-semibold drop-shadow-lg">
                                        {itemTitle || ""}
                                      </h3>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="absolute inset-0">
                                      <ImageWithPlaceholder
                                        src={itemSrc}
                                        alt={itemAlt}
                                        title={itemTitle}
                                        className={
                                          selectedVideoIndex === 0
                                            ? "object-contain"
                                            : undefined
                                        }
                                      />
                                    </div>
                                    {((selectedVideoIndex === 2 && !isVideo) ||
                                      (selectedVideoIndex === 0 && !isVideo)) &&
                                      (image as any).title && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 md:p-5">
                                          <h3 className="text-white text-base md:text-xl font-semibold drop-shadow-lg">
                                            {(image as any).title || ""}
                                          </h3>
                                        </div>
                                      )}
                                  </>
                                )}
                                <div
                                  className={`absolute inset-0 transition-opacity duration-500 group-hover:opacity-0 ${
                                    selectedVideoIndex === 0
                                      ? "bg-white/20"
                                      : "bg-black/20"
                                  }`}
                                />
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
        </div>
      )}

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="gallery-scroll relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-(--color-deep-forest) border border-white/20 p-4 sm:p-6 md:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: "fadeIn 0.3s ease-out",
            }}
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white/70 transition hover:border-(--color-peach) hover:bg-(--color-peach)/20 hover:text-(--color-peach)"
              aria-label="Закрыть"
            >
              <svg
                className="h-5 w-5"
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

            <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl md:text-3xl font-semibold text-white pr-10">
              Контакты
            </h2>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 text-(--color-peach)"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-white/60">Адрес</p>
                  <p className="text-base sm:text-lg font-medium text-white break-words">
                    Астана, улица Динмухамед Конаев, 14
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 text-(--color-peach)"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-white/60">Почта</p>
                  <a
                    href="mailto:info.tolegend@gmail.com"
                    className="text-base sm:text-lg font-medium text-white hover:text-(--color-peach) transition-colors break-words"
                  >
                    info.tolegend@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 text-(--color-peach)"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-white/60">Телефон</p>
                  <a
                    href="tel:+77715259701"
                    className="text-base sm:text-lg font-medium text-white hover:text-(--color-peach) transition-colors break-words"
                  >
                    +7 (771) 525-97-01
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 text-(--color-peach)"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-white/60">2GIS</p>
                  <a
                    href="https://2gis.kz/astana/search/%D0%9A%D1%83%D0%BD%D0%B0%D0%B5%D0%B2%D0%B0%2014/geo/9570784863347799/71.434411%2C51.128527?m=71.424454%2C51.13629%2F13.21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base sm:text-lg font-medium text-white hover:text-(--color-peach) transition-colors break-words"
                  >
                    Открыть в 2GIS
                  </a>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10">
                <p className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-white/60">
                  Социальные сети
                </p>
                <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                  <a
                    href="https://wa.me/77715259701"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 sm:gap-3 rounded-lg border border-white/20 bg-white/5 p-3 sm:p-4 transition hover:border-(--color-peach) hover:bg-white/10"
                  >
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5 text-(--color-peach)"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-white/60">
                        WhatsApp
                      </p>
                      <p className="text-sm sm:text-base font-medium text-white break-words">
                        +7 (771) 525-97-01
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://www.instagram.com/tolegend.art?igsh=Zm55OTlwZ3Flc29w"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 sm:gap-3 rounded-lg border border-white/20 bg-white/5 p-3 sm:p-4 transition hover:border-(--color-peach) hover:bg-white/10"
                  >
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5 text-(--color-peach)"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-white/60">
                        Instagram
                      </p>
                      <p className="text-sm sm:text-base font-medium text-white break-words">
                        @tolegend.art
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://t.me/tolegend_production"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 sm:gap-3 rounded-lg border border-white/20 bg-white/5 p-3 sm:p-4 transition hover:border-(--color-peach) hover:bg-white/10"
                  >
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5 text-(--color-peach)"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-white/60">
                        Telegram
                      </p>
                      <p className="text-sm sm:text-base font-medium text-white break-words">
                        @tolegend_production
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://www.tiktok.com/@tolegend.art?_t=ZM-8z0EeVDqEe0&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 sm:gap-3 rounded-lg border border-white/20 bg-white/5 p-3 sm:p-4 transition hover:border-(--color-peach) hover:bg-white/10"
                  >
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5 text-(--color-peach)"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-white/60">TikTok</p>
                      <p className="text-sm sm:text-base font-medium text-white break-words">
                        @tolegend.art
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="mt-4 sm:mt-6">
                <p className="mb-2 text-xs sm:text-sm text-white/60">
                  Расположение на карте
                </p>
                <div className="h-48 sm:h-64 w-full overflow-hidden rounded-lg border border-white/20 bg-white/5">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?ll=71.434411%2C51.128527&z=16&l=map&text=%D0%90%D1%81%D1%82%D0%B0%D0%BD%D0%B0%2C%20%D1%83%D0%BB%D0%B8%D1%86%D0%B0%20%D0%94%D0%B8%D0%BD%D0%BC%D1%83%D1%85%D0%B0%D0%BC%D0%B5%D0%B4%20%D0%9A%D0%BE%D0%BD%D0%B0%D0%B5%D0%B2%2C%2014"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    style={{ border: 0 }}
                    title="Карта"
                  />
                </div>
                <div className="mt-2 flex items-center justify-center gap-4">
                  <a
                    href="https://yandex.kz/maps/163/astana/house/dinmukhamed_qonaev_koshesi_14/Y0gYcgRnSUcEQFtrfX1zeX1mYg==/?ll=71.436077%2C51.128302&z=17.92"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-(--color-peach) transition-colors"
                  >
                    Открыть в Яндекс.Картах
                  </a>
                  <span className="text-white/30">•</span>
                  <a
                    href="https://2gis.kz/astana/search/%D0%9A%D1%83%D0%BD%D0%B0%D0%B5%D0%B2%D0%B0%2014/geo/9570784863347799/71.434411%2C51.128527"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-(--color-peach) transition-colors"
                  >
                    Открыть в 2GIS
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsSoundOn(!isSoundOn)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/60 backdrop-blur-md text-white/70 transition hover:border-(--color-peach) hover:bg-black/80 hover:text-(--color-peach) cursor-pointer shadow-lg"
        aria-label={isSoundOn ? "Выключить звук" : "Включить звук"}
        title={isSoundOn ? "Выключить звук" : "Включить звук"}
        style={{
          animation: "fadeIn 0.3s ease-out",
        }}
      >
        {isSoundOn ? (
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
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        ) : (
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
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M6.343 6.343l11.314 11.314M9 9v6m-3-3h6"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
