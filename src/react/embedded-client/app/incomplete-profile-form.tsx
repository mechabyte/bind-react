/* eslint-disable no-underscore-dangle */
import { DatePicker } from '@mantine/dates';
import {Checkbox, NumberInput, Select, TextInput, Button} from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useCallback, useMemo } from 'react';
import COMPLETE_PROFILE_MUTATION from '@embedded-bind/react/operations/mutations/complete-profile';
import { useMutation } from '@apollo/client';
import { IncompleteProfileRequiredFieldsFragment, CheckboxFormInput, TextFormInput, SelectFormInput, NumberFormInput, DateFormInput, CompleteProfileMutation, CompleteProfileMutationVariables, CompleteProfileInputObject } from '../../graphql/generated';

interface IncompleteProfileFormProps {
  externalId: string;
  incompleteProfile: IncompleteProfileRequiredFieldsFragment
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

function IncompleteProfileForm({ externalId, incompleteProfile }: IncompleteProfileFormProps) {
  const initialValues = useMemo(() => {
    if (incompleteProfile.requiredFields) {
      return incompleteProfile.requiredFields.reduce((fields, requiredField) => ({
        ...fields, [requiredField.name]: fieldValueUtil(requiredField)
      }), {})
    }
    return []
  }, [incompleteProfile.requiredFields]);

  const [completeProfile, { data, loading }] = useMutation<CompleteProfileMutation, CompleteProfileMutationVariables>(COMPLETE_PROFILE_MUTATION)

  const form = useForm<CompleteProfileInputObject>({
    initialValues,
  });

  const handleSubmit = useCallback(() => {
    const { values } = form;
    console.log(`Submitting:`, values);
    completeProfile({ variables: {
      externalId,
      input: {
        ...values,
        dateOfBirth: values.dateOfBirth.toString(),
      }
    }})
  }, [form, completeProfile, externalId]);

  const handleDateChange = useCallback((fieldName) => (updatedDate: Date) => {
    console.log(fieldName, updatedDate)
    form.setFieldValue((fieldName as keyof CompleteProfileInputObject), updatedDate.toISOString().split('T')[0])
  }, [form]);

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {
          incompleteProfile.requiredFields?.map((requiredField) => {

            const isCheckBox = requiredField?.__typename === "CheckboxFormInput";
            const inputProps = form.getInputProps(requiredField.name as never, { type: isCheckBox ? "checkbox" : "default" });

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
                      onChange={handleDateChange(requiredField.name)}
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
            }
          )
        }
      </ul>
      <Button disabled={loading} onClick={handleSubmit}>Submit</Button>
    </form>
  )
}

export default IncompleteProfileForm;
