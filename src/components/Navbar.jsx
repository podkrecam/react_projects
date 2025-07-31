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
    const handleScroll = () => setIsScrolled(window.scrollY > 10);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`flex min-h-full flex-col items-end justify-between`}>
      {/* Desktop Navigation */}
      <ul
        className={`fixed hidden w-full md:flex ${isScrolled ? "bg-accent" : ""}`}
      >
        {navItems.map((item) => (
          <li
            key={item.id}
            className="hover:text-accent m-2 cursor-pointer rounded-xl p-2 duration-500"
          >
            <Link to={item.to}>{item.text}</Link>
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div
        onClick={handleNav}
        className={`fixed z-10 cursor-pointer p-4 transition-all duration-300 ease-in-out md:hidden ${nav ? "scale-110 rotate-90" : "rotate-0"}`}
      >
        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={`bg-accent fixed top-0 right-0 flex h-full w-full flex-col items-center justify-center transition-all duration-700 ease-in-out md:hidden ${
          nav ? "z-5 opacity-100" : "-z-10 opacity-0"
        }`}
      >
        {/* Mobile Navigation Items */}
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
