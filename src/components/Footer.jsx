import { Link } from "react-router";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-primary relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-blue-gray-100 flex flex-col items-center justify-center gap-4 border-t py-7 md:flex-row md:justify-between">
        <span className="text-sm text-gray-600">
          &copy; {currentYear} Jadwiga Osial
        </span>

        <div className="flex items-center gap-6">
          <a
            href="mailto:jadwigaosialart@gmail.com"
            className="hover:text-accent text-sm text-gray-600"
          >
            jadwigaosialart@gmail.com
          </a>

          <Link
            to="https://www.facebook.com/jadwiga.osial"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-80 transition-transform hover:scale-110 hover:opacity-100"
            aria-label="Facebook"
          >
            <AiFillFacebook size={25} color="#4a6b5f" />
          </Link>

          <Link
            to="https://www.instagram.com/jadwigaosial"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-80 transition-transform hover:scale-110 hover:opacity-100"
            aria-label="Instagram"
          >
            <AiFillInstagram size={25} color="#4a6b5f" />
          </Link>
        </div>

        <p className="max-w-xs text-center text-xs text-gray-500 md:text-right">
          Strona chroniona przez reCAPTCHA i podlega Polityce prywatności
          Google:&nbsp;
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent underline"
          >
            Polityka Prywatności Google
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
