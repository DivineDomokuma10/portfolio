import Image from "next/image";
import { SectionHeader } from "../shared/utils";

const AboutSection = () => {
  return (
    <section className="w-full flex flex-col space-y-10 justify-center p-5 md:items-center md:justify-between md:flex-row-reverse">
      <section className="w-full flex flex-col space-y-7 md:w-[45%]">
        <SectionHeader title="about-me" />

        <p className="text-secondary text-sm leading-6 font-light flex flex-col space-y-6">
          <span>Hello, I&apos;m Divine Domokuma</span>

          <span>
            I&apos;m a self-taught front-end developer based in Nigeria. I can
            develop responsive websites from scratch and raise them into modern
            user-friendly web experience
          </span>

          <span>
            Transforming my creativity and knowledge into a websites has been my
            passion for over a year. I have been helping various clients to
            establish their presence online. I always strive to learn about the
            newest technologies and frameworks.
          </span>
        </p>
      </section>

      <section className="w-full h-fit flex items-center justify-center md:w-[45%]">
        <AboutIllustrator />
      </section>
    </section>
  );
};

const AboutIllustrator = () => {
  return (
    <>
      <div className="w-fit h-fit relative md:hidden">
        <Image
          alt="grid dot"
          src={"/Dots.svg"}
          width={64}
          height={64}
          className="absolute top-1/4 -left-3 z-10"
        />

        <Image
          alt="guy"
          src={"/guy-image2.svg"}
          width={250}
          height={307}
          className="-z-10"
        />

        <Image
          alt="grid dot"
          src={"/Dots-rectangle.svg"}
          width={104}
          height={56}
          className="absolute z-20 right-0 bottom-10"
        />
      </div>
      <div className="hidden w-fit h-fit relative md:block">
        <Image
          alt="grid dot"
          src={"/Dots.svg"}
          width={84}
          height={84}
          className="absolute top-1/4 -left-3 z-10"
        />

        <Image
          alt="guy"
          src={"/guy-image2.svg"}
          width={300}
          height={400}
          className="-z-10"
        />

        <Image
          alt="grid dot"
          src={"/Dots-rectangle.svg"}
          width={104}
          height={56}
          className="absolute z-20 right-0 bottom-10"
        />
      </div>
    </>
  );
};
export default AboutSection;
