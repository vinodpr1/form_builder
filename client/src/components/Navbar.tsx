import { Menu, Shapes, X } from 'lucide-react'
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
    <nav className="fixed top-0 left-0 right-0 bg-gray-300 backdrop-blur-md z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
       <Link to="/">
       <div className="flex items-center gap-2">
          <Shapes className="w-8 h-8 text-purple-400" />
          <span className="text-xl font-bold text-gray-900">FormBuilder</span>
        </div>
       </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/signin"><button className="text-gray-600 hover:text-gray-900 cursor-pointer">Sign In</button></Link>
          <Link to="/signup">
            <button className="bg-purple-400 text-white px-4 py-2 rounded hover:bg-purple-400 transition-colors cursor-pointer">
              Signup
            </button>
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </div>
    {isMenuOpen && (
      <div className="md:hidden bg-white border-b border-gray-200">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#features"
            className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
          >
            Features
          </a>
          <a
            href="#templates"
            className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
          >
            Templates
          </a>
          <a
            href="#pricing"
            className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
          >
            Pricing
          </a>
          <button className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">
            Sign In
          </button>
          <button className="block w-full px-3 py-2 text-center bg-purple-400 text-white rounded-md hover:bg-purple-500 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    )}
  </nav>
  <Outlet/>
  </div>
  )
}

export default Navbar