import React from 'react';
import profilePic from '../assets/profile.jpeg'; // Make sure you have this image
import { MdOutlineMail, MdOutlinePhone } from "react-icons/md";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";


const Header = () => {
  const socialLinks = [
    { href: 'mailto:mohitvishwakarma7891@gmail.com', icon: <MdOutlineMail /> },
    { href: 'tel:+919826403071', icon: <MdOutlinePhone /> },
    { href: 'https://github.com/mohitv7891', icon: <FaGithub /> }, // Replace with your Github link
    { href: 'https://www.linkedin.com/in/mohitvishwkarma/', icon: <FaLinkedin /> }, // Replace with your Linkedin link
    { href: 'https://x.com/mohitv7891', icon: <FaTwitter /> }, // Replace with your Twitter/X link
  ];

  return (
    <section className="py-10 md:py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-start justify-between">
        {/* Left Side */}
        <div className="md:w-3/5">
          <h1 className="text-5xl font-bold">Mohit Vishwakarma</h1>
          <div className="flex items-center gap-4 my-4">
            <span className="bg-teal-400/10 text-teal-300 text-xs font-medium px-3 py-1 rounded-full">#OpenToWork</span>
            <button className="bg-white text-black font-semibold px-4 py-1 rounded-md">Hire Me!</button>
          </div>
          <p className="text-lg text-slate-400 max-w-xl">
            SDE Intern at TripFactory.com building AI-powered hotel, dining & itinerary intelligence platforms. M.Tech in Network &amp; Security (IIITA) with a strong background in backend engineering, cryptography, and full-stack development.
          </p>
          <div className="flex items-center gap-2 my-4 text-slate-400">
            <IoLocationOutline />
            <span>Bengaluru, Karnataka, India</span>
          </div>
          <div className="flex items-center gap-3 mt-6">
            {socialLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href}
                className="w-10 h-10 border border-slate-600 rounded-md flex items-center justify-center hover:bg-slate-800 transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right Side - Profile Picture */}
        <div className="mt-8 md:mt-0 md:w-2/5 flex justify-center md:justify-end">
            <img 
                src={profilePic} 
                alt="Mohit Vishwakarma" 
                className="w-48 h-48 rounded-xl object-cover grayscale"
            />
        </div>
      </div>
    </section>
  );
};

export default Header;