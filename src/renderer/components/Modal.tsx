import React from 'react';

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
    title: string;
}

const Modal: React.FC<ModalProps> = ({ children, onClose, title }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full relative">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                >
                    ×
                </button>
                <div className="max-h-[70vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;