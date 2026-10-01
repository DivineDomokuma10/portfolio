import { SectionHeader } from "../shared/utils";
import { CONTACT_ICONS, type ContactIconName } from "@/lib/icons";
import type { IContactLink } from "@/interfaces";

interface ContactSectionProps {
  contact: IContactLink[];
}

const Contact = ({ contact }: ContactSectionProps) => {
  return (
    <section
      id="contact"
      className="w-full flex flex-col space-y-5 md:space-y-0 md:flex-row p-7"
    >
      <aside className="w-full flex flex-col space-y-5 md:w-[45%]">
        <SectionHeader title="contact" />

        <div className="space-y-3">
          <h2 className="text-primary text-base font-semibold">
            Let&apos;s Build Something Together
          </h2>

          <p className="text-secondary text-sm leading-6 font-light flex flex-col space-y-6">
            Whether you have a project in mind, an freelance opportunity, or
            simply want to connect, I&apos;d love to hear from you. Feel free to
            reach out, and I&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </aside>

      <aside className="w-full flex items-center justify-center space-y-3 md:w-[55%]">
        <div className="w-full space-y-3 border-secondary border p-5 md:w-fit">
          <h2 className="text-white text-base font-semibold">
            Message me here
          </h2>

          <div className="flex flex-col space-y-3">
            {contact.length === 0 ? (
              <p className="text-sm text-secondary">Contact info coming soon.</p>
            ) : (
              contact.map((info, i) => {
                const Icon = CONTACT_ICONS[info.icon as ContactIconName];

                return (
                  <a
                    key={`${info.icon}-${info.text}-${i}`}
                    href={info.link}
                    target={info.link.startsWith("http") ? "_blank" : undefined}
                    rel={info.link.startsWith("http") ? "noreferrer" : undefined}
                  className="flex space-x-3 hover:text-accent transition-colors duration-300"
                >
                  {Icon && <Icon className="size-5 stroke-3 text-white" />}
                  <span className="text-sm text-secondary">{info.text}</span>
                </a>
                );
              })
            )}
          </div>
        </div>
      </aside>
    </section>
  );
};

export default Contact;
