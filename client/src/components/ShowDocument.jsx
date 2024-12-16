import { Fragment } from "react";
import PropTypes from "prop-types";
import { Dialog, Transition } from "@headlessui/react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const DocumentUpload = (props) => {
  const { isOpen, document, closeModal } = props;
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Document Viewer - {document.description}
                  </Dialog.Title>
                  <div className="mx-auto my-3">
                    {document && (
                      <div className="mt-6">
                        <DocViewer
                          documents={[{ uri: document.file }]}
                          pluginRenderers={DocViewerRenderers}
                        />
                      </div>
                    )}
                    <div className="flex justify-center mt-3">
                      <button
                        onClick={closeModal}
                        className="shadow bg-gray-500 mx-1 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      >
                        Ok
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

DocumentUpload.propTypes = {
  document: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default DocumentUpload;
