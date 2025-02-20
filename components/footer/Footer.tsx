import React from 'react';
import Link from 'next/link';
// import { Mail, Facebook, Instagram, Youtube } from 'lucide-react';
import { FaFacebookF, FaYoutube } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Us Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <ul className="space-y-2">
            <li><Link href="/values" className="text-gray-300 hover:text-white">Our values</Link></li>
            <li><Link href="/privacy" className="text-gray-300 hover:text-white">Privacy policy</Link></li>
            <li><Link href="/terms" className="text-gray-300 hover:text-white">Terms & conditions</Link></li>
            <li><Link href="/disclaimer" className="text-gray-300 hover:text-white">Disclaimer</Link></li>
            <li><Link href="/corporate" className="text-gray-300 hover:text-white">Corporate Information</Link></li>
            <li><Link href="/media" className="text-gray-300 hover:text-white">Media Outreach</Link></li>
            <li><Link href="/distributor" className="text-gray-300 hover:text-white">Distributor Queries</Link></li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/knowledge" className="text-gray-300 hover:text-white">Knowledge</Link></li>
            <li><Link href="/faqs" className="text-gray-300 hover:text-white">FAQs</Link></li>
            <li><Link href="/return-policy" className="text-gray-300 hover:text-white">Return & refund policy</Link></li>
            <li><Link href="/track" className="text-gray-300 hover:text-white">Track order</Link></li>
            <li><Link href="/help" className="text-gray-300 hover:text-white">Help Center</Link></li>
            <li><Link href="/download" className="text-gray-300 hover:text-white">Download App</Link></li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-300 mb-4">
            Need help fast? Fill out our{' '}
            <Link href="/form" className="underline">
              form
            </Link>{' '}
            or email help@koreanwellness.co
          </p>
          <div className="flex space-x-4">
            <Link href="/email" className="text-gray-300 hover:text-white">
              {/* <Mail size={24} /> */}
              <CiMail size={24} />
            </Link>
            <Link href="/facebook" className="text-gray-300 hover:text-white">
              {/* <Facebook size={24} /> */}
              <FaFacebookF size={24} />
            </Link>
            <Link href="/instagram" className="text-gray-300 hover:text-white">
              {/* <Instagram size={24} /> */}
              <FaInstagram size={24} />
            </Link>
            <Link href="/youtube" className="text-gray-300 hover:text-white">
              {/* <Youtube size={24} /> */}
              <FaYoutube size={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-800">
        <p className="text-gray-300">
          Copyright © 2025{' '}
          <Link href="/" className="underline">
            Korean Wellness
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;