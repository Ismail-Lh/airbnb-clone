'use client';

import Image from 'next/image';

interface AvatarProps {
  imgSrc: string | null | undefined;
}

function Avatar({ imgSrc }: AvatarProps) {
  return (
    <Image
      className="rounded-full"
      alt="avatar"
      src={imgSrc || '/images/placeholder.jpg'}
      height="30"
      width="30"
    />
  );
}

export default Avatar;
