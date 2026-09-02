import { useSelector } from "react-redux";

const Home = () => {
  // Retrieve the authenticated user from the auth slice, using optional chaining to guard against uninitialized state
  const user = useSelector((state) => state.auth?.user);

  return (
    <main className="container mx-auto my-3 bg-white">
      <section aria-labelledby="features-heading" className="relative">
        {/* Left hero visual container displaying the document preview image */}
        <div className="aspect-w-3 aspect-h-2 overflow-hidden sm:aspect-w-5 lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2 lg:pr-4 xl:pr-16">
          <img
            src="/doc.jpg"
            alt="Document preview illustration"
            loading="eager"
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Right content section displaying welcome headings and application description */}
        <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 sm:pb-32 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:pt-32">
          <div className="lg:col-start-2">
            <h2 id="features-heading" className="text-base font-medium text-gray-500">
              {user?.email ? `Welcome, ${user.email}` : "Please Login"}
            </h2>
            
            <p className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Welcome to Document Viewer
            </p>
            
            <p className="mt-4 text-base text-gray-500">
              Portal to upload and share documents
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;