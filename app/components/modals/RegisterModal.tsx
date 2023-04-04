'use client';

import { useState } from 'react';
import { Field, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import useRegisterModalStore from '@/app/stores/useRegisterModalStore';
import Modal from './Modal';
import Heading from '../Heading';

function RegisterModal() {
  const { isOpen, onClose, onOpen } = useRegisterModalStore((state) => state);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: '', email: '', password: '' },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    console.log(data);

    // TODO: Handle api request
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subTitle="Create an account!" />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Register"
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
      body={bodyContent}
    />
  );
}

export default RegisterModal;
