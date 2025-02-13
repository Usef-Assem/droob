import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from "axios"
import { Link, useNavigate} from 'react-router-dom';
import style from './Auth.module.css'
import { Helmet } from 'react-helmet';
export default function Register() {
  let navigate = useNavigate()
  const [error , setError] = useState("")
  const [isLoading, setisLoading] = useState(false)
 
  const fetchData = async (values) => {
    setisLoading(true);
    try {
      const response = await axios.post(`https://doroob.info/public/api/login`, values);
      const data = response.data;
      localStorage.setItem("Token" , data.token)

      console.log(data);
      setisLoading(false);
      navigate('/');
      
    } catch (error) {
      setisLoading(false);
      setError(error.response?.data?.message || "Something went wrong");
      console.error('Error fetching data:', error);
    }
  };
  
  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  let validateScheme = yup.object({
      email: yup.string().email('بريد الكتروني غير صالح').required('هذا الحقل مطلوب'),
      password: yup.string().matches(passwordRegex , "يجب ان تحتوي كلمة السر علي حروف كبيرة و ارقام").required("هذا الحقل مطلوب"),
  })

  let formik = useFormik({
    initialValues:{
      email: "",
      password: "",
    },validationSchema: validateScheme,
    onSubmit:fetchData
  })
  
  return<>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Droob | Login</title>
      </Helmet>

  <div className={style.Register}>
    <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className='col-md-10 col-lg-10 col-11 mb-5'>
        <div className='bg-light bg-opacity-25 w-100 shadow  p-5 rounded-2'>

          <h1 className='text-center text-white'>تسجيل دخول</h1>
          {error !== "" ?<div className="alert border-1 border-danger text-center mt-1 p-2">{error}</div>:''}
          <form onSubmit={formik.handleSubmit} className='mt-4'>

          <input onChange={formik.handleChange} onBlur={formik.handleBlur} name = 'email' id='E-mail' className='form-control w-100 mt-2' type="email" placeholder='ادخل البريد الاكتروني'  />
          {formik.errors.email && formik.touched.email? <div className="alert border-1 border-danger text-danger mt-1 p-1">{formik.errors.email}</div> : ''}

          <input onChange={formik.handleChange} onBlur={formik.handleBlur} name = 'password' id='Password' className='form-control w-100 mt-2' type="password" placeholder='ادخل كلمة السر'  />
          {formik.errors.password && formik.touched.password? <div className="alert border-1 border-danger text-danger mt-1 p-1">{formik.errors.password}</div> : ''}


          {isLoading?<button className='btn btn-info w-100 mt-3 text-light rounded-2' type='submit'><i className='fa-solid fs-4 fa-spinner fa-spin'></i></button> : <button className='btn btn-info w-100 mt-3 text-light rounded-2' type='submit'>تسجيل دخول</button>}
          <div className='mt-2 text-center'>لا تمتلك حساب ؟<Link className='text-decoration-none' to={"/Register"}>انشئ حسابك</Link></div>
          
          </form>
          </div>
        </div>
    </div>
  </div>
  </>
}
