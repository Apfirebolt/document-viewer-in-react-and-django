import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import PropTypes from "prop-types";
import { ExclamationIcon, XIcon } from "@heroicons/react/outline";

const ConfirmModal = ({
  isOpen,
  message,
  closeModal,
  confirmAction,
  title = "Confirm Action",
  confirmText = "Delete",
  cancelText = "Cancel",
  isDestructive = true,
}) => {
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-2xl transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
                        isDestructive
                          ? "bg-rose-50 text-rose-600 ring-1 ring-rose-500/10"
                          : "bg-amber-50 text-amber-600 ring-1 ring-amber-500/10"
                      }`}
                    >
                      <ExclamationIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <Dialog.Title
                      as="h3"
                      className="text-base font-bold text-slate-900"
                    >
                      {title}
                    </Dialog.Title>
                  </div>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                  >
                    <span className="sr-only">Close modal</span>
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4">
                  <p className="text-sm leading-relaxed text-slate-600">
                    {message}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
                  >
                    {cancelText}
                  </button>
                  <button
                    type="button"
                    onClick={confirmAction}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      isDestructive
                        ? "bg-rose-600 hover:bg-rose-500 focus-visible:outline-rose-600"
                        : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
                    }`}
                  >
                    {confirmText}
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

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  confirmAction: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  title: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  isDestructive: PropTypes.bool,
};

export default ConfirmModal;