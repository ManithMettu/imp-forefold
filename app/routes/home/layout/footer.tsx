import { Building, Github, Linkedin, Mail, Phone, Twitter } from "lucide-react";

export default function Footer() {
  const sections = [
    {
      title: "Company",
      links: [
        { text: "About", href: "#" },
        { text: "Careers", href: "#" },
        { text: "Press", href: "#" },
        { text: "Partners", href: "#" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { text: "Inventory Management", href: "#" },
        { text: "Worker Management", href: "#" },
        { text: "Client Management", href: "#" },
        { text: "Vendor Management", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Documentation", href: "#" },
        { text: "Case Studies", href: "#" },
        { text: "Blog", href: "#" },
        { text: "Support", href: "#" },
      ],
    },
  ];

  const socials = [
    {
      icon: Twitter,
      href: "#",
    },
    {
      icon: Linkedin,
      href: "#",
    },
    {
      icon: Github,
      href: "#",
    },
  ];

  return (
    <footer className="border-t border-gray-200 bg-white pt-16 pb-8">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-800 uppercase">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-600 transition-colors duration-300 hover:text-blue-600"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-800 uppercase">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-blue-500" />
                <span className="text-gray-600">+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-blue-500" />
                <span className="text-gray-600">contact@payments360.com</span>
              </li>
              <li className="flex items-center">
                <span className="text-gray-600">Mon - Fri: 9am - 5pm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-gray-200 pt-8 md:flex-row">
          <div className="mb-4 flex items-center md:mb-0">
            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
              <Building size={16} className="text-white" />
            </div>
            <span className="font-bold">Payments360°</span>
          </div>

          <div className="mb-4 flex space-x-5 md:mb-0">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-gray-600 transition-colors duration-300 hover:text-blue-600"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            &copy; 2024 Payments360° Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
