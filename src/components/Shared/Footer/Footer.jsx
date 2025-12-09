import { TiSocialDribbble, TiSocialFacebook } from 'react-icons/ti';
import { BsTwitterX } from "react-icons/bs";
import { Link } from 'react-router';
// import logo5 from '../assets/logo5.jpg'
import { FaInstagram } from 'react-icons/fa';
const Footer = () => {
    return (
        <div>
            <footer className=" bg-cyan-900 py-3">
                <div className='flex flex-col md:flex-row gap-2 justify-between  px-7'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col md:flex-row gap-2 items-center'>
                            {/* <img src={logo5} alt="" className=' md:w-10 md:h-10 h-7 w-7 rounded-[50%]' /> */}
                            <Link to='/' className="md:text-xl satisfy font-bold text-white">Travel<span className='text-amber-400'>Ease</span> </Link>
                        </div>
                        <p className='text-slate-200'>
                            Travel smarter. Travel easier. Travel with Travelease. <br />
                            Adventure awaits — let us guide the way.
                        </p>
                    </div>
                    <div className='text-white flex gap-2'>
                        <div className='flex footer flex-col lg:flex-row items-center gap-2 text-xs md:text-sm '>
                            <a className="link link-hover">Contact info</a>
                            <a className="link link-hover">Privacy policy</a>
                            <a className="link link-hover">Cookie policy</a>
                            <a className="link link-hover">Terms of use</a>
                        </div>
                    </div>
                    <div className='flex text-white items-center gap-2'>
                        <p className=' text-xs md:text-sm font-semibold'>Follow us on  ----</p>
                        <TiSocialFacebook className='i' />
                        <BsTwitterX className='i' />
                        <FaInstagram className='i ' />
                        <TiSocialDribbble className='i' />
                    </div>
                </div>
                <p className='text-slate-300 text-center text-xs md:text-sm pl-6 pt-3 pb-1'>Copyright © {new Date().getFullYear()} - All right reserved by TravelEase studio</p>
            </footer>
        </div>
    );
};

export default Footer;