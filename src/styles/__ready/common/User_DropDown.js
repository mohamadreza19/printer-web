import { useState } from 'react';
import Typography from '../Typography';
import { useEffect } from 'react';
import { ClickAwayListener } from '@mui/material';

export default function ({
  options = [{ label: '', value: '' }],
  onChange = () => {},
  currentValue = '',
  isAllow_ShowCurrentValue_Whitout_Seariching_in_option = false,
  disabled = false,
}) {
  const [isShow, setIsShow] = useState(false);
  const [value, setValue] = useState(null);

  const disabledClass = disabled ? 'disabled-select-box' : '';

  // show finded option from currentValue prop for first time
  useEffect(() => {
    const currentOption = options?.find(
      (option) => option.value === currentValue
    );
    setValue(currentOption);
  }, []);

  useEffect(() => {
    if (value) onChange(value.value, value.label);
  }, [value?.value]);

  const DropDwon = () => {
    if (isShow && !disabled) {
      return (
        <div className="select-drop-down">
          {options?.map((option, index) => (
            <section
              className="select-drop-child cur-pointer"
              key={index}
              onClick={() =>
                setValue({ label: option.label, value: option.value })
              }
            >
              <Typography.H9 className="color-white">
                {option.label}
              </Typography.H9>
            </section>
          ))}
        </div>
      );
    }

    return null;
  };
  return (
    <ClickAwayListener onClickAway={() => setIsShow(false)}>
      <article
        className={
          'select-rtl position-relative  d-flex justify-content-center align-items-center cur-pointer ' +
          disabledClass
        }
        onClick={() => setIsShow(!isShow)}
      >
        {!isAllow_ShowCurrentValue_Whitout_Seariching_in_option
          ? value?.label
          : currentValue}
        <DropDwon />
      </article>
    </ClickAwayListener>
  );
}
