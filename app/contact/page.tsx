import type { Metadata } from "next";
import { siteConfig } from "@/lib/metadata";
import { CONTACT_INFO } from "@/lib/constant";
import { SectionHeader } from "@/components/shared/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} for freelance opportunities, collaboration, or just to connect.`,
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description: `Reach out to ${siteConfig.name}.`,
    url: `${siteConfig.url}/contact`,
  },
  alternates: { canonical: `${siteConfig.url}/contact` },
};

export default function ContactPage() {
  return (
    <section className="w-full flex flex-col space-y-5 md:space-y-0 md:flex-row p-7">
      <aside className="w-full flex flex-col space-y-5 md:w-[45%]">
        <SectionHeader title="contact" />

        <div className="space-y-3">
          <h1 className="text-primary text-base font-semibold">
            Let&apos;s Build Something Together
          </h1>

          <p className="text-secondary text-sm leading-6 font-light flex flex-col space-y-6">
            Whether you have a project in mind, a freelance opportunity, or
            simply want to connect, I&apos;d love to hear from you. Feel free to
            reach out, and I&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </aside>

      <aside className="w-full flex items-center justify-center space-y-3 md:w-[55%]">
        <div className="w-full space-y-3 border-secondary border p-5 md:w-fit">
          <h1 className="text-white text-base font-semibold">
            Message me here
          </h1>

          <div className="flex flex-col space-y-3">
            {CONTACT_INFO.map((info) => (
              <a
                key={info.link}
                href={info.link}
                target="_blank"
                className="flex space-x-3 hover:text-accent transition-colors duration-300"
              >
                {info.icon && (
                  <info.icon className="size-5 stroke-3 text-white" />
                )}
                <span className="text-sm text-secondary">{info.text}</span>
              </a>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}