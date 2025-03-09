import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t py-6 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} HAMARA College. All rights reserved.
        </p>
        <div className="mt-2 flex justify-center gap-4 text-sm">
          <Link to="/about" className="hover:text-primary">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-primary">
            Contact
          </Link>
          <Link to="/privacy" className="hover:text-primary">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
