import { useEffect, useState } from "react";
import { TiSocialFacebook, TiSocialDribbble } from "react-icons/ti";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";
import Logo from "../Logo";
import { Link } from "react-router";

const Footer = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <footer className="bg-linear-to-t from-black via-[#0f0a1f] to-[#140f2d] text-gray-300 relative">
        <div className="px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Brand */}
          <div>
            <Logo size="text-xl" />
            <p className="mt-3 text-sm text-gray-400 leading-relaxed max-w-sm">
              Discover, join, and manage local clubs effortlessly. ClubSphere
              connects communities through shared passions.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center justify-center gap-2 text-sm">
            <span className="font-semibold text-white">Explore</span>
            <div className="flex flex-wrap gap-x-4 gap-y-1 font-medium">
              <Link to="/privacy-policy" className="hover:text-purple-400">
                Privacy Policy
              </Link>
              <Link to="/terms-of-use" className="hover:text-purple-400">
                Terms of Use
              </Link>
              <Link to="/contact" className="hover:text-purple-400">
                Contact
              </Link>
              <Link to="/help" className="hover:text-purple-400">
                Support
              </Link>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col justify-center items-center">
            <span className="font-semibold text-white block mb-2">
              Follow us
            </span>
            <div className="flex gap-3 text-xl items-center">
              <TiSocialFacebook className="hover:text-purple-400 cursor-pointer transition" />
              <BsTwitterX className="hover:text-purple-400 cursor-pointer h-4 w-4 transition" />
              <FaInstagram className="hover:text-purple-400 cursor-pointer transition" />
              <TiSocialDribbble className="hover:text-purple-400 cursor-pointer transition" />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-3 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} ClubSphere — All rights reserved.
        </div>
      </footer>

      {/* Back to Top Button */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full 
                     bg-purple-500/90 hover:bg-purple-600 
                     text-white shadow-lg transition"
          aria-label="Back to top"
        >
          <FaArrowUp className="text-sm" />
        </button>
      )}
    </>
  );
};

export default Footer;
