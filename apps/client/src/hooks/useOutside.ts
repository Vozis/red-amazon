import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

type TypeOut = {
  ref: any;
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
};

export const useOutside = (initialVisible: boolean): TypeOut => {
  const [isShow, setIsShow] = useState(initialVisible);
  const ref = useRef<HTMLElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick, true);

    return () => {
      document.removeEventListener('click', handleOutsideClick, true);
    };
  });

  return {
    ref,
    isShow,
    setIsShow,
  };
};
