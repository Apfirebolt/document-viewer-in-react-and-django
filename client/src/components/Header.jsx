import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom"; // Add router link
import { Dialog, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const Header = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-neutral-100 text-white border-t border-gray-200">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
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
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {user ? (
                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                  <div className="flow-root">
                    <button
                      onClick={logoutHandler}
                      className="-m-2 p-2 block font-medium text-gray-900"
                    >
                      Sign Out
                    </button>
                  </div>

                  <div className="flow-root">
                    <Link
                      to="/documents"
                      className="-m-2 p-2 block font-medium text-gray-900"
                    >
                      Documents
                    </Link>
                  </div>

                  <div className="flow-root">
                    <Link
                      to="/admin"
                      className="-m-2 p-2 block font-medium text-gray-900"
                    >
                      Admin
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                  <div className="flow-root">
                    <Link
                      to="/login"
                      className="-m-2 p-2 block font-medium text-gray-900"
                    >
                      Sign in
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      to="/register"
                      className="-m-2 p-2 block font-medium text-gray-900"
                    >
                      Create account
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <header className="relative overflow-hidden">
        {/* Top navigation */}
        <nav
          aria-label="Top"
          className="relative z-20 backdrop-filter backdrop-blur-xl"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-16 flex items-center">
              <button
                type="button"
                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-auto flex items-center">
                {user ? (
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <button
                      onClick={logoutHandler}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign Out
                    </button>

                    <Link
                      to="/documents"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Documents
                    </Link>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />

                    {user.is_admin ? (
                      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                        <Link
                          to="/admin"
                          className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          Admin
                        </Link>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Link
                      to="/login"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign in
                    </Link>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <Link
                      to="/register"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Create account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
