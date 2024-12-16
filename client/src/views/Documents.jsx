import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DocumentUpload from "../components/DocumentUpload";
import ShowDocument from "../components/ShowDocument";
import ConfirmModal from "../components/ConfirmModal";
import {
  createDocument,
  deleteDocument,
  getDocuments,
} from "../features/document/documentSlice";

const Documents = () => {
  const { user } = useSelector((state) => state.auth);
  const { documents } = useSelector((state) => state.document);
  const dispatch = useDispatch();
  let [isModalOpened, setIsModalOpened] = useState(false);
  let [showDocument, setShowDocument] = useState(false);
  let [isConfirmModalOpened, setIsConfirmModalOpened] = useState(false);
  let [selectedDocument, setSelectedDocument] = useState(null);
  let [deleteMessage, setDeleteMessage] = useState("");

  function closeModal() {
    setIsModalOpened(false);
  }

  function openModal() {
    setIsModalOpened(true);
  }

  function closeConfirmModal() {
    setIsConfirmModalOpened(false);
  }

  function openConfirmModal() {
    setIsConfirmModalOpened(true);
  }

  function closeDocument() {
    setShowDocument(false);
  }

  function openDocument() {
    setShowDocument(true);
  }

  const uploadDocumentUtil = (data) => {
    dispatch(createDocument(data)).then(() => {
      setIsModalOpened(false);
      dispatch(getDocuments());
    });
  };

  const deleteDocumentUtil = () => {
    dispatch(deleteDocument(selectedDocument.id)).then(() => {
      setIsConfirmModalOpened(false);
      dispatch(getDocuments());
    });
  };

  const openDeleteModal = (document) => {
    setSelectedDocument(document);
    setDeleteMessage(`Are you sure you want to delete ${document.description}`);
    openConfirmModal();
  };

  const viewDocument = (document) => {
    setSelectedDocument(document);
    openDocument();
  }

  useEffect(() => {
    dispatch(getDocuments());
  }, [dispatch]);

  return (
    <div className="bg-white container mx-auto my-3">
      <section aria-labelledby="features-heading" className="flex justify-around">
        <div className="lg:w-1/2 lg:h-full lg:pr-4 xl:pr-16">
          <p className="text-gray-500 text-lg text-center bg-neutral-100 p-4">
            Documents
          </p>
          <img
            src="/doc.jpg"
            alt="Black leather journal with silver steel disc binding resting on wooden shelf with machined steel pen."
            className="object-center object-cover"
          />
          
          {documents && documents.length > 0 ? (
            <div className="mt-6 text-blue-500">
              {documents.map((document) => (
                <div key={document.id} className="text-gray-700 flex justify-between">
                  <p>
                    {document.description}
                  </p>
                  <div className="my-2">
                    <button
                      className="text-blue-500 bg-slate-100 hover:bg-slate-400 hover:text-white rounded-md shadow-md px-2 py-1 ml-2"
                      onClick={() => viewDocument(document)}
                    >
                      View
                    </button>
                    <button
                      className="text-red-500 bg-slate-100 hover:bg-slate-400 hover:text-white rounded-md shadow-md px-2 py-1 ml-2"
                      onClick={() => openDeleteModal(document)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No documents available</p>
          )}
        </div>

        <div className="lg:w-1/2 mx-auto pt-16 pb-24 px-4 sm:pb-32 sm:px-6 lg:max-w-7xl lg:pt-32 lg:px-8 lg:grid lg:gap-x-8">
          <div>
            <h2 id="features-heading" className="font-medium text-gray-500">
              {user ? `Welcome, ${user.email}` : "Please Login"}
            </h2>
            <p className="mt-4 text-4xl font-extrabold text-gray-900 tracking-tight">
              Welcome to Documents Page
            </p>
            <button
              type="button"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={openModal}
            >
              Upload Document
            </button>
            <p className="mt-4 text-gray-500">Documents page</p>
          </div>
        </div>
      </section>
      <Transition appear show={isModalOpened} as={Fragment}>
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
                    Upload Document
                  </Dialog.Title>

                  <DocumentUpload uploadDocumentUtil={uploadDocumentUtil} />
                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <ConfirmModal 
        isOpen={isConfirmModalOpened} 
        message={deleteMessage} 
        closeModal={closeConfirmModal} 
        confirmAction={() => deleteDocumentUtil()}
      />
      {selectedDocument && (
        <ShowDocument 
          isOpen={showDocument} 
          document={selectedDocument} 
          closeModal={closeDocument}
        />
      )}
    </div>
  );
};

export default Documents;
