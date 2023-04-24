'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var cloudinary: any;
}

interface IProps {
  value: string;
  onChange: (value: string) => void;
}

function ImageUpload({ value, onChange }: IProps) {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="ozrksrwe"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        function handleOnClick(e: any) {
          e.preventDefault();
          open?.();
        }
        return (
          <button
            type="button"
            onClick={handleOnClick}
            className="relative flex cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed border-neutral-300 p-20 text-neutral-600 transition hover:opacity-70"
          >
            <TbPhotoPlus size={50} />
            <h3 className="text-lg font-semibold">Click to upload</h3>

            {value && (
              <div className="absolute inset-0 h-full w-full">
                <Image
                  src={value}
                  alt="Upload"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
          </button>
        );
      }}
    </CldUploadWidget>
  );
}

export default ImageUpload;
