'use client';

import Image from 'next/image';

function Avatar() {
  return (
    <Image
      className="rounded-full"
      alt="avatar"
      src="/images/placeholder.jpg"
      height="30"
      width="30"
    />
  );
}

export default Avatar;
