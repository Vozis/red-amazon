import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const Search: FC = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = async () => {
    await router.push({
      pathname: '/q',
      query: { term: value },
    });
    setValue('');
  };

  return (
    <div className={'flex'}>
      <input
        placeholder={'Search...'}
        className={
          'bg-[#272F3E] rounded-l-lg h-10 w-50 inline-block px-3 py-2 text-white'
        }
        value={value}
        onChange={handleChange}
      />

      <button
        onClick={handleSubmit}
        className={
          'text-white h-10 w-10 bg-primary flex justify-center items-center text-lg rounded-r-lg'
        }
      >
        <AiOutlineSearch />
      </button>
    </div>
  );
};

export default Search;
