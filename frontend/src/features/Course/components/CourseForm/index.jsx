import EditorField from 'components/CustomFields/EditorField';
import InputField from 'components/CustomFields/InputField';
import React from 'react';
import { Button, Form, FormGroup } from 'reactstrap';

function CourseForm(props) {
  const { initialValues, handleValues, onSubmit, isAddMode } = props;

  return (
    <Form>
      <InputField
        name="title"
        label="Tiêu đề"
        type="text"
        placeholder="Tiêu đề khóa học"
        value={initialValues.title}
        onChange={(title) => handleValues({ key: "title", value: title })}
      />

      <InputField
        name="description"
        label="Mô tả"
        type="text"
        placeholder="Mô tả khóa học"
        value={initialValues.description}
        onChange={(description) => handleValues({ key: "description", value: description })}
      />

      <InputField
        name="url"
        label="Đường dẫn"
        placeholder="Eg: google.com"
        value={initialValues.url}
        onChange={(url) => handleValues({ key: "url", value: url })}
      />

      <InputField
        name="hashtags"
        label="Từ khóa"
        placeholder="Eg: frontend, backend, other, ..."
        value={initialValues.hashtags}
        onChange={(hashtags) => handleValues({ key: "hashtags", value: hashtags })}
      />

      <EditorField
        name="content"
        label="Nội dung"
        value={initialValues.content}
        onChange={(content) => handleValues({ key: "content", value: content })}
      />

      <FormGroup>
        <Button
          type='button'
          onClick={onSubmit}
          color={isAddMode ? "primary" : "secondary"}
          outline
        >
          {isAddMode ? "Hoàn thành" : "Cập nhật"}
        </Button>
      </FormGroup>
    </Form>
  );
}

export default CourseForm;