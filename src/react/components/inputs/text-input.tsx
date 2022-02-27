import { TextInput as BaseTextInput, TextInputProps } from '@mantine/core'

function TextInput({
  description,
  disabled,
  label,
  name,
  value
 }: TextInputProps) {
  return (
    <BaseTextInput
      description={description}
      disabled={disabled}
      label={label}
      name={name}
      value={value || undefined}
    />
  )
}

export default TextInput;
