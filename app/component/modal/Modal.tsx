"use client";
import { useCallback, useEffect, useState } from "react";

interface ModalProps {
    label: string;
    close: () => void;
    content: React.ReactElement;
    isopen?: boolean;
}

const Modal: React.FC<ModalProps> = ({ label, content, isopen = false, close }) => {
    const [showModal, setShowModal] = useState(isopen);

    useEffect(() => {
        setShowModal(isopen);
    }, [isopen]);

    const handleClose = useCallback(() => {
        setShowModal(false);
        setTimeout(() => {
            close();
        }, 300);
    }, [close]);

    if (!isopen) {
        return null;
    }

    return (
        <div className="flex items-center justify-center fixed inset-0 z-50 bg-black/60" aria-modal="true" role="dialog">
            <div className="relative w-[90%] md:w-[80%] lg:w-[700px] mx-auto my-6 h-auto">
                <div className={`transition-transform duration-600 ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-10'}`}>
                    <div className="w-full rounded-xl relative flex flex-col bg-white">
                        <header className="flex items-center p-8 rounded-t-xl justify-center relative border-b">
                            <button
                                className="p-3 absolute right-3 hover:bg-gray-200 rounded-full cursor-pointer"
                                onClick={handleClose}
                                aria-label="Close modal"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <h2 className="text-xl font-bold">{label}</h2>
                        </header>
                        <section className="p-6">
                            {content}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
