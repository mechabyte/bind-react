import { DatePicker } from '@mantine/dates'
import { useMemo } from 'react';
import { DateFormInput } from '../../graphql/generated';



function DateInput({
  disabled,
  label,
  maxDate,
  minDate,
  name,
  selectedDate,
 }: Partial<DateFormInput>) {
   const value = useMemo(() => selectedDate ? new Date(selectedDate) : undefined, [selectedDate]);
   return (
    <DatePicker
      disabled={disabled || false}
      label={label}
      max={maxDate}
      min={minDate}
      name={name}
      value={value}
    />
  )
}

export default DateInput;
