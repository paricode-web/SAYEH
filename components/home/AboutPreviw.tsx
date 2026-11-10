import Link from "next/link";

export default function AboutPreview() {
  return (
    <section className="bg-ink px-6 py-20 text-paper sm:py-28" dir="rtl">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-5 text-sm tracking-[0.5em] text-fog">
          ABOUT LUMINA
        </p>

        <h2 className="text-4xl font-bold md:text-5xl">
          داستان پشت هر اثر
        </h2>

        <p className="mx-auto mt-6 max-w-2xl leading-8 text-fog">
          در لومینا ویتری، شیشه تنها یک متریال نیست؛
          روایتی از نور، رنگ و هنر دست است.
          برای آشنایی بیشتر با داستان ما...
        </p>

        <Link href="/aboutus" className="btn btn-on-dark mt-8 px-10 py-4">
          درباره ما
        </Link>
      </div>
    </section>
  );
}
