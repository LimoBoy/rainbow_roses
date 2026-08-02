import Image from "next/image";

export default function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden">
      <picture>
        {/* Mobile */}
        <source
          media="(max-width: 743px)"
          srcSet="/images/hero/max-width-743px.webp"
          type="image/webp"
        />
        <source
          media="(max-width: 743px)"
          srcSet="/images/hero/max-width-743px-jpeg.jpeg"
          type="image/jpeg"
        />

        {/* Tablet */}
        <source
          media="(max-width: 1132px)"
          srcSet="/images/hero/max-width-1132px.webp"
          type="image/webp"
        />
        <source
          media="(max-width: 1132px)"
          srcSet="/images/hero/max-width-1132px-jpeg.jpeg"
          type="image/jpeg"
        />

        {/* Desktop */}
        <source
          media="(max-width: 1528px)"
          srcSet="/images/hero/max-width-1528px.webp"
          type="image/webp"
        />
        <source
          media="(max-width: 1528px)"
          srcSet="/images/hero/max-width-1528px-jpeg.jpeg"
          type="image/jpeg"
        />

        {/* High resolution */}
        <source
          media="(min-width: 1529px)"
          srcSet="/images/hero/min-width-1529px.webp"
          type="image/webp"
        />
        <source
          media="(min-width: 1529px)"
          srcSet="/images/hero/min-width-1529px-jpeg.jpeg"
          type="image/jpeg"
        />

        <img
          src="/images/hero/fallback.jpeg"
          alt="Gold necklaces with diamond pendants"
          className="
            w-full
            h-[600px]
            md:h-[650px]
            lg:h-[520px]
            object-cover
          "
        />
      </picture>

      {/* Content overlay */}
      <div
        className="
          absolute inset-0
          flex
          justify-end
          items-center
          px-6
          md:px-12
          lg:px-20
          xl:px-28
        "
      >
        <div
          className="
            w-full
            max-w-md
            text-right
            text-white
          "
        >
          <p
            className="
              text-sm
              md:text-base
              font-semibold
              tracking-wide
              mb-6
              md:mb-8
            "
          >
            SAVE UP TO 30% OFF*
          </p>

          <h1
            className="
              text-3xl
              md:text-5xl
              lg:text-6xl
              font-light
              uppercase
              leading-tight
              mb-8
              md:mb-10
            "
          >
            Celebrate 250 Years With
            <br />
            Exclusive Savings
          </h1>

          <div
            className="
              flex
              flex-col
              sm:flex-row
              gap-3
              md:gap-4
              w-full
            "
          >
            <button
              className="
                flex-1
                bg-white
                text-black
                px-8
                py-4
                uppercase
                text-sm
                tracking-wide
                whitespace-nowrap
              "
            >
              Shop Engagement
            </button>

            <button
              className="
                flex-1
                bg-white
                text-black
                px-8
                py-4
                uppercase
                text-sm
                tracking-wide
                whitespace-nowrap
              "
            >
              Shop The Sale
            </button>
          </div>
        </div>
      </div>
    </section>
    );
}