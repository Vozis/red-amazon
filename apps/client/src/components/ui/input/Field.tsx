import cn from 'clsx';
import { forwardRef } from 'react';

import { IField } from '@/ui/input/field-interface';

const Field = forwardRef<HTMLInputElement, IField>(
  (
    {
      placeholder,
      error,
      className,
      type = 'text',
      style,
      Icon,
      name,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className={cn('mb-3', className)} style={style}>
        <label htmlFor={name} className={'mb-2 block'}>
          {Icon && <Icon className={'mb-3'} />}
          <span>{placeholder}</span>
        </label>
        <input
          placeholder={placeholder}
          ref={ref}
          type={type}
          {...rest}
          name={name}
          className={cn(
            ' px-4 py-2 w-full outline-none rounded-md border border-gray border-solid focus:border-primary transition-all placeholder:text-gray',
            {
              'border-red': !!error,
            },
          )}
        />
        {error && <p className="text-red mt-1 text-sm">{error}</p>}
      </div>
    );
  },
);

Field.displayName = 'Field';

export default Field;
