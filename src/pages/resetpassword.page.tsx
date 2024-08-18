import { useEffect } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../components/FormInput';
import { LoadingButton } from '../components/LoadingButton';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { ResetPasswordInput, resetPasswordSchema } from './validation';
import { RESET_PASSWORD } from '../api/resetPassword.mutation';
import { useMutation } from '@apollo/client';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resetToken = new URLSearchParams(location.search).get('resetToken');
  const email = new URLSearchParams(location.search).get('email');

  const [resetPassword, { error: gqlError }] = useMutation(RESET_PASSWORD);

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email,
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = form;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const resetPW = async (data: ResetPasswordInput) => {
    try {
      await resetPassword({ variables: { input: { newPassword: data.password, resetToken } } });
      navigate('/thankyou');
    } catch (error: any) {
      console.log('error', gqlError);
      toast.error(error, {
        position: 'top-right',
      });
    }
  };

  const onSubmitHandler: SubmitHandler<ResetPasswordInput> = async (values) => {
    if (resetToken) {
      await resetPW(values);
    } else {
      toast.error('Please provide the password reset code', {
        position: 'top-right',
      });
    }
  };

  const image = new URL('../assets/icon.png', import.meta.url).href;

  return (
    <section className="min-h-screen grid place-items-center">
      <div className="w-full">
        <img src={image} alt="Logo" className="mx-auto w-48 h-48 mb-7" />
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5"
          >
            <FormInput label="Email" name="email" type="text" disabled={true} />
            <FormInput label="New Password" name="password" type="password" />
            <FormInput label="Confirm Password" name="passwordConfirm" type="password" />
            <LoadingButton loading={false} textColor="black">
              Reset Password
            </LoadingButton>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
