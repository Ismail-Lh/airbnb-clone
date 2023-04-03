'use client';

import { useState, ReactNode, useEffect } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
}

function ClientOnly({ children }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <>{children}</>;
}

export default ClientOnly;
