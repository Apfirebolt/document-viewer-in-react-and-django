import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

const DocumentUpload = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);  
    formData.append("description", data.description);
    props.uploadDocumentUtil(formData);
  };

  return (
    <div className="bg-white container mx-auto my-3">
      <section aria-labelledby="features-heading" className="relative">
        <div className="max-w-2xl mx-auto sm:px-6 lg:max-w-7xl p-4 lg:grid lg:gap-x-8">
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit((data) => formSubmit(data))}
            className="mx-auto my-3"
          >
            <div className="mb-4">
              <label
                htmlFor="file"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                File
              </label>
              <input
                type="file"
                {...register("file", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.file && (
                <p className="text-red-500 my-1">File is required</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Description
              </label>
              <textarea
                rows="4"
                {...register("description", { required: false })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

DocumentUpload.propTypes = {
    uploadDocumentUtil: PropTypes.func.isRequired,
};

export default DocumentUpload;
