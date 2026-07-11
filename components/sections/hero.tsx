import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="flex w-full flex-col justify-center gap-10 p-5 md:min-h-[60dvh] md:flex-row md:items-center md:justify-between">
      <div className="w-full space-y-3 md:w-[45%]">
        <h1 className="text-primary text-3xl font-bold leading-tight md:text-5xl">
          Building scalable web applications.
        </h1>

        <p className="text-secondary">
          Frontend Developer who prioritizes performance, maintainability, and
          user experience.
        </p>
      </div>

      <div className="flex w-full justify-center md:w-[45%]">
        <HeroIllustration />
      </div>
    </section>
  );
};

const HeroIllustration = () => {
  return (
    <div className="relative h-fit w-fit">
      <Image
        src="/logo-outline2.png"
        alt="Logo outline"
        width={155}
        height={155}
        className="absolute top-1/4 left-0 -z-10 h-26 w-26 md:h-38.75 md:w-38.75"
      />

      <Image
        src="/guy-image.svg"
        alt="Developer illustration"
        width={457}
        height={386}
        className="h-65 w-76.75 md:h-96.5 md:w-114.25"
        priority
      />

      <Image
        src="/Dots.svg"
        alt=""
        aria-hidden
        width={84}
        height={84}
        className="absolute right-0 bottom-10 h-16 w-16 md:h-20 md:w-20"
      />
    </div>
  );
};

export default HeroSection;
