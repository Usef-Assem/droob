import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import style from './Auth.module.css'
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';

export default function Register() {
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
 

  const fetchData = async (values) => {
    setisLoading(true);
    try {
      const response = await axios.post(`https://doroob.info/public/api/register`, values);
      const data = response.data;
      toast.success('تم انشاء الحساب بنجاح');
      console.log(data);
      setisLoading(false);
      // Navigate to another page or display a success message
      navigate('/login');
    } catch (error) {
      setisLoading(false);
      setError(error.response?.data?.data.email || "Something went wrong");
      toast.error('خطأ في انشاء الحساب');
      console.error('Error fetching data:', error.response.data.data.email);
    }
  };

  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  let validateScheme = yup.object({
    name: yup.string().min(3, 'يجب ادخال 3 حروف علي الاقل').max(20, 'الحد الاقصي للاسم 20 حرف').required('هذا الحقل مطلوب'),
    email: yup.string().email('البريد الالكتروني غير صالح').required('هذا الحقل مطلوب'),
    password: yup.string().matches(passwordRegex, "يجب ان تحتوي كلمة السر علي حروف كبيرة و ارقام").required("هذا الحقل مطلوب"),
    password_confirmation: yup.string().oneOf([yup.ref('password')], 'كلمة السر غير متطابقة').required("هذا الحقل مطلوب")
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: ''
    },
    validationSchema: validateScheme,
    onSubmit: (values) => fetchData(values) 
  });

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Droob | Register</title>
    </Helmet>
    <div className={style.Register}>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className='col-md-10 col-lg-8'>
          <div className='bg-light bg-opacity-25 mb-5 w-100 shadow p-5 rounded-2'>
            <h1 className='text-center text-white'>انشاء حساب</h1>
            {error !== "" ? <div className="alert border-1 border-danger text-center mt-1 p-2">{error}</div> : ''}
            <form onSubmit={formik.handleSubmit} className='mt-4'>
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='name' id='Name' className='form-control w-100 mt-2' type="text" placeholder='ادخل اسم المستخدم' />
              {formik.errors.name && formik.touched.name ? <div className="alert border-1 border-danger text-danger mt-1 p-1">{formik.errors.name}</div> : ''}

              <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='email' id='E-mail' className='form-control w-100 mt-2' type="email" placeholder='ادخل البريد الالكتروني' />
              {formik.errors.email && formik.touched.email ? <div className="alert border-1 border-danger text-danger mt-1 p-1">{formik.errors.email}</div> : ''}

              <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='password' id='Password' className='form-control w-100 mt-2' type="password" placeholder='ادخل كلمة السر' />
              {formik.errors.password && formik.touched.password ? <div className="alert border-1 border-danger text-danger mt-1 p-1">{formik.errors.password}</div> : ''}

              <input className="form-control mt-2" type="password" name="password_confirmation" onChange={formik.handleChange} onBlur={formik.handleBlur} id='password_confirmation' value={formik.values.password_confirmation} placeholder='ادخل كلمر السر مرة اخري' />
              {formik.errors.password_confirmation && formik.touched.password_confirmation ? <div className="alert border-1 border-danger text-danger mt-1 p-1">{formik.errors.password_confirmation}</div> : ''}

              {isLoading ? <button className='btn btn-info w-100 mt-3 text-light rounded-2' type='submit'><i className='fa-solid fs-4 fa-spinner fa-spin'></i></button> : <button className='btn btn-info w-100 mt-3 text-light rounded-2' type='submit'>انشئ حساب</button>}
              <div className='mt-2 text-center'>بالفعل تمتلك حساب ؟ <Link className='text-decoration-none' to={"/Login"}>سجل دخول الان</Link></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
}
