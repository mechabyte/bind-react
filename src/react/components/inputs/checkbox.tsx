import { Checkbox as BaseCheckbox, CheckboxProps } from '@mantine/core'

function Checkbox({
  disabled,
  label,
  name,
  value
 }: CheckboxProps) {
  return (
    <BaseCheckbox
      disabled={disabled}
      label={label}
      name={name}
      value={value || undefined}
    />
  )
}

export default Checkbox;
