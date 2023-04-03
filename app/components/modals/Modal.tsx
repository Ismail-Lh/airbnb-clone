/* eslint-disable react/require-default-props */

'use client';

import { ReactElement, useState, useEffect } from 'react';

interface ModalProps {
  actionLabel: string;
  onClose: () => void;
  onSubmit: () => void;
  isOpen?: boolean;
  disabled?: boolean;
  title?: string;
  secondaryLabel?: string;
  body?: ReactElement;
  footer?: ReactElement;
  secondaryAction?: () => void;
}

function Modal({
  actionLabel,
  onClose,
  onSubmit,
  isOpen,
  disabled,
  title,
  secondaryLabel,
  body,
  footer,
  secondaryAction,
}: ModalProps) {
  const [showModal, setShowModal] = useState<boolean | undefined>(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    if (!disabled) {
      setShowModal(false);

      setTimeout(() => onClose(), 300);
    }
  };

  const handleSubmit = () => !disabled && onSubmit();

  return <div>Modal</div>;
}

export default Modal;
