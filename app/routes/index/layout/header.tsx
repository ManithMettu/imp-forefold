import * as Dialog from "@radix-ui/react-dialog";
import { Building, ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import ScrollSpy from "react-scrollspy-navigation";
import { cn } from "~/lib/utils";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const links = [
    { title: "Home", href: "#hero" },
    { title: "Solutions", href: "#solutions" },
    { title: "Pricing", href: "#pricing" },
  ];
  const buttons = [
    {
      title: "Login",
      href: "/login",
      className: "border border-gray-200 hover:bg-gray-100",
    },
    {
      title: "Request Demo",
      href: "#",
      className: "bg-blue-50 text-blue-600 hover:bg-blue-100",
    },
    {
      title: "Sign Up",
      href: "/signup",
      className: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white",
    },
  ];

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="fixed top-0 z-30 flex w-full items-center justify-between bg-white/90 px-6 py-4 shadow-sm backdrop-blur-md md:px-10">
      <div className="flex items-center text-2xl font-bold">
        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
          <Building size={20} className="text-white" />
        </div>
        <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
          Payments360°
        </span>
      </div>

      <ScrollSpy onChangeActiveId={(currentId) => setActiveSection(currentId)}>
        <nav className="hidden items-center justify-center space-x-1 md:flex">
          {links.map(({ title, href }, index) => (
            <a
              href={href}
              key={index}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300",
                `#${activeSection}` === href
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100",
              )}
            >
              {title}
            </a>
          ))}
        </nav>
      </ScrollSpy>

      <div className="hidden items-center space-x-3 md:flex">
        {buttons.map(({ title, href, className }, index) => (
          <Link
            to={href}
            key={index}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300",
              className,
            )}
          >
            {title}
          </Link>
        ))}
      </div>

      <Dialog.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <Dialog.Trigger asChild>
          <button className="focus:ring-ring flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden md:hidden">
            <Menu size={24} className="text-gray-600" />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden" />
          <Dialog.Content
            aria-describedby={undefined}
            className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white shadow-2xl transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 md:hidden"
          >
            <div className="flex h-full flex-col p-6">
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center text-xl font-bold">
                  <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                    <Building size={16} className="text-white" />
                  </div>
                  <Dialog.Title asChild>
                    <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                      Payments360°
                    </span>
                  </Dialog.Title>
                </div>
                <Dialog.Close asChild>
                  <button
                    className="focus:ring-ring flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden"
                    aria-label="Close menu"
                  >
                    <X size={24} className="text-gray-600" />
                  </button>
                </Dialog.Close>
              </div>

              <nav className="mb-8 flex flex-col space-y-1">
                {links.map(({ title, href }, index) => (
                  <a
                    href={href}
                    key={index}
                    onClick={toggleMenu}
                    className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-gray-800 transition-all duration-300 hover:bg-gray-100"
                  >
                    {title}
                    <ChevronRight size={18} className="text-gray-400" />
                  </a>
                ))}
              </nav>

              <div className="mt-auto flex flex-col space-y-3">
                {buttons.map(({ title, href, className }, index) => (
                  <Link
                    to={href}
                    key={index}
                    className={cn(
                      "w-full rounded-lg px-4 py-3 text-center text-base font-medium transition-all duration-300",
                      className,
                    )}
                  >
                    {title}
                  </Link>
                ))}
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}
