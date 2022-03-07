/* eslint-disable no-underscore-dangle */
import { useMemo, useCallback } from "react";
import { Button, Checkbox, NumberInput, Select, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/hooks";
import { FormInputTypesFragment, CheckboxFormInput, DateFormInput, NumberFormInput, TextFormInput, SelectFormInput, CompleteProfileInputObject, FormInput } from '@embedded-bind/react/graphql/generated'

interface FormInputsProps<T extends FormInputTypesFragment> {
  inputs: FormInputTypesFragment[],
  onSubmit: undefined | ((values: T) => void),
}

const fieldValueUtil = ({ __typename, ...restField }: { __typename: string }) => {
  switch(__typename) {
    case "CheckboxInput":
      return (restField as CheckboxFormInput).checked;
    case "DateFormInput":
      return (restField as DateFormInput).selectedDate;
    case "NumberFormInput":
      return (restField as NumberFormInput).value || (restField as { numericValue: string })?.numericValue;
    case "TextFormInput":
      return (restField as TextFormInput).value
    case "SelectFormInput":
      return (restField as SelectFormInput).selectedOption
    default:
      return undefined;
  }
}

function FormInputs<T>({ inputs, onSubmit }: FormInputsProps<T>) {

  const initialValues = useMemo(() => {
    if (inputs) {
      return inputs.reduce((fields, requiredField: FormInputTypesFragment) => ({
        ...fields, [requiredField.name]: fieldValueUtil(requiredField)
      }), {})
    }
    return []
  }, [inputs]);

  const form = useForm<T>({
    initialValues: initialValues as T,
  });

  const handleSubmit = useCallback(() => {
    if (onSubmit) {
      console.log(`Attempting to call submit from form with values: ${JSON.stringify(form.values)}`)
      onSubmit(form.values);
    }
  }, [form, onSubmit]);

  return (
    <ul>
      {
        inputs?.map((requiredField: FormInputTypesFragment) => {

          const isCheckBox = requiredField?.__typename === "CheckboxFormInput";
          const inputProps = form.getInputProps((requiredField.name as keyof T), { type: isCheckBox ? "checkbox" : "default" });
      
          return (
              <li key={requiredField.name}>
                {
                  isCheckBox &&
                  <Checkbox
                    checked={requiredField.checked}
                    disabled={requiredField.disabled || false}
                    name={requiredField.name}
                    required={requiredField.required || false}
                    label={requiredField.label}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...inputProps}
                  />
                }
                {
                  requiredField.__typename === "DateFormInput" &&
                  <DatePicker
                    disabled={requiredField.disabled || false}
                    maxDate={requiredField.maxDate}
                    minDate={requiredField.minDate}
                    name={requiredField.name}
                    required={requiredField.required || false}
                    label={requiredField.label}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    onChange={(updatedDate) => {
                      form.setFieldValue((requiredField.name as keyof T), updatedDate?.toISOString().split('T')[0] as unknown as T[keyof T])
                    }}
                    value={new Date(inputProps.value)}
                  />
                }
                {
                  requiredField.__typename === "NumberFormInput" &&
                  <NumberInput
                    disabled={requiredField.disabled || false}
                    max={requiredField.maxValue || undefined}
                    min={requiredField.minValue || undefined}
                    name={requiredField.name}
                    required={requiredField.required || false}
                    label={requiredField.label || undefined}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...inputProps}
                  />
                }
                {
                  requiredField.__typename === "SelectFormInput" &&
                  <Select
                    data={requiredField.options || []}
                    disabled={requiredField.disabled || false}
                    name={requiredField.name}
                    required={requiredField.required || false}
                    label={requiredField.label || undefined}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...inputProps}
                  />
                }
                {
                  requiredField.__typename === "TextFormInput" &&
                  <TextInput
                    description={requiredField.description}
                    disabled={requiredField.disabled || false}
                    name={requiredField.name}
                    required={requiredField.required || false}
                    label={requiredField.label || undefined}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...inputProps}
                  />
                }
              </li>
          )
      })
    }
    { onSubmit && <Button onClick={handleSubmit}>Submit</Button>}
    </ul>
  )
}

export default FormInputs;


