import { Editor } from '@tinymce/tinymce-react';
import { API_KEY_TINY } from 'constants/globle';
import React, { useRef } from 'react';
import { FormGroup, Label } from 'reactstrap';


function EditorField(props) {
  const { label, name, onChange, value } = props;
  const editorRef = useRef(null);
  const handleChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.getContent());
    }
  };


  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}
      <Editor
        apiKey={API_KEY_TINY}
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={value}
        onChange={handleChange}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
    </FormGroup>
  );
}

export default EditorField;