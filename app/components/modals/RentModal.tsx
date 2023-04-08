'use client';

import React from 'react';
import useRentModalStore from '@/app/stores/useRentModalStore';
import Modal from './Modal';

function RentModal() {
  const rentModal = useRentModalStore();

  return (
    <Modal
      title="Airbnb your home!"
      actionLabel="Submit"
      onClose={rentModal.onClose}
      onSubmit={() => {}}
      isOpen={rentModal.isOpen}
    />
  );
}

export default RentModal;
