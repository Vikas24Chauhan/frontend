import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-blue-600">
          MedGuide
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8 font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <div className="group relative cursor-pointer">
            <div className="flex items-center gap-1 hover:text-blue-600">
              Counsellings
              <ChevronDown size={18} />
            </div>

            {/* Dropdown */}
            <div className="invisible absolute left-0 top-12 w-56 rounded-xl bg-white p-3 opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:opacity-100">
              <Link
                to="/neet-pg"
                className="block rounded-lg px-4 py-3 hover:bg-blue-50 hover:text-blue-600"
              >
                NEET PG
              </Link>

              <Link
                to="/neet-ug"
                className="block rounded-lg px-4 py-3 hover:bg-blue-50 hover:text-blue-600"
              >
                NEET UG
              </Link>

              <Link
                to="/inicet"
                className="block rounded-lg px-4 py-3 hover:bg-blue-50 hover:text-blue-600"
              >
                INICET
              </Link>

              <Link
                to="/neet-ss"
                className="block rounded-lg px-4 py-3 hover:bg-blue-50 hover:text-blue-600"
              >
                NEET SS
              </Link>
            </div>
          </div>

          <Link to="/blog" className="hover:text-blue-600">
            Blog
          </Link>

          <Link to="/news" className="hover:text-blue-600">
            News
          </Link>

          <Link to="/careers" className="hover:text-blue-600">
            Careers
          </Link>

          <Link to="/contact" className="hover:text-blue-600">
            Contact
          </Link>
        </nav>

        {/* Login Button */}
        <Link
          to="/login"
          className="rounded-full bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Log-In | Sign-Up
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
