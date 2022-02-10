import PropTypes from 'prop-types';
import React from 'react';
import { FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import { ErrorMessage } from 'formik';

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

InputField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
}

function InputField(props) {
  const {
    field, form,
    type, label, placeholder, disabled, icon
  } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <FormGroup>
      <div className="input-group mb-4">
        <span className="input-group-text" id="basic-addon1">
          {icon}
        </span>
        <Input
          id={name}
          {...field}

          type={type}
          disabled={disabled}
          placeholder={placeholder}

          invalid={showError}
        />
        <ErrorMessage name={name} component={FormFeedback} />
      </div>
    </FormGroup>
  );
}

export default InputField;