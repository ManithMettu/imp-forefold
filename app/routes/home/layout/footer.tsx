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
    <footer className="bg-white pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-800 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-800 mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone size={16} className="text-blue-500 mr-2" />
                <span className="text-gray-600">+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="text-blue-500 mr-2" />
                <span className="text-gray-600">contact@payments360.com</span>
              </li>
              <li className="flex items-center">
                <span className="text-gray-600">Mon - Fri: 9am - 5pm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-600 mr-3 flex items-center justify-center rounded-lg">
              <Building size={16} className="text-white" />
            </div>
            <span className="font-bold">Payments360°</span>
          </div>

          <div className="flex space-x-5 mb-4 md:mb-0">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
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
