/* eslint-disable @next/next/no-img-element */
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Document } from '@langchain/core/documents';
import { File } from 'lucide-react';
import { Fragment, useState } from 'react';

const MessageSources = ({ sources }: { sources: Document[] }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeModal = () => {
    setIsDialogOpen(false);
    document.body.classList.remove('overflow-hidden-scrollable');
  };

  const openModal = () => {
    setIsDialogOpen(true);
    document.body.classList.add('overflow-hidden-scrollable');
  };

 return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
      {sources.slice(0, 3).map((source, i) => (
        <a
          className="bg-black/30 border border-yellow-400/20 backdrop-blur-sm hover:border-yellow-400/30 transition duration-200 rounded-lg p-3 flex flex-col space-y-2 font-medium"
          key={i}
          href={source.metadata.url}
          target="_blank"
        >
          <p className="text-yellow-100 text-xs overflow-hidden whitespace-nowrap text-ellipsis">
            {source.metadata.title}
          </p>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center space-x-1">
              {source.metadata.url === 'File' ? (
                <div className="bg-yellow-400/10 flex items-center justify-center w-6 h-6 rounded-full">
                  <File size={12} className="text-yellow-400" />
                </div>
              ) : (
                <img
                  src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${source.metadata.url}`}
                  width={16}
                  height={16}
                  alt="favicon"
                  className="rounded-lg h-4 w-4"
                />
              )}
              <p className="text-xs text-yellow-100/60 overflow-hidden whitespace-nowrap text-ellipsis">
                {source.metadata.url.replace(/.+\/\/|www\.|\.([a-z]+).*/g, '$1')}
              </p>
            </div>
            <div className="flex flex-row items-center space-x-1 text-yellow-100/50 text-xs">
              <div className="bg-yellow-400/30 h-[4px] w-[4px] rounded-full" />
              <span>{i + 1}</span>
            </div>
          </div>
        </a>
      ))}
      {sources.length > 3 && (
        <button
          onClick={openModal}
          className="bg-black/20 border border-yellow-400/20 backdrop-blur-sm hover:border-yellow-400/30 transition duration-200 rounded-lg p-3 flex flex-col space-y-2 font-medium text-yellow-100"
        >
          <div className="flex flex-row items-center space-x-1">
            {sources.slice(3, 6).map((source, i) => {
              return source.metadata.url === 'File' ? (
                <div
                  key={i}
                  className="bg-yellow-400/10 flex items-center justify-center w-6 h-6 rounded-full"
                >
                  <File size={12} className="text-yellow-400" />
                </div>
              ) : (
                <img
                  key={i}
                  src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${source.metadata.url}`}
                  width={16}
                  height={16}
                  alt="favicon"
                  className="rounded-lg h-4 w-4"
                />
              );
            })}
          </div>
          <p className="text-xs text-yellow-100/60">
            View {sources.length - 3} more
          </p>
        </button>
      )}
      <Transition appear show={isDialogOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 scale-200"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform rounded-2xl bg-black/80 border border-yellow-400/20 p-6 text-left align-middle shadow-xl transition-all backdrop-blur-xl">
                  <DialogTitle className="text-lg font-bold leading-6 text-yellow-400 mb-2">
                    Sources
                  </DialogTitle>
                  <div className="grid grid-cols-2 gap-2 overflow-auto max-h-[300px] mt-2 pr-2">
                    {sources.map((source, i) => (
                      <a
                        className="bg-black/40 border border-yellow-400/20 hover:border-yellow-400/40 transition duration-200 rounded-lg p-3 flex flex-col space-y-2 font-medium text-yellow-100 backdrop-blur-sm"
                        key={i}
                        href={source.metadata.url}
                        target="_blank"
                      >
                        <p className="text-yellow-100 text-xs overflow-hidden whitespace-nowrap text-ellipsis">
                          {source.metadata.title}
                        </p>
                        <div className="flex flex-row items-center justify-between">
                          <div className="flex flex-row items-center space-x-1">
                            {source.metadata.url === 'File' ? (
                              <div className="bg-yellow-400/10 flex items-center justify-center w-6 h-6 rounded-full">
                                <File size={12} className="text-yellow-400" />
                              </div>
                            ) : (
                              <img
                                src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${source.metadata.url}`}
                                width={16}
                                height={16}
                                alt="favicon"
                                className="rounded-lg h-4 w-4"
                              />
                            )}
                            <p className="text-xs text-yellow-100/60 overflow-hidden whitespace-nowrap text-ellipsis">
                              {source.metadata.url.replace(/.+\/\/|www\.|\.([a-z]+).*/g, '$1')}
                            </p>
                          </div>
                          <div className="flex flex-row items-center space-x-1 text-yellow-100/50 text-xs">
                            <div className="bg-yellow-400/30 h-[4px] w-[4px] rounded-full" />
                            <span>{i + 1}</span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                  <button
                    onClick={closeModal}
                    className="mt-6 w-full px-4 py-2 bg-yellow-400/80 text-black font-semibold rounded-xl hover:bg-yellow-500/80 transition-all"
                  >
                    Close
                  </button>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default MessageSources;
