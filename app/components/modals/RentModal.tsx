'use client';

import { useMemo, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import useRentModalStore from '@/app/stores/useRentModalStore';
import { categories } from '@/app/utils/constants';
import dynamic from 'next/dynamic';
import Modal from './Modal';
import Heading from '../Heading';
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from '../inputs/CountrySelect';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

function RentModal() {
  const rentModal = useRentModalStore();

  const [step, setStep] = useState<STEPS>(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      imageSrc: '',
      description: '',
      title: '',
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      price: 1,
      location: null,
    },
  });

  const category = watch('category');
  const location = watch('location');

  const Map = useMemo(
    () => dynamic(() => import('../Map'), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const setCustomValue = (id: string, value: any) =>
    setValue(id, value, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });

  const onBack = () => setStep((value) => value - 1);
  const onNext = () => setStep((value) => value + 1);

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return 'Create';

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;

    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subTitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map(({ label, icon }) => (
          <div key={label} className="col-span-1">
            <CategoryInput
              onClick={(ctg) => setCustomValue('category', ctg)}
              label={label}
              icon={icon}
              selected={category === label}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subTitle="Help guests find you."
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  return (
    <Modal
      title="Airbnb your home!"
      body={bodyContent}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      isOpen={rentModal.isOpen}
    />
  );
}

export default RentModal;
