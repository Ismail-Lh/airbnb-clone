/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import { ReactElement, useEffect, useState } from 'react';
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
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800/70 outline-none focus:outline-none">
        <div className="relative mx-6 my-auto h-full w-full md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5">
          <div
            className={`duration-300 ${
              showModal ? 'translate-y-0' : 'translate-y-full'
            } ${showModal ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="relative flex h-full w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none md:h-auto lg:h-auto">
              <div className="relative flex items-center justify-center rounded-t border-b-[1px] p-6">
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute left-9 border-0 p-1 transition hover:opacity-70"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* MODAL BODY */}
              <div className="relative flex-auto p-6">{body}</div>
              {/* MODAL FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex w-full flex-row items-center gap-4">
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
