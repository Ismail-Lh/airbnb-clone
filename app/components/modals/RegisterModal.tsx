'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { Field, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import useRegisterModalStore from '@/app/stores/useRegisterModalStore';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';

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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    console.log(data);

    // TODO: Handle api request
    try {
      await axios.post('/api/register', data);
    } catch (error) {
      toast.error(<b>Something went wrong!!!</b>);
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subTitle="Create an account!" />
      <Input
        id="email"
        label="Email Address"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        onClick={() => signIn('google')}
        icon={FcGoogle}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="font-light text-neutral-500 text-center mt-4">
        <div className="flex flex-row items-center justify-center gap-2">
          <p>Already have an account?</p>
          <p className="text-rose-500 cursor-pointer hover:underline">Log in</p>
        </div>
      </div>
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
      footer={footerContent}
    />
  );
}

export default RegisterModal;
