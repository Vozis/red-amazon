import { Dispatch, FC, SetStateAction } from 'react';
import Select from 'react-select';

import { EnumProductSort } from '@/services/product/product-response.interface';

interface ISortDropDown {
  sortType: EnumProductSort;
  setSortType: Dispatch<SetStateAction<EnumProductSort>>;
}
const SortDropDown: FC<ISortDropDown> = ({ sortType, setSortType }) => {
  const selectedOptions = [];

  (Object.keys(EnumProductSort) as Array<keyof typeof EnumProductSort>).forEach(
    key => {
      const obj = {
        value: EnumProductSort[key],
        label: EnumProductSort[key],
      };
      selectedOptions.push(obj);
    },
  );

  return (
    <div className={'text-right mb-2 z-20'}>
      <Select
        onChange={selected => {
          setSortType(selected.value);
        }}
        options={selectedOptions}
      />
    </div>
  );
};

export default SortDropDown;

/*
<select
  className={'appearance-none py-1 px-2 bg-white'}
  value={sortType}
  onChange={e => setSortType(e.target.value as any)}
>
  {(
    Object.keys(EnumProductSort) as Array<keyof typeof EnumProductSort>
  ).map(key => {
    return (
      <option
        onChange={() => setSortType(EnumProductSort[key])}
        value={EnumProductSort[key]}
        key={EnumProductSort[key]}
      >
        {EnumProductSort[key]}
      </option>
    );
  })}
</select>*/
