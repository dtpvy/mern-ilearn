import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { Editor } from '@tinymce/tinymce-react';
import { API_KEY_TINY } from 'constants/globle';

function EditorField(props) {
  const {
    field, form,
    type, label, placeholder, disabled
  } = props;
  const { name } = field;

  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}

      <Editor
        apiKey={API_KEY_TINY}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
            'image'
          ],
          toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | image | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        {...field}

        type={type}
        disabled={disabled}
        placeholder={placeholder}

        invalid={showError}
      />


      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}

export default EditorField;