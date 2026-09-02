import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../features/user/userSlice";
import Loader from "../components/Loader";

const Users = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { users, isLoading } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter((u) => {
      const email = u.email?.toLowerCase() || "";
      const username = u.username?.toLowerCase() || "";
      const name = `${u.first_name || ""} ${u.last_name || ""}`.toLowerCase();
      const term = searchTerm.toLowerCase();
      return email.includes(term) || username.includes(term) || name.includes(term);
    });
  }, [users, searchTerm]);

  const getInitials = (item) => {
    if (item.first_name && item.last_name) {
      return `${item.first_name[0]}${item.last_name[0]}`.toUpperCase();
    }
    if (item.username) {
      return item.username.slice(0, 2).toUpperCase();
    }
    return item.email ? item.email.slice(0, 2).toUpperCase() : "U";
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/60 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header and Search Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Directory
            </span>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Users Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {currentUser
                ? `Signed in as ${currentUser.email}`
                : "Manage and inspect user accounts across the workspace"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-72">
              <svg
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
            <button
              onClick={() => dispatch(getUsers())}
              className="inline-flex items-center rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition-all"
              title="Refresh users"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-8">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader />
            </div>
          ) : filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredUsers.map((item) => {
                const isCurrent = currentUser?.id === item.id || currentUser?.email === item.email;
                const displayName = item.first_name
                  ? `${item.first_name} ${item.last_name || ""}`.trim()
                  : item.username || "User";

                return (
                  <div
                    key={item.id || item._id}
                    className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 font-bold text-sm ring-1 ring-indigo-500/10 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          {getInitials(item)}
                        </div>
                        {isCurrent && (
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                            You
                          </span>
                        )}
                        {item.is_admin && !isCurrent && (
                          <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-700 ring-1 ring-inset ring-purple-600/20">
                            Admin
                          </span>
                        )}
                      </div>

                      <div className="mt-4">
                        <h3 className="text-sm font-semibold text-slate-900 truncate">
                          {displayName}
                        </h3>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 truncate">
                          <svg
                            className="h-3.5 w-3.5 flex-shrink-0 text-slate-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="truncate">{item.email}</span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-400">
                      <span>Status</span>
                      <span className="inline-flex items-center gap-1 font-medium text-emerald-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-16 px-6 text-center shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-slate-900">
                {searchTerm ? "No matching users" : "No users available"}
              </h3>
              <p className="mt-1 text-xs text-slate-500 max-w-xs">
                {searchTerm
                  ? `No user accounts matched "${searchTerm}". Try searching by another keyword.`
                  : "There are currently no registered users in this organization."}
              </p>
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="mt-4 text-xs font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;