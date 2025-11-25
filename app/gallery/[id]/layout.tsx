import { Metadata } from "next";

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
  { id: 1, folder: "god-rabochih-profesii", alt: "Айбек Таңатаров" },
  { id: 2, folder: "god-rabochih-profesii", alt: "Айбек Шенгельбаев" },
  { id: 3, folder: "god-rabochih-profesii", alt: "Андрей Руш" },
  { id: 4, folder: "god-rabochih-profesii", alt: "Балымқұл Иманбаева" },
  { id: 5, folder: "god-rabochih-profesii", alt: "Дмитрий Зубарев" },
  { id: 6, folder: "god-rabochih-profesii", alt: "Ермек Қасымбеков" },
  { id: 7, folder: "god-rabochih-profesii", alt: "Жанар Сагитова" },
  { id: 8, folder: "god-rabochih-profesii", alt: "Каиржан Алимгожин" },
  { id: 9, folder: "god-rabochih-profesii", alt: "Лейла Амангельдинова" },
  { id: 10, folder: "god-rabochih-profesii", alt: "Людмила Харанжевская" },
  { id: 11, folder: "god-rabochih-profesii", alt: "Мереке Сыздыков" },
  { id: 12, folder: "god-rabochih-profesii", alt: "Нурлан Сыздыкбаев" },
  { id: 13, folder: "god-rabochih-profesii", alt: "Сәулет Абзалов" },
  { id: 14, folder: "god-rabochih-profesii", alt: "Шадимов Берик" },
  { id: 15, folder: "god-rabochih-profesii", alt: "Шаханова Алмагуль" },
  { id: 16, folder: "jetisu", alt: "Jetisu Banner" },
  { id: 17, folder: "jetisu", alt: "Jetisu Flag" },
  { id: 18, folder: "jetisu", alt: "Jetisu Seat" },
  { id: 19, folder: "regbi", alt: "Regbi Ball" },
  { id: 20, folder: "regbi", alt: "Regbi Flag" },
];

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = parseInt(params.id);
  const image = galleryImages.find((img) => img.id === id);
  const project = image ? projectInfo[image.folder] : null;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tolegend.art";
  const imageUrl = image
    ? `${baseUrl}/projects/${image.folder}/${image.alt}.webp`
    : `${baseUrl}/og-image.jpg`;

  return {
    title: project ? `${project.title} - TOLEGEND` : `Галерея - TOLEGEND`,
    description: project
      ? project.description
      : "Портфолио работ TOLEGEND. Визуальные решения для брендов и проектов.",
    openGraph: {
      title: project ? `${project.title} - TOLEGEND` : `Галерея - TOLEGEND`,
      description: project ? project.description : "Портфолио работ TOLEGEND",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: image?.alt || "TOLEGEND Gallery",
        },
      ],
      type: "website",
      url: `${baseUrl}/gallery/${id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project ? `${project.title} - TOLEGEND` : `Галерея - TOLEGEND`,
      description: project ? project.description : "Портфолио работ TOLEGEND",
      images: [imageUrl],
    },
    alternates: {
      canonical: `${baseUrl}/gallery/${id}`,
    },
  };
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
