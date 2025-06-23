import React from 'react';
import Modal from './Modal';

interface ConfirmationModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <Modal title="Confirm Action" onClose={onCancel}>
            <p className="text-gray-700 mb-6">{message}</p>
            <div className="flex justify-end space-x-4">
                <button
                    onClick={onCancel}
                    className="px-6 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 font-semibold"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-semibold"
                >
                    Confirm
                </button>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;