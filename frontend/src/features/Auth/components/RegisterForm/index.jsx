import React from 'react';
import PropTypes from 'prop-types';
import { FastField, Form, Formik } from 'formik';
import { FormGroup, Button } from 'reactstrap';
import InputField from '../CustomFields/InputField';
import * as Yup from 'yup';

import { BsFillPersonFill } from "react-icons/bs";
import { BsFillShieldLockFill } from "react-icons/bs";
import { BsShieldFillCheck } from "react-icons/bs";

RegisterForm.propTypes = {
  onSubmit: PropTypes.func
};

RegisterForm.defaultProps = {
  onSubmit: null
}

function RegisterForm(props) {
  const initialValues = {
    username: '',
    password: '',
    confirmPassword: ''
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.mixed().test(
      "match",
      "Passwords do not match", // your error message
      function () {
        return this.parent.password === this.parent.confirmPassword;
      }
    )
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

            <FastField
              name='confirmPassword'
              component={InputField}

              type="password"
              label="Confirm Password"
              icon={<BsShieldFillCheck />}
              placeholder="Confirm password"
            />

            <FormGroup className="text-center">
              <div className='text-danger mb-2'>
                {props.message}
              </div>
              <Button type="submit" color="danger" outline className="w-100">
                Register
              </Button>
            </FormGroup>
          </Form>
        )
      }}
    </Formik>
  );
}

export default RegisterForm;