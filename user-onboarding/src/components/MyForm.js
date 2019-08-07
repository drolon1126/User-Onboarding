import React, {useState, useEffect} from 'react';
import {Form, Field, withFormik} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import UserList from './UserList';

const MyForm = ({values, status, errors, touched,isSubmitting }) => {

  const [userList,setUserList] = useState([]);

  useEffect(()=>{
    if(status){
      setUserList([...userList, status]);
    }
  },[status])

  return (
    <div>
    <Form>
      <div>
      {errors.name && touched.name && <p>{errors.name}</p>}
      <Field
        type="text"
        name="name"
        placeholder='Your name'
      />
      </div>
      <div>
      {errors.email && touched.email && <p>{errors.email}</p>}
      <Field
        type="email"
        name="email"
        placeholder='example@email.com'
      />
      </div>
      <div>
      {errors.password && touched.password && <p>{errors.password}</p>}
      <Field
        type="password"
        name="password"
        placeholder='Password'
      />
      </div>
      <div>
      <label>
        <Field type="checkbox" name="tos" checked={values.tos} />
        Accept TOS
      </label>
      </div>
      <button disabled={isSubmitting}>Submit</button>
    </Form>
    <h1>List of Users:</h1>
      <UserList list={userList} />
    </div>

  );
}

const MyFormikForm = withFormik({
  mapPropsToValues: ({name,email,password,tos}) => {
    return { 
      name: name || '', 
      email: email || '',
      password: password || '',
      tos: tos || false 
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters long')
      .required('Name is required'),
    email: Yup.string()
      .email('Email is not a valid email')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required')
  }),

  handleSubmit: (values, { resetForm, setErrors, setSubmitting, setStatus }) => {
    if (values.email === "alreadytaken@atb.dev") {
      setErrors({ email: "That email is already taken" });
    } else {
      axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
          console.log(res); // Data was created successfully and logs to console
          resetForm();
          setSubmitting(false);
          setStatus(res.data);
        })
        .catch(err => {
          console.log(err); // There was an error creating the data and logs to console
          setSubmitting(false);
        });
    }
  },

  displayName: 'Form',
})(MyForm);

export default MyFormikForm;