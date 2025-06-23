// src/components/SettingsModal.tsx
import React from 'react';
import Modal from 'react-modal'; // Assuming you use react-modal or similar
import SettingsModalContent from './SettingsModalContent'; // Import the content component
import { UserSettings } from '../types'; // Make sure UserSettings is imported

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSettings: UserSettings;
  onSave: (newSettings: UserSettings) => void;
}

// Set app element for react-modal (e.g., in index.tsx or App.tsx for accessibility)
// Modal.setAppElement('#root'); // Or the ID of your main app element

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentSettings,
  onSave,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Settings"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div style={{ position: 'relative' }}>
        <button onClick={onClose} className="modal-close-btn" aria-label="Close settings">&times;</button>
        <SettingsModalContent
          currentSettings={currentSettings}
          onSave={onSave}
        />
      </div>
    </Modal>
  );
};

export default SettingsModal;