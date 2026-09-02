import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

const DocumentUpload = ({ uploadDocumentUtil }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const selectedFiles = watch("file");
  const currentFile = selectedFiles?.[0];

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    if (data.description) {
      formData.append("description", data.description.trim());
    }

    await uploadDocumentUtil(formData);
    reset();
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Upload Document
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Attach a file and provide an optional description.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              File Attachment
            </label>
            <div className="mt-2 flex justify-center rounded-xl border-2 border-dashed border-slate-300 px-6 pt-5 pb-6 transition-colors hover:border-indigo-400">
              <div className="space-y-2 text-center">
                <svg
                  className="mx-auto h-10 w-10 text-slate-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v24a4 4 0 004 4h24a4 4 0 004-4V20l-12-12z"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M28 8v12h12M18 28h12M18 34h8"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="flex text-sm text-slate-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Choose a file</span>
                    <input
                      id="file-upload"
                      type="file"
                      className="sr-only"
                      {...register("file", {
                        required: "Please select a file to upload.",
                      })}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>

                {currentFile ? (
                  <p className="text-xs font-medium text-indigo-600 truncate max-w-xs mx-auto">
                    {currentFile.name} ({(currentFile.size / 1024).toFixed(1)} KB)
                  </p>
                ) : (
                  <p className="text-xs text-slate-400">PDF, DOCX, PNG, JPG up to 10MB</p>
                )}
              </div>
            </div>

            {errors.file && (
              <p className="mt-1.5 text-xs font-medium text-rose-600">
                {errors.file.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-slate-700"
            >
              Description <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <div className="mt-1.5">
              <textarea
                id="description"
                rows={3}
                placeholder="Add notes or a summary about this document..."
                {...register("description")}
                className="w-full rounded-xl border border-slate-300 p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="mr-2 h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
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
                  Uploading...
                </>
              ) : (
                "Upload Document"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

DocumentUpload.propTypes = {
  uploadDocumentUtil: PropTypes.func.isRequired,
};

export default DocumentUpload;