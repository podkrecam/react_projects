import { Link } from "react-router";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative mx-auto w-full max-w-7xl">
      <div className="border-blue-gray-50 flex w-full flex-col-reverse items-center justify-center gap-3 py-7 md:flex-row md:justify-between">
        <span>
          &copy; {currentYear}
          {" Jadwiga Osial"}
        </span>
        <div className="text-blue-gray-900 flex gap-4 sm:py-2 md:justify-center">
          <Link
            to="https://www.facebook.com/jadwiga.osial"
            className="opacity-80 transition-opacity hover:opacity-100"
          >
            <AiFillFacebook size={25} className="" color="#5a5a5a" />
          </Link>
          <Link
            to="https://www.instagram.com/jadwigaosial"
            className="opacity-80 transition-opacity hover:opacity-100"
          >
            <AiFillInstagram size={25} className="" color="#5a5a5a" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
