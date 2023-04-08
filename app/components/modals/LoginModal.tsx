/* eslint-disable react/no-unescaped-entities */

'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import useLoginModalStore from '@/app/stores/useLoginModalStore';
import useRegisterModalStore from '@/app/stores/useRegisterModalStore';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';

function LoginModal() {
  const router = useRouter();

  const loginModal = useLoginModalStore((state) => state);
  const registerModal = useRegisterModalStore((state) => state);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    signIn('credentials', { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success(<b>Logged in successfully!</b>);
        router.refresh();

        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(<b>{callback.error}</b>);
      }
    });
  };

  const toggleModal = () => {
    loginModal.onClose();
    registerModal.onOpen();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subTitle="Login to your account!" />
      <Input
        id="email"
        label="Email Address"
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
        onClick={() => signIn('github')}
        icon={AiFillGithub}
      />
      <div className="font-light text-neutral-500 text-center mt-4">
        <div className="flex flex-row items-center justify-center gap-2">
          <p>First time using Airbnb?</p>
          <button
            type="button"
            onClick={toggleModal}
            className="text-rose-500 cursor-pointer hover:underline"
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      onClose={loginModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;
