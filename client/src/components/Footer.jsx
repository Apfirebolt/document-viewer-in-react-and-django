const Footer = () => {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="bg-blue-700 text-neutral-100 border-t border-gray-200"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-12 md:grid-flow-col md:gap-x-8 md:gap-y-16 md:auto-rows-min">
            {/* Image section */}
            <div className="col-span-1 md:col-span-2 lg:row-start-1 lg:col-start-1">
              <img
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                alt=""
                className="h-8 w-auto"
              />
            </div>

            {/* Newsletter section */}
            <div className="mt-12 md:mt-0 md:row-start-2 md:col-start-3 md:col-span-8 lg:row-start-1 lg:col-start-9 lg:col-span-4">
              <h3 className="text-sm font-medium">
                Sign up for our newsletter
              </h3>
              <p className="mt-6 text-sm">
                The latest deals and savings, sent to your inbox weekly.
              </p>
              <form className="mt-2 flex sm:max-w-md">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  type="text"
                  autoComplete="email"
                  required
                  className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full bg-indigo-100 border border-transparent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-black hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 py-10 text-center">
          <p className="text-sm">
            &copy; 2025 Document Viewer, Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
