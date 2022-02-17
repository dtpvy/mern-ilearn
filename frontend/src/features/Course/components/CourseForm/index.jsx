import InputField from 'components/CustomFields/InputField';
import { FastField, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import EditorField from 'components/CustomFields/EditorField';

function CourseForm(props) {
  const { initialValues, handleValues } = props;

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('This field is required.'),
    description: Yup.string().required('This field is required.'),
    hashtags: Yup.string(),
    content: Yup.string().required('This field is required.')
  });

  // npm i --save react-select
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >

      {formikProps => {
        return (
          <Form>
            <FastField
              name="title"
              component={InputField}
              onChange={handleValues(formikProps.values)}
              label="Tên Khóa học"
              placeholder="Tên khóa học"
            />

            <FastField
              name="description"
              component={InputField}
              onChange={handleValues(formikProps.values)}
              label="Mô tả"
              placeholder="Mô tả khóa học"
            />

            <FastField
              name="hashtags"
              component={InputField}
              onChange={handleValues(formikProps.values)}
              label="Từ khóa"
              placeholder="Eg: frontend, backend, other, ..."
            />

            <FastField
              name="content"
              component={EditorField}

              label="Nội dung"
            />


          </Form>
        );
      }}
    </Formik>
  );
}

export default CourseForm;