import { Select as BaseSelect, SelectProps as BaseSelectProps } from '@mantine/core'
import { SelectFormInput } from '../../graphql/generated';



function Select({
  disabled,
  label,
  name,
  data,
  selectedOption,
 }: Partial<SelectFormInput> & BaseSelectProps) {
   return (
    <BaseSelect
      data={data}
      disabled={disabled}
      label={label}
      name={name}
      value={selectedOption}
    />
  )
}

export default Select;
