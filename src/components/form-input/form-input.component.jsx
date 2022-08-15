import { FormInputLabel, Input, Group } from './form-input.styles';
const FormInput = ({ label, ...othersProps }) => {
  return (
    <Group>
      <Input {...othersProps} />
      {label && (
        <FormInputLabel shrink={othersProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
