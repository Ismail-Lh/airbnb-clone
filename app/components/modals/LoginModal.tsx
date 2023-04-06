'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Field, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import useLoginModalStore from '@/app/stores/useLoginModalStore';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';

function LoginModal() {
  const router = useRouter();

  const { isOpen, onClose: closeLoginModel } = useLoginModalStore(
    (state) => state
  );

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

        closeLoginModel();
      }

      if (callback?.error) {
        toast.success(<b>{callback.error}</b>);
      }
    });
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
        onClick={() => {}}
        icon={FcGoogle}
      />
      <Button
        outline
        label="Continue with Github"
        onClick={() => {}}
        icon={AiFillGithub}
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
      title="Login"
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      onClose={closeLoginModel}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;
