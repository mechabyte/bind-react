import { NumberInput as BaseNumberInput, NumberInputProps } from '@mantine/core'

function NumberInput({
  description,
  disabled,
  label,
  name,
  value
 }: NumberInputProps) {
  return (
    <BaseNumberInput
      description={description}
      disabled={disabled}
      label={label}
      name={name}
      value={value || undefined}
    />
  )
}

export default NumberInput;
