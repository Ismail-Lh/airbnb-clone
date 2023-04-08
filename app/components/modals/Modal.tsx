/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import { ReactElement, useState, useEffect } from 'react';

import { IoMdClose } from 'react-icons/io';
import Button from '../Button';

interface ModalProps {
  actionLabel: string;
  onClose: () => void;
  onSubmit: () => void;
  isOpen?: boolean;
  disabled?: boolean;
  title?: string;
  secondaryActionLabel?: string;
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
  secondaryActionLabel,
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

  const handleSubmit = () => {
    if (disabled) return;

    onSubmit();
  };

  const handleSecondaryAction = () => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={handleClose}
        className="flex justify-center items-center overflow-x-hidden overflow-y-auto bg-neutral-800/70 outline-none focus:outline-none fixed inset-0 z-50"
      >
        <div className="relative w-full h-full md:w-4/6 lg:w-3/6 xl:w-2/5 lg:h-auto md:h-auto mx-6 my-auto">
          <div
            className={`translate duration-300 ${
              showModal ? 'translate-y-0' : 'translate-y-full'
            } ${showModal ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="flex flex-col relative outline-none focus:outline-none translate w-full h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg bg-white">
              <div className="flex items-center justify-center p-6 rounded-t border-b-[1px] relative">
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* MODAL BODY */}
              <div className="relative flex-auto p-6">{body}</div>
              {/* MODAL FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      disabled={disabled}
                      onClick={handleSecondaryAction}
                      label={secondaryActionLabel}
                    />
                  )}

                  <Button
                    disabled={disabled}
                    onClick={handleSubmit}
                    label={actionLabel}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Modal.defaultProps = {
//   isOpen: false,
//   disabled: false,
//   title: '',
//   secondaryActionLabel: '',
//   body: null,
//   footer: null,
//   secondaryAction: null,
// };

export default Modal;
