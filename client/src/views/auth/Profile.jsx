import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateUserProfile } from "../../features/auth/authSlice";

const Profile = () => {

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
        email: user && user.email ? user.email : "",
        username: user && user.username ? user.username : "",
        firstName: user && user.firstName ? user.firstName : "",
        lastName: user && user.lastName ? user.lastName : "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      console.error(message);
    }
  }, [isError, isSuccess, user, message, navigate, dispatch, reset]);

  const updateUserProfileUtil = (data) => {
    data.id = user.id;
    dispatch(updateUserProfile(data)).then(() => {
      reset();
      navigate("/documents");
    });
  }

  return (
    <div className="bg-white container mx-auto my-3">
      <section aria-labelledby="features-heading" className="relative">
        <div className="aspect-w-3 aspect-h-2 overflow-hidden sm:aspect-w-5 lg:aspect-none lg:absolute lg:w-1/2 lg:h-full lg:pr-4 xl:pr-16">
          <img
            src="./doc.jpg"
            alt="Black leather journal with silver steel disc binding resting on wooden shelf with machined steel pen."
            className="h-full w-full object-center object-cover lg:h-full lg:w-full"
          />
        </div>

        <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:pb-32 sm:px-6 lg:max-w-7xl lg:pt-32 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
          <div className="lg:col-start-2">
            <h2
              id="features-heading"
              className="mt-4 text-4xl font-extrabold text-gray-900 tracking-tight"
            >
              Profile
            </h2>
            <p className="mt-4 text-xl text-gray-900 tracking-tight">
                {user ? `Welcome, ${user.email}` : ""}, Here you can change you profile details
            </p>
            <form
              onSubmit={handleSubmit((data) => updateUserProfileUtil(data))}
              className="mx-auto my-3"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="mb-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="text"
                    placeholder="Email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <p className="text-red-500 mt-1">Email is required.</p>
                  )}
                </div>

                <div className="mb-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Username"
                    {...register("username", { required: true })}
                  />
                  {errors.username && (
                    <p className="text-red-500 mt-1">Username is required.</p>
                  )}
                </div>
                
                <div className="mb-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    {...register("firstName", { required: true })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 mt-1">First Name is required.</p>
                  )}
                </div>

                <div className="mb-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    {...register("lastName", { required: true })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 mt-1">Last Name is required.</p>
                  )}
                </div>
              </div>
              <input
                className="mt-2 shadow cursor-pointer bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                value="Update Profile"
              />
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
