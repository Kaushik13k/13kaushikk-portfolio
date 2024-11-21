import React from "react";

interface CheckboxProps {
  label: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  isChecked,
  onChange,
  isDisabled = false,
}) => (
  <label className="inline-flex items-center space-x-2">
    <input
      type="checkbox"
      value={label}
      checked={isChecked}
      onChange={onChange}
      disabled={isDisabled}
      className="form-checkbox"
    />
    <span>{label}</span>
  </label>
);
export default Checkbox;
