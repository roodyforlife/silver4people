import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ControllerRenderProps, FieldValues, Path, PathValue, useFormContext, UseFormSetValue } from 'react-hook-form';
import { ICategoryCreateFormData } from '../../../../Admin/Content/components/Category/CategoryCreateForm/CategoryCreateForm';
import { CloseButton } from '../../CloseButton/CloseButton';
import { Input } from '../../Input/Input';
import cl from './Select.module.css';

interface IProps {
  setValue: (value: string[]) => void,
  label?:string,
  items:ISelect[],
  multiple:boolean,
}

export interface ISelect {
  value:string,
  text:string,
}

export const Select = ({setValue, label, items, multiple}:IProps) => {
  const [search, setSearch] = useState("");
  const [dropup, setDropup] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const selectRef = useRef(null);
  
  const filteredItems = useMemo(() => {
    return items.filter((item) => item.text.includes(search));
  }, [search, items])

  const inputField:ControllerRenderProps = {
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    value: search,
    onBlur: () => {},
    name: 'search',
    ref: () => {},
  }

  const calculateDropdownPosition = () => {
    if (selectRef.current) {
      const selectElement = selectRef.current as HTMLElement;
      const { bottom, top } = selectElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        setDropup(top > windowHeight - bottom);
    }
};

const handleSelectClick = (value:string) => {
  if (!selected.includes(value)) {
    if (multiple) {
      setSelected([...selected, value]);
    } else {
      setSelected([value]);
    }
  }
}

useEffect(() => {
  setValue(selected);
}, [selected])

const removeSelected = (value:string) => {
  setSelected([...selected].filter((val) => val !== value));
}

useEffect(() => {
  calculateDropdownPosition();
  window.addEventListener('resize', calculateDropdownPosition);

  return () => {
      window.removeEventListener('resize', calculateDropdownPosition);
  };
}, []);

  return (
    <div className={cl.container} ref={selectRef}>
    <label>{label}</label>
    <div className={cl.select}>
      <>
      {selected.map((value:string) => 
         <div className={cl.selected} key={value}>
          <span>{items.find((item) => item.value === value)?.text}</span>
          {multiple && <div className={cl.deleteButton}><CloseButton size={10} onClick={() => removeSelected(value)}></CloseButton></div>}
       </div>
      )}
      </>
        <div className={[cl.content, dropup ? cl.upward : cl.downward].join(' ')}>
            <div className={cl.search}>
                <Input field={inputField} inputType="text"></Input>
            </div>
            <div className={cl.items}>
                {filteredItems.map(({ value, text }) =>
                    <div className={cl.item} onClick={() => handleSelectClick(value)}>{text}</div>
                )}
            </div>
        </div>
    </div>
</div>
  )
}
