import { Fragment } from "react";
import PropTypes from "prop-types";
import { Dialog, Transition } from "@headlessui/react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import {
  DocumentTextIcon,
  XIcon,
  DownloadIcon,
  ExternalLinkIcon,
} from "@heroicons/react/outline";

const ShowDocument = ({ isOpen, document, closeModal }) => {
  if (!document) return null;

  const fileUri = document.file || document.url || "";
  const fileExtension = fileUri.split(".").pop()?.toUpperCase() || "DOC";

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all flex flex-col max-h-[92vh]">
                
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-white">
                  <div className="flex items-center gap-3 min-w-0 pr-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-500/10">
                      <DocumentTextIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-bold text-slate-900 truncate"
                      >
                        {document.description || "View Document"}
                      </Dialog.Title>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                          {fileExtension}
                        </span>
                        {document.created_at && (
                          <span className="text-xs text-slate-400 truncate">
                            Uploaded {new Date(document.created_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Header Actions */}
                  <div className="flex items-center gap-2">
                    {fileUri && (
                      <>
                        <a
                          href={fileUri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
                        >
                          <ExternalLinkIcon className="h-4 w-4 text-slate-400" />
                          Open
                        </a>
                        <a
                          href={fileUri}
                          download
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
                        >
                          <DownloadIcon className="h-4 w-4 text-slate-400" />
                          <span className="hidden sm:inline">Download</span>
                        </a>
                      </>
                    )}

                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <span className="sr-only">Close viewer</span>
                      <XIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Viewer Body */}
                <div className="relative flex-1 overflow-y-auto bg-slate-100 min-h-[500px] p-2 sm:p-4">
                  {fileUri ? (
                    <div className="h-full w-full rounded-xl overflow-hidden shadow-inner bg-white">
                      <DocViewer
                        documents={[{ uri: fileUri }]}
                        pluginRenderers={DocViewerRenderers}
                        style={{ width: "100%", height: "100%", minHeight: "550px" }}
                        theme={{
                          primary: "#4f46e5",
                          secondary: "#f8fafc",
                          tertiary: "#e2e8f0",
                          text_primary: "#0f172a",
                          text_secondary: "#64748b",
                          disableThemeScrollbar: false,
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center p-6">
                      <DocumentTextIcon className="h-12 w-12 text-slate-300" />
                      <p className="mt-3 text-sm font-semibold text-slate-700">
                        No file attachment found
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        The requested document does not contain a valid URL.
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-3.5">
                  <span className="text-xs text-slate-500 truncate max-w-sm">
                    {document.file_name || document.description}
                  </span>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="inline-flex justify-center rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
                  >
                    Done
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

ShowDocument.propTypes = {
  document: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    file: PropTypes.string,
    url: PropTypes.string,
    file_name: PropTypes.string,
    created_at: PropTypes.string,
  }),
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ShowDocument;