import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigation = {
    solutions: [
      { name: "Documents", href: "/documents" },
      { name: "Users", href: "/users" },
      { name: "Profile", href: "/profile" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Security", href: "/security" },
    ],
  };

  return (
    <footer
      aria-labelledby="footer-heading"
      className="bg-slate-900 text-slate-400 border-t border-slate-800"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12">
          {/* Brand and Description */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 shadow-sm shadow-indigo-500/20 text-white font-bold text-lg">
                D
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                DocViewer
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Secure document management, organization, and access control
              designed for modern teams.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Navigation
              </h3>
              <ul className="mt-3 space-y-2.5">
                {navigation.solutions.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Legal
              </h3>
              <ul className="mt-3 space-y-2.5">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="md:col-span-5">
            <h3 className="text-sm font-semibold text-white">
              Stay updated
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Get product updates, security notices, and feature releases directly to your inbox.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex flex-col sm:flex-row gap-2 max-w-md"
            >
              <label htmlFor="footer-email-address" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email-address"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email"
                className="w-full min-w-0 px-3.5 py-2 text-sm rounded-lg bg-slate-800 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
              <button
                type="submit"
                className="flex-shrink-0 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {currentYear} Document Viewer, Inc. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-slate-400 transition-colors">
              Terms
            </Link>
            <Link to="/security" className="hover:text-slate-400 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;