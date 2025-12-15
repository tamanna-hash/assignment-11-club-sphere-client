import { TiSocialFacebook, TiSocialDribbble } from "react-icons/ti";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import Logo from "../Logo";


const Footer = () => {
  return (
    <footer className="bg-linear-to-t from-black via-[#0f0a1f] to-[#140f2d] text-gray-300">
      <div className="px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Brand */}
        <div>
          <Logo size="text-xl" />
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Discover, join, and manage local clubs effortlessly.
            ClubSphere connects communities through shared passions.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2 text-sm">
          <span className="font-semibold text-white">Explore</span>
          <a className="hover:text-purple-400">Privacy Policy</a>
          <a className="hover:text-purple-400">Terms of Use</a>
          <a className="hover:text-purple-400">Contact</a>
        </div>

        {/* Social */}
        <div>
          <span className="font-semibold text-white block mb-2">
            Follow us
          </span>
          <div className="flex gap-3 text-2xl">
            <TiSocialFacebook className="hover:text-purple-400 cursor-pointer" />
            <BsTwitterX className="hover:text-purple-400 cursor-pointer" />
            <FaInstagram className="hover:text-purple-400 cursor-pointer" />
            <TiSocialDribbble className="hover:text-purple-400 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-3 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} ClubSphere — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
