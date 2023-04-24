'use client';

import { useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import useLoginModalStore from '@/app/stores/useLoginModalStore';
import useRegisterModalStore from '@/app/stores/useRegisterModalStore';
import Button from '../Button';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Modal from './Modal';

function RegisterModal() {
  const registerModal = useRegisterModalStore((state) => state);
  const loginModal = useLoginModalStore((state) => state);

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

    try {
      await axios.post('/api/register', data);
      toast.success(<b>Register Successfully!</b>);
      registerModal.onClose();
      loginModal.onOpen();
    } catch (error) {
      toast.error(<b>Something went wrong!!!</b>);
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  const toggleModal = () => {
    registerModal.onClose();
    loginModal.onOpen();
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
    <div className="mt-3 flex flex-col gap-4">
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
      <div className="mt-4 text-center font-light text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <p>Already have an account?</p>
          <button
            type="button"
            onClick={toggleModal}
            className="cursor-pointer text-rose-500 hover:underline"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      onClose={registerModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;
