'use client';

import { PuffLoader } from 'react-spinners';

function Loader() {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center">
      <PuffLoader size={100} color="#FF5A5F" />
    </div>
  );
}

export default Loader;
