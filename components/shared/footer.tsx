import { getSettings } from "@/lib/data/settings";
import { CONTACT_ICONS, type ContactIconName } from "@/lib/icons";
import { Logo } from "./utils";

const Footer = async () => {
  const { contact } = await getSettings();

  return (
    <footer className="mt-16 w-full flex flex-col items-center justify-center bg-background px-7 py-10 border-t border-t-secondary" role="contentinfo">
      <main className="w-full flex flex-col space-y-10 md:w-5/6">
        <section className="w-full flex flex-col space-y-7 md:space-y-0 md:flex-row justify-between">
          <div className="flex flex-col space-y-5 md:w-1/3">
            <Logo />

            <p className="text-secondary text-sm">
              A portfolio website showcasing my skills, projects, and contact
              information.
            </p>
          </div>

          <div className="w-full flex flex-col justify-center items-center md:justify-start md:items-start space-y-3 md:w-1/5">
            <h3 className="text-white text-base font-bold hidden md:block">
              Media
            </h3>

            <div className="flex space-x-7 items-center">
              {contact.map((info) => {
                const Icon = CONTACT_ICONS[info.icon as ContactIconName];

                return (
                  <a
                    key={info.link}
                    href={info.link}
                    target="_blank"
                    className="flex space-x-5 transition-colors duration-300"
                    aria-label={info.text}
                  >
                    {Icon && (
                      <Icon className="size-5 stroke-3 text-secondary hover:text-primary" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <p className="text-xs text-secondary text-center">
          © 2026 Divine Domokuma. Built with Next.js, TypeScript, Tailwind CSS.
        </p>
      </main>
    </footer>
  );
};

export default Footer;
