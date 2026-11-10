type GalleryImage = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
};

export default function Gallery({ images }: { images: GalleryImage[] }) {
  return (
    <section className="relative w-full overflow-hidden py-24 sm:py-32" dir="rtl">
      <div className="relative mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-24 text-center">
          <p className="mb-5 text-sm font-bold tracking-[0.5em] text-graphite">
            Gallery
          </p>

          <h2 className="pt-2 text-5xl font-bold tracking-tight text-ink md:text-6xl">
            گالری آثار
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-graphite">
            مجموعه‌ای از تابلوهای شیشه‌ای دست‌ساز که با نور، رنگ و هنر جان گرفته‌اند.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {images.map((item, index) => (
            <div
              key={item.id}
              className={`group relative border-[10px] border-ink bg-ink transition-transform duration-500 hover:-translate-y-2 ${
                index % 3 === 1 ? "lg:-translate-y-12" : ""
              }`}
            >
              <div className="relative h-full overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-[560px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* لایه تیره برای خوانایی متن */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />

                {/* Text */}
                <div className="absolute bottom-8 left-8 right-8 text-paper">
                  <h3 className="mb-3 text-3xl font-bold">{item.title}</h3>

                  {item.description && (
                    <p className="text-sm leading-7 text-paper/85">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* قاب داخلی */}
                <div className="pointer-events-none absolute inset-4 border border-paper/40 transition-colors duration-300 group-hover:border-paper" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
