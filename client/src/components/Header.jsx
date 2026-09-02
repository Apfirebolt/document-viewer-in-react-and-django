import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  MenuIcon,
  XIcon,
  DocumentTextIcon,
  UsersIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { logout } from "../features/auth/authSlice";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { name: "Documents", href: "/documents", icon: DocumentTextIcon },
    { name: "Users", href: "/users", icon: UsersIcon },
    ...(user?.is_admin
      ? [{ name: "Admin", href: "/admin", icon: ShieldCheckIcon }]
      : []),
  ];

  const getNavLinkClass = ({ isActive }) =>
    `inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
      isActive
        ? "bg-indigo-50 text-indigo-700 font-semibold"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
    }`;

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-all">
      {/* Top Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Brand & Left Navigation */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 text-slate-900 transition-opacity hover:opacity-90"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 shadow-sm shadow-indigo-200 text-white font-bold text-lg">
                D
              </div>
              <span className="text-base font-bold tracking-tight text-slate-900">
                DocViewer
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            {user && (
              <nav className="hidden lg:flex items-center space-x-1">
                {navLinks.map((item) => (
                  <NavLink key={item.name} to={item.href} className={getNavLinkClass}>
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            )}
          </div>

          {/* Desktop Right Side (Auth / Profile) */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            {user ? (
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex items-center gap-2.5 rounded-full p-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="sr-only">Open user menu</span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-semibold ring-2 ring-indigo-50">
                      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div className="hidden text-left sm:block">
                      <p className="text-xs font-semibold text-slate-700 leading-tight">
                        {user?.name || "Account"}
                      </p>
                      <p className="text-[11px] text-slate-400 leading-tight truncate max-w-[120px]">
                        {user?.email}
                      </p>
                    </div>
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-52 origin-top-right divide-y divide-slate-100 rounded-xl bg-white p-1.5 shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div className="px-3 py-2">
                      <p className="text-xs font-semibold text-slate-900">Signed in as</p>
                      <p className="truncate text-xs text-slate-500">{user?.email}</p>
                    </div>

                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium ${
                              active ? "bg-slate-50 text-slate-900" : "text-slate-600"
                            }`}
                          >
                            <UserCircleIcon className="h-4 w-4 text-slate-400" />
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                    </div>

                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium ${
                              active ? "bg-rose-50 text-rose-700" : "text-rose-600"
                            }`}
                          >
                            <LogoutIcon className="h-4 w-4 text-rose-500" />
                            Sign Out
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
                >
                  Create account
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 flex lg:hidden"
          onClose={setMobileMenuOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex w-full max-w-xs flex-col bg-white pb-6 shadow-2xl">
              {/* Drawer Header */}
              <div className="flex h-16 items-center justify-between px-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
                    D
                  </div>
                  <span className="font-bold text-slate-900">DocViewer</span>
                </div>
                <button
                  type="button"
                  className="-mr-2 p-2 text-slate-400 hover:text-slate-600 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                {user ? (
                  <>
                    <div className="px-2 py-3 bg-slate-50 rounded-xl flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white font-semibold text-sm">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      {navLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                          >
                            <Icon className="h-5 w-5 text-slate-400" />
                            {item.name}
                          </Link>
                        );
                      })}
                      <Link
                        to="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      >
                        <UserCircleIcon className="h-5 w-5 text-slate-400" />
                        Profile Settings
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 pt-4">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50"
                      >
                        <LogoutIcon className="h-5 w-5 text-rose-500" />
                        Sign Out
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-center rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-center rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white shadow hover:bg-indigo-700"
                    >
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </header>
  );
};

export default Header;