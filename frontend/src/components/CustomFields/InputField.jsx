import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

function InputField(props) {
  const { type, label, placeholder, name, onChange, value } = props;

  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}

      <Input
        id={name}
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />

      {/* <ErrorMessage name={name} component={FormFeedback} /> */}
    </FormGroup>
  );
}

export default InputField;