import { Link } from "react-router";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-blue-gray-100 flex flex-col items-center justify-center gap-3 border-t py-7 md:flex-row md:justify-between">
        <span className="text-sm text-gray-600">
          &copy; {currentYear} Jadwiga Osial
        </span>

        <div className="flex gap-6">
          <span className="text-sm text-gray-600">
            <Link
              to="mailto:jadwigaosialart@gmail.com"
              className="hover:text-accent"
            >
              jadwigaosialart@gmail.com
            </Link>
          </span>
          <Link
            to="https://www.facebook.com/jadwiga.osial"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-80 transition-transform hover:scale-110 hover:opacity-100"
          >
            <AiFillFacebook size={25} color="#5a5a5a" />
          </Link>
          <Link
            to="https://www.instagram.com/jadwigaosial"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-80 transition-transform hover:scale-110 hover:opacity-100"
          >
            <AiFillInstagram size={25} color="#5a5a5a" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
