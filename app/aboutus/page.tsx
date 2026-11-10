export default function AboutUsPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-bg-base text-ink">
      {/* Hero */}
      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-5xl text-center">
          <img src="/logos/mark.svg" alt="" className="mx-auto mb-8 h-14 w-14" />

          <p className="mb-6 text-sm tracking-[0.5em] text-graphite">
            ABOUT SAYEH
          </p>

          <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-8xl">
            داستان پشت هر اثر
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-graphite">
            در لومینا ویتری، شیشه فقط یک متریال نیست؛
            ترکیبی از نور، رنگ، ظرافت و هنر دست است که
            به یک اثر منحصربه‌فرد تبدیل می‌شود.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
          <div>
            <p className="mb-4 text-sm tracking-[0.3em] text-graphite">
              OUR STORY
            </p>

            <h2 className="text-4xl font-bold leading-tight md:text-5xl">
              جایی میان نور
              <br />
              و هنر
            </h2>

            <div className="mt-8 space-y-5 leading-8 text-graphite">
              <p>
                لومینا با یک ایده ساده شکل گرفت؛ اینکه یک اثر هنری
                بتواند بخشی از فضای زندگی ما باشد و هر بار که نور
                از میان آن عبور می‌کند، حس تازه‌ای ایجاد کند.
              </p>

              <p>
                ما تلاش می‌کنیم هر اثر را با دقت و توجه به جزئیات
                طراحی کنیم؛ از انتخاب رنگ‌ها گرفته تا ترکیب فرم‌ها
                و نحوه قرار گرفتن نور در کنار شیشه.
              </p>

              <p>
                نتیجه، آثاری است که قرار نیست فقط یک فضای خالی را
                پر کنند؛ بلکه بخشی از شخصیت محیط را شکل می‌دهند.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] border-[10px] border-ink bg-glass" />

            <div className="absolute -bottom-6 -right-6 border-2 border-ink bg-paper px-6 py-5">
              <p className="text-sm text-graphite">نور • رنگ • هنر</p>
              <p className="mt-1 font-bold">ساخته شده برای ماندن</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y-2 border-ink bg-glass px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm tracking-[0.3em] text-graphite">
              WHAT WE BELIEVE
            </p>

            <h2 className="text-4xl font-bold md:text-5xl">
              چیزی که برای ما مهم است
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="border-2 border-ink bg-paper p-8">
              <span className="text-3xl">✦</span>
              <h3 className="mt-6 text-2xl font-bold">اصالت</h3>
              <p className="mt-4 leading-8 text-graphite">
                هر اثر باید شخصیت خودش را داشته باشد و چیزی
                فراتر از یک محصول تکراری باشد.
              </p>
            </div>

            <div className="border-2 border-ink bg-paper p-8">
              <span className="text-3xl">◌</span>
              <h3 className="mt-6 text-2xl font-bold">ظرافت</h3>
              <p className="mt-4 leading-8 text-graphite">
                جزئیات کوچک هستند که یک اثر معمولی را به چیزی
                تبدیل می‌کنند که بتوان با آن ارتباط برقرار کرد.
              </p>
            </div>

            <div className="border-2 border-ink bg-paper p-8">
              <span className="text-3xl">◇</span>
              <h3 className="mt-6 text-2xl font-bold">ماندگاری</h3>
              <p className="mt-4 leading-8 text-graphite">
                هدف ما ساخت آثاری است که فقط برای امروز نباشند
                و بتوانند سال‌ها بخشی از یک فضا باقی بمانند.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 max-w-2xl">
            <p className="mb-4 text-sm tracking-[0.3em] text-graphite">
              THE PROCESS
            </p>

            <h2 className="text-4xl font-bold md:text-5xl">از ایده تا اثر</h2>

            <p className="mt-6 leading-8 text-graphite">
              هر اثر مسیر خودش را طی می‌کند؛ از یک ایده اولیه تا
              لحظه‌ای که در فضای شما قرار می‌گیرد.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-ink p-8 text-paper">
              <span className="text-sm text-fog">01</span>
              <h3 className="mt-6 text-2xl font-bold">ایده</h3>
              <p className="mt-4 leading-8 text-fog">
                شکل، رنگ و حال‌وهوای اثر قبل از شروع ساخت
                مشخص می‌شود.
              </p>
            </div>

            <div className="border-2 border-ink bg-paper p-8">
              <span className="text-sm text-graphite">02</span>
              <h3 className="mt-6 text-2xl font-bold">خلق</h3>
              <p className="mt-4 leading-8 text-graphite">
                جزئیات اثر با دقت و تمرکز روی ترکیب رنگ،
                فرم و نور شکل می‌گیرد.
              </p>
            </div>

            <div className="border-2 border-ink bg-paper p-8">
              <span className="text-sm text-graphite">03</span>
              <h3 className="mt-6 text-2xl font-bold">زندگی</h3>
              <p className="mt-4 leading-8 text-graphite">
                اثر وارد فضای شما می‌شود و بخشی از داستان
                آن محیط را به وجود می‌آورد.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-32 pt-10">
        <div className="mx-auto max-w-4xl bg-ink px-8 py-16 text-center text-paper md:px-16">
          <p className="text-sm tracking-[0.3em] text-fog">FIND YOUR PIECE</p>

          <h2 className="mt-5 text-4xl font-bold md:text-5xl">
            آماده‌ای اثر خودت را پیدا کنی؟
          </h2>

          <p className="mx-auto mt-6 max-w-xl leading-8 text-fog">
            مجموعه آثار لومینا را ببین و اثری را پیدا کن که
            با فضای تو ارتباط برقرار می‌کند.
          </p>

          <a href="/" className="btn btn-on-dark mt-8 px-8 py-4">
            مشاهده محصولات
          </a>
        </div>
      </section>
    </main>
  );
}
