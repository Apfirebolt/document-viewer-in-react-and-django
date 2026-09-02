import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { register as registerFunc, reset } from "../../features/auth/authSlice";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/");
    }

    return () => {
      dispatch(reset());
    };
  }, [isSuccess, user, navigate, dispatch]);

  const onSubmit = (data) => {
    dispatch(registerFunc(data));
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-white">
      {/* Visual Workspace Hero */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          src="/doc.jpg"
          alt="Document viewer workspace"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[1px]" />
      </div>

      {/* Register Form Section */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm sm:max-w-md">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Get Started
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in instead
              </Link>
            </p>
          </div>

          {/* Backend Error Banner */}
          {isError && message && (
            <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              {message}
            </div>
          )}

          <div className="mt-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    First Name
                  </label>
                  <div className="mt-1.5">
                    <input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all ${
                        errors.firstName
                          ? "border-rose-300 focus:border-rose-500 focus:ring-rose-200"
                          : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-200"
                      }`}
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-xs font-medium text-rose-600">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Last Name
                  </label>
                  <div className="mt-1.5">
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all ${
                        errors.lastName
                          ? "border-rose-300 focus:border-rose-500 focus:ring-rose-200"
                          : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-200"
                      }`}
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-xs font-medium text-rose-600">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-slate-700"
                >
                  Username
                </label>
                <div className="mt-1.5">
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    placeholder="johndoe"
                    className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all ${
                      errors.username
                        ? "border-rose-300 focus:border-rose-500 focus:ring-rose-200"
                        : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-200"
                    }`}
                    {...register("username", {
                      required: "Username is required",
                      minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters",
                      },
                    })}
                  />
                  {errors.username && (
                    <p className="mt-1 text-xs font-medium text-rose-600">
                      {errors.username.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>
                <div className="mt-1.5">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all ${
                      errors.email
                        ? "border-rose-300 focus:border-rose-500 focus:ring-rose-200"
                        : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-200"
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs font-medium text-rose-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>
                <div className="mt-1.5">
                  <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all ${
                      errors.password
                        ? "border-rose-300 focus:border-rose-500 focus:ring-rose-200"
                        : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-200"
                    }`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="mt-1 text-xs font-medium text-rose-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="mr-2 h-4 w-4 animate-spin text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;