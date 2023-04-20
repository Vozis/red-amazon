import cn from 'clsx';
import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'orange' | 'white';
  size: 'sm' | 'md' | 'lg';
}

const Button: FC<PropsWithChildren<IButton>> = ({
  children,
  className,
  variant,
  size = 'md',
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={cn(
        'rounded-xl font-medium shadow-sm hover:shadow-lg transition duration-300 ease-in-out',
        {
          'text-secondary bg-primary': variant === 'orange',
          'text-primary bg-white': variant === 'white',
        },
        {
          'px-4 py-2 text-sm': size === 'sm',
          'px-10 py-4 text-md': size === 'md',
          'px-15 py-6 text-lg': size === 'lg',
        },
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
