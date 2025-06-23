// src/components/StatisticsModal.tsx
import React from 'react';
import Modal from 'react-modal'; // Assuming you use react-modal or similar
import StatisticsModalContent from './StatisticsModalContent'; // Import the content component

interface StatisticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  pomodoroCount: number;
  completedTasksCount: number;
  totalTasksCount: number;
}

// Set app element for react-modal (e.g., in index.tsx or App.tsx for accessibility)
// Modal.setAppElement('#root'); // Only needs to be called once in your app

const StatisticsModal: React.FC<StatisticsModalProps> = ({
  isOpen,
  onClose,
  pomodoroCount,
  completedTasksCount,
  totalTasksCount,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Statistics"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div style={{ position: 'relative' }}>
        <button onClick={onClose} className="modal-close-btn" aria-label="Close statistics">&times;</button>
        <StatisticsModalContent
          pomodoroCount={pomodoroCount}
          completedTasksCount={completedTasksCount}
          totalTasksCount={totalTasksCount}
        />
      </div>
    </Modal>
  );
};

export default StatisticsModal;