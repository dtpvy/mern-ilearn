import React from 'react';
import PropTypes from 'prop-types';
import { FastField, Form, Formik } from 'formik';
import { FormGroup, Button } from 'reactstrap';
import InputField from '../CustomFields/InputField';
import * as Yup from 'yup';

import { BsFillPersonFill } from "react-icons/bs";
import { BsFillShieldLockFill } from "react-icons/bs";

LoginForm.propTypes = {
  onSubmit: PropTypes.func
};

LoginForm.defaultProps = {
  onSubmit: null
}

function LoginForm(props) {
  const initialValues = {
    username: '',
    password: ''
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('This field is required'),
    password: Yup.string().required('This field is required')
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}
    >
      {fomikProps => {
        return (
          <Form>'
            <FastField
              name='username'
              component={InputField}

              type="text"
              label="Username"
              icon={<BsFillPersonFill />}
              placeholder="Username"
            />

            <FastField
              name='password'
              component={InputField}

              type="password"
              label="Password"
              icon={<BsFillShieldLockFill />}
              placeholder="Password"
            />
            <FormGroup className="text-center" >
              <div className='text-danger mb-2'>
                {props.message}
              </div>
              <Button type="submit" color="danger" className="w-100">
                Log in
              </Button>
            </FormGroup>
          </Form>


        )
      }}
    </Formik >
  );
}

export default LoginForm;