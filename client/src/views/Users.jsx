import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../features/user/userSlice";
import Loader from "../components/Loader";

const Users = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { users, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="bg-white container mx-auto my-3">
      <section aria-labelledby="features-heading" className="relative">
        <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:pb-32 sm:px-6 lg:max-w-7xl lg:pt-32 lg:px-8">
          <div>
            <h2 id="features-heading" className="font-medium text-gray-500">
              {currentUser ? `Welcome, ${currentUser.email}` : "Please Login"}
            </h2>
            <p className="mt-4 text-4xl font-extrabold text-gray-900 tracking-tight">
              Users
            </p>

            {isLoading ? (
              <Loader />
            ) : users?.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {users.map((item) => (
                  <div
                    key={item.id || item._id}
                    className="bg-white shadow-md rounded-lg p-4 border border-gray-100"
                  >
                    <p className="text-gray-700 font-medium truncate">
                      {item.email}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-gray-500">No users available</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Users;