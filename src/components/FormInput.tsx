import React from 'react';
import { useFormContext } from 'react-hook-form';

type FormInputProps = {
  label: string;
  name: string;
  type?: string;
  disabled?: boolean;
};

const FormInput: React.FC<FormInputProps> = ({ label, name, type = 'text', disabled = false }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="">
      <label htmlFor={name} className="block black mb-3">
        {label}
      </label>
      <input
        type={type}
        disabled={disabled}
        placeholder=" "
        className="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4"
        {...register(name)}
      />
      {errors[name] && (
        <span className="text-red-500 text-xs pt-1 block">{errors[name]?.message as string}</span>
      )}
    </div>
  );
};

export default FormInput;
