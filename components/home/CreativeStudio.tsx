import Link from "next/link";
import Image from "next/image";

export default function CreativeStudioSection() {
    const imageSrc = "/images/home/a collection of diamond rings stacked on display stand.jpeg";
    const imageAlt = "A collection of diamond engagement rings displayed on a stand";
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={1920}
        height={960}
        className="h-[420px] w-full object-cover md:h-[600px]"
        priority
      />

      {/* Text overlay, positioned over the dark left portion of the image */}
      <div className="absolute inset-y-0 left-0 flex w-1/2 items-center justify-center px-6 sm:px-12">
        <div className="max-w-md text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-white">
            CREATIVE STUDIO
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-wide text-white sm:text-4xl">
            TAILOR-MADE BY YOU
          </h2>

          <p className="mt-6 text-sm leading-relaxed text-slate-200 sm:text-base">
            Our Creative Studio allows you to design your engagement ring
            exactly the way you want it—with control over every detail. Use
            our unique tools to create something exceptional, online or in
            showrooms.
          </p>

          <Link
            href="#"
            className="mt-8 inline-block border border-white px-8 py-4 text-xs font-semibold tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-[#0b1638]"
          >
            DESIGN YOUR RING
          </Link>
        </div>
      </div>
    </section>
  );
}
