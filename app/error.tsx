'use client';

import { useEffect } from 'react';

import EmptyState from './components/EmptyState';

interface IError {
  error: Error;
}

function ErrorState({ error }: IError) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="Uh Oh!" subtitle="Something went wrong!" />;
}

export default ErrorState;
