import AdminMenu from "../../components/AdminMenu";

const AdminHome = () => {
  return (
    <div className="flex justify-center bg-gray-100 px-4 py-3">
      <AdminMenu />
      <div className="w-4/5 bg-slate-300 px-3 py-5">
        <h1 className="text-4xl font-bold mb-8">Admin Home Page</h1>
      </div>
    </div>
  );
};

export default AdminHome;
