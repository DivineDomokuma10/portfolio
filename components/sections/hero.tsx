import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="w-full min-h-[110dvh] flex flex-col space-y-10 justify-center p-5 md:min-h-[80dvh] md:items-center md:justify-between md:flex-row">
      <section className="w-full flex flex-col space-y-3 md:w-[45%]">
        <h1 className="text-3xl text-white font-bold leading-12">
          Hi, <span className="text-primary">Divine Domokuma here</span>. I am a{" "}
          <span className="text-primary">Frontend Developer</span>.
        </h1>

        <p className="text-secondary">
          I craft responsive, reactive and scalable web applications, where
          technology meets creativity.
        </p>
      </section>

      <section className="w-full h-fit flex items-center justify-center md:w-[45%]">
        <HeroIllustrator />
      </section>
    </section>
  );
};

const HeroIllustrator = () => {
  return (
    <>
      {" "}
      <div className="w-fit h-fit relative md:hidden">
        <Image
          alt="logo outline"
          src={"/logo-outline2.png"}
          width={104}
          height={104}
          className="absolute top-1/4 left-0 -z-10"
        />

        <Image
          alt="guy"
          src={"/guy-image.svg"}
          width={307}
          height={260}
          className="z-10"
        />

        <Image
          alt="guy"
          src={"/Dots.svg"}
          width={84}
          height={84}
          className="absolute z-20 right-0 bottom-10"
        />
      </div>
      <div className="hidden w-fit h-fit relative md:block">
        <Image
          alt="logo outline"
          src={"/logo-outline2.png"}
          width={155}
          height={155}
          className="absolute top-1/4 left-0 -z-10"
        />

        <Image
          alt="guy"
          src={"/guy-image.svg"}
          width={457}
          height={386}
          className="z-10"
        />

        <Image
          alt="guy"
          src={"/Dots.svg"}
          width={84}
          height={84}
          className="absolute z-20 right-0 bottom-10"
        />
      </div>
    </>
  );
};

export default HeroSection;
