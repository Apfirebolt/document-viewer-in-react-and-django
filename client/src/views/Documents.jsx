import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DocumentTextIcon,
  UploadIcon,
  TrashIcon,
  EyeIcon,
  SearchIcon,
  XIcon,
} from "@heroicons/react/outline";
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
  const { documents, isLoading } = useSelector((state) => state.document);
  const dispatch = useDispatch();

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [showDocument, setShowDocument] = useState(false);
  const [isConfirmModalOpened, setIsConfirmModalOpened] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const closeModal = () => setIsModalOpened(false);
  const openModal = () => setIsModalOpened(true);
  const closeConfirmModal = () => setIsConfirmModalOpened(false);
  const closeDocument = () => setShowDocument(false);

  const uploadDocumentUtil = async (data) => {
    await dispatch(createDocument(data));
    setIsModalOpened(false);
    dispatch(getDocuments());
  };

  const deleteDocumentUtil = async () => {
    if (!selectedDocument?.id) return;
    await dispatch(deleteDocument(selectedDocument.id));
    setIsConfirmModalOpened(false);
    dispatch(getDocuments());
  };

  const openDeleteModal = (document) => {
    setSelectedDocument(document);
    setDeleteMessage(
      `Are you sure you want to delete "${document.description || "this document"}"? This action cannot be undone.`
    );
    setIsConfirmModalOpened(true);
  };

  const viewDocument = (document) => {
    setSelectedDocument(document);
    setShowDocument(true);
  };

  useEffect(() => {
    dispatch(getDocuments());
  }, [dispatch]);

  const filteredDocuments = useMemo(() => {
    if (!documents) return [];
    return documents.filter((doc) =>
      doc.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [documents, searchQuery]);

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-slate-50/50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Banner */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Workspace
            </span>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Documents
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {user ? `Logged in as ${user.email}` : "Please log in to manage your files"}
            </p>
          </div>

          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <UploadIcon className="h-4 w-4" />
            Upload Document
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-6 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents by description..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm"
            />
          </div>
          <span className="text-xs font-medium text-slate-500">
            {filteredDocuments.length} {filteredDocuments.length === 1 ? "document" : "documents"}
          </span>
        </div>

        {/* Content Section */}
        <div className="mt-6">
          {isLoading ? (
            <div className="flex h-48 items-center justify-center rounded-2xl border border-slate-200 bg-white p-8">
              <p className="text-sm font-medium text-slate-500">Loading documents...</p>
            </div>
          ) : filteredDocuments.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDocuments.map((document) => (
                <div
                  key={document.id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <DocumentTextIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900 line-clamp-2">
                        {document.description || "Untitled Document"}
                      </p>
                      {document.created_at && (
                        <p className="mt-1 text-xs text-slate-400">
                          {new Date(document.created_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                    <button
                      type="button"
                      onClick={() => viewDocument(document)}
                      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <EyeIcon className="h-4 w-4 text-slate-500" />
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => openDeleteModal(document)}
                      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <TrashIcon className="h-4 w-4 text-rose-500" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-16 px-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <DocumentTextIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-slate-900">No documents found</h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm">
                {searchQuery
                  ? "No files matched your search query. Try clearing the filter."
                  : "Get started by uploading your first document to your secure vault."}
              </p>
              {!searchQuery && (
                <button
                  type="button"
                  onClick={openModal}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  <UploadIcon className="h-4 w-4" />
                  Upload Now
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal Dialog */}
      <Transition appear show={isModalOpened} as={Fragment}>
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
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-2xl transition-all">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <Dialog.Title as="h3" className="text-base font-bold text-slate-900">
                      Upload Document
                    </Dialog.Title>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    >
                      <XIcon className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="pt-2">
                    <DocumentUpload uploadDocumentUtil={uploadDocumentUtil} />
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
        confirmAction={deleteDocumentUtil}
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