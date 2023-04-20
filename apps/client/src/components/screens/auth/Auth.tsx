import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import Heading from '@/ui/Heading';
import Meta from '@/ui/Meta';
import Button from '@/ui/button/Button';
import Field from '@/ui/input/Field';
import Loader from '@/ui/input/Loader';

import { login } from '@/store/user/user.actions';
import { IEmailPassword } from '@/store/user/user.interface';

import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

import { AuthEnum, IAuthType } from '@/services/auth/auth.type';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 symbols')
    .required('Password is required'),
});
const Auth: FC = () => {
  // useAuthRedirect();

  const { isLoading } = useAuth();

  const { login, register } = useActions();

  const [type, setType] = useState<IAuthType>({ category: AuthEnum.LOGIN });
  const [isVisible, setIsVisible] = useState(false);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IEmailPassword>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IEmailPassword> = data => {
    if (type.category === AuthEnum.LOGIN) {
      login(data);
    } else {
      register(data);
    }
    reset();
  };

  return (
    <Meta title={'Auth'}>
      <section className={'flex h-screen'}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={'rounded-lg bg-white shadow-sm p-8 m-auto'}
        >
          <Heading className={'capitalize text-center mb-3'}>
            {type.category}
          </Heading>

          {isLoading ? <Loader /> : <></>}

          <Field
            placeholder={'Email'}
            {...formRegister('email')}
            type={'text'}
            name={'email'}
            error={errors.email?.message}
          />
          <Field
            placeholder={'Password'}
            {...formRegister('password')}
            type={isVisible ? 'text' : 'password'}
            name={'password'}
            error={errors.password?.message}
          />
          <label className={'mb-3 block'}>
            <input
              name={'checkbox'}
              type={'checkbox'}
              checked={isVisible}
              onChange={() => setIsVisible(!isVisible)}
            />
            <span>{isVisible ? 'Скрыть' : 'Показать'} пароль</span>
          </label>
          <Button variant={'orange'} type={'submit'}>
            Login
          </Button>

          <button
            className={'block opacity-50 mt-3'}
            type={'button'}
            onClick={() =>
              setType(
                type.category === AuthEnum.LOGIN
                  ? { category: AuthEnum.REGISTER }
                  : { category: AuthEnum.LOGIN },
              )
            }
          >
            {type.category === AuthEnum.LOGIN ? 'register' : 'login'}
          </button>
        </form>
      </section>
    </Meta>
  );
};

export default Auth;
