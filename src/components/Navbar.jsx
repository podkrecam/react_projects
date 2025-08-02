import { useEffect, useState } from "react";
import { Link } from "react-router";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const navItems = [
  { id: 1, text: "Strona główna", to: "/" },
  { id: 2, text: "O mnie", to: "/about" },
  { id: 3, text: "Galeria", to: "/gallery" },
  { id: 4, text: "Kontakt", to: "/contact" },
];

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`z-100 flex min-h-full flex-col items-end justify-between`}>
      {/* Desktop Navigation */}
      <ul
        className={`fixed top-4 right-0 left-0 mx-auto hidden max-w-screen-2xl justify-between px-10 font-medium tracking-wide uppercase md:flex ${
          isScrolled
            ? "bg-accent/80 text-primary py-5 shadow-md"
            : "text-accent py-5"
        } transition-all duration-300`}
      >
        <div className="flex gap-6">
          {navItems.slice(0, 2).map((item) => (
            <li key={item.id} className="group relative cursor-pointer">
              <Link to={item.to} className="hover:text-muted duration-500">
                {item.text}
              </Link>
              <span className="bg-accent absolute bottom-[-2px] left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"></span>
            </li>
          ))}
        </div>

        <div className="flex gap-6">
          {navItems.slice(2).map((item) => (
            <li key={item.id} className="group relative cursor-pointer">
              <Link to={item.to} className="hover:text-muted duration-500">
                {item.text}
              </Link>
              <span className="bg-accent absolute bottom-[-2px] left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"></span>
            </li>
          ))}
        </div>
      </ul>

      {/* Mobile Navigation Icon */}
      <div
        onClick={handleNav}
        className={`fixed z-20 cursor-pointer p-4 transition-all duration-300 ease-in-out md:hidden ${nav ? "scale-110 rotate-90" : "rotate-0"}`}
      >
        {nav ? (
          <AiOutlineClose size={30} color="#fffaf5" />
        ) : (
          <AiOutlineMenu size={30} />
        )}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={`bg-accent text-primary fixed top-0 right-0 flex h-full w-full flex-col items-center justify-center transition-all duration-700 ease-in-out md:hidden ${nav ? "z-10 translate-x-0 opacity-100" : "z-[-1] translate-x-full opacity-0"}`}
      >
        {navItems.map((item) => (
          <li
            key={item.id}
            className="hover:text-muted cursor-pointer rounded-xl p-4 text-end text-2xl duration-300"
          >
            <Link to={item.to} onClick={handleNav}>
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
