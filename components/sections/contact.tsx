import { SectionHeader } from "../shared/utils";

const Contact = () => {
  return (
    <section className="w-full flex flex-col space-y-7 justify-center p-5">
      <section className="w-full flex flex-col space-y-5 md:w-[45%]">
        <SectionHeader title="contact" />

        <p className="text-secondary text-sm leading-6 font-light flex flex-col space-y-6">
          I&apos;m interested in freelance opportunities. However, if you have
          other request or question, don&apos;t hesitate to contact me.
        </p>
      </section>
    </section>
  );
};

export default Contact;
