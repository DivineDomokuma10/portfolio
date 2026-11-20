import { SectionHeader } from "../shared/utils";
import { CONTACT_ICONS, type ContactIconName } from "@/lib/icons";
import type { IContactLink } from "@/interfaces";

interface ContactSectionProps {
  contact: IContactLink[];
}

const Contact = ({ contact }: ContactSectionProps) => {
  const primaryContact =
    contact.find(({ icon }) => icon === "whatsapp") ??
    contact.find(({ icon }) => icon === "mail");
  const PrimaryIcon = primaryContact
    ? CONTACT_ICONS[primaryContact.icon as ContactIconName]
    : undefined;
  const secondaryContacts = contact
    .filter((info) => info !== primaryContact)
    .sort((a, b) => Number(b.icon === "mail") - Number(a.icon === "mail"));

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
        <div className="w-full space-y-4 border-secondary border p-5 md:max-w-md">
          <h2 className="text-white text-base font-semibold">
            Message me here
          </h2>

          <div className="flex flex-col gap-4">
            {!primaryContact ? (
              <p className="text-sm text-secondary">Contact info coming soon.</p>
            ) : (
              <>
                <a
                  href={primaryContact.link}
                  target={primaryContact.link.startsWith("http") ? "_blank" : undefined}
                  rel={primaryContact.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={
                    primaryContact.icon === "whatsapp"
                      ? "Start a chat on WhatsApp"
                      : `Email ${primaryContact.text}`
                  }
                  className="flex items-center gap-3 border border-primary bg-primary px-4 py-3 text-background transition-colors duration-300 hover:bg-transparent hover:text-white"
                >
                  {PrimaryIcon && <PrimaryIcon className="size-5 shrink-0 stroke-3" />}
                  <span className="text-sm font-semibold">
                    {primaryContact.icon === "whatsapp"
                      ? "Chat on WhatsApp"
                      : primaryContact.text}
                  </span>
                </a>

                {secondaryContacts.length > 0 && (
                  <div className="space-y-3 border-t border-secondary pt-4">
                    <p className="text-xs text-secondary">
                      Email and other contact options
                    </p>
                    {secondaryContacts.map((info, i) => {
                      const Icon = CONTACT_ICONS[info.icon as ContactIconName];

                      return (
                        <a
                          key={`${info.icon}-${info.text}-${i}`}
                          href={info.link}
                          target={info.link.startsWith("http") ? "_blank" : undefined}
                          rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="flex gap-3 transition-colors duration-300 hover:text-accent"
                        >
                          {Icon && <Icon className="size-5 shrink-0 stroke-3 text-white" />}
                          <span className="text-sm text-secondary">{info.text}</span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </aside>
    </section>
  );
};

export default Contact;
