import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

function Footer() {

  return (

    <footer className="bg-black text-white mt-20">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>

          <div className="flex items-center gap-4 mb-5">

            <img
              src="https://marketplace.canva.com/EAFauoQSZtY/2/0/1600w/canva-brown-mascot-lion-free-logo-kAK-ljYAGXg.jpg"
              alt="logo"
              className="w-16 h-16 rounded-full object-cover"
            />

            <h1 className="text-3xl font-black tracking-wide">
              MyBlog
            </h1>

          </div>

          <p className="text-gray-400 leading-relaxed">

            A modern blogging platform where writers share ideas,
            stories, and knowledge with readers worldwide.

          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-6">

            <div className="bg-gray-800 hover:bg-blue-600 transition p-3 rounded-full cursor-pointer">
              <FaFacebookF />
            </div>

            <div className="bg-gray-800 hover:bg-pink-600 transition p-3 rounded-full cursor-pointer">
              <FaInstagram />
            </div>

            <div className="bg-gray-800 hover:bg-sky-500 transition p-3 rounded-full cursor-pointer">
              <FaTwitter />
            </div>

            <div className="bg-gray-800 hover:bg-blue-500 transition p-3 rounded-full cursor-pointer">
              <FaLinkedinIn />
            </div>

          </div>

        </div>

        {/* QUICK LINKS */}
        <div>

          <h2 className="text-xl font-bold mb-6">
            Quick Links
          </h2>

          <ul className="space-y-4 text-gray-400">

            <li className="hover:text-blue-500 cursor-pointer transition">
              Home
            </li>

            <li className="hover:text-blue-500 cursor-pointer transition">
              Articles
            </li>

            <li className="hover:text-blue-500 cursor-pointer transition">
              Authors
            </li>

            <li className="hover:text-blue-500 cursor-pointer transition">
              Categories
            </li>

          </ul>

        </div>

        {/* SUPPORT */}
        <div>

          <h2 className="text-xl font-bold mb-6">
            Support
          </h2>

          <ul className="space-y-4 text-gray-400">

            <li className="hover:text-blue-500 cursor-pointer transition">
              About Us
            </li>

            <li className="hover:text-blue-500 cursor-pointer transition">
              Privacy Policy
            </li>

            <li className="hover:text-blue-500 cursor-pointer transition">
              Terms & Conditions
            </li>

            <li className="hover:text-blue-500 cursor-pointer transition">
              Help Center
            </li>

          </ul>

        </div>

        {/* CONTACT */}
        <div>

          <h2 className="text-xl font-bold mb-6">
            Contact
          </h2>

          <div className="space-y-5 text-gray-400">

            <div className="flex items-center gap-3">
              <MdEmail className="text-blue-500 text-xl" />
              <p>support@myblog.com</p>
            </div>

            <div className="flex items-center gap-3">
              <MdPhone className="text-blue-500 text-xl" />
              <p>+91 9876543210</p>
            </div>

            <div className="flex items-start gap-3">
              <MdLocationOn className="text-blue-500 text-2xl mt-1" />
              <p>
                Hyderabad, Telangana,
                India
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-500 text-sm">
            © 2026 MyBlog. All Rights Reserved.
          </p>

          <p className="text-gray-500 text-sm">
            Designed with ❤️ using React & Tailwind CSS
          </p>

        </div>

      </div>

    </footer>
  )
}

export default Footer