import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 text-gray-400 dark:bg-gray-900 py-12 md:py-16">
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-950 dark:text-gray-300 ">About</h4>
          <p className="text-sm leading-relaxed">
            Welcome to Scribeway, where we share insights, stories, and the latest trends in the world of technology
            and beyond.
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-950 dark:text-gray-300">Quick Links</h4>
          <nav className="flex gap-4">
            <Link className="hover:text-gray-50 transition-colors" href="#">
              Home
            </Link>
            <Link className="hover:text-gray-50 transition-colors" href="#">
              Blog
            </Link>
            <Link className="hover:text-gray-50 transition-colors" href="#">
              About
            </Link>
            <Link className="hover:text-gray-50 transition-colors" href="#">
              Contact
            </Link>
          </nav>
        </div>
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-950 dark:text-gray-300">Follow Us</h4>
          <div className="flex items-center space-x-4">
            <Link className="hover:text-gray-50 transition-colors" href="#">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link className="hover:text-gray-50 transition-colors" href="#">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link className="hover:text-gray-50 transition-colors" href="#">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link className="hover:text-gray-50 transition-colors" href="#">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t pt-8 text-center text-sm dark:border-gray-800">
        <p>© {new Date().getFullYear()} Scribeway. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer
