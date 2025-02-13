import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import style from './Student.module.css';
import { Helmet } from 'react-helmet';

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .required('يرجى إدخال الاسم')
    .min(2, 'يجب أن يكون الاسم أطول من حرفين'),
  gender: Yup.string().required('يرجى اختيار الجنس'),
  level: Yup.string().required('يرجي اختيار الفصل'),
});

function StudentForm() {
  const [loading, setLoading] = useState(false); // State to track loading
  const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
      localStorage.removeItem('userId');
      localStorage.removeItem('success');
      localStorage.removeItem('subject');
    }, []);
    
  return (
    <>
          <Helmet>
      <meta charSet="utf-8" />
      <title>بطاقة الطالب</title>
    </Helmet>
      <div className={`${style.Student} p-3`}>
        <h1 className="text-center py-3">بطاقة الطالب</h1>
        <div className="d-flex flex-column align-items-end">
          <Formik
            initialValues={{
              name: '',
              gender: '',
              level: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              setLoading(true); // Set loading to true when submitting
              try {
                // Send data to API
                const response = await axios.post('https://doroob.info/public/api/student', values);
                localStorage.setItem('userId', response?.data?.data.id);
                localStorage.setItem('userName', response?.data?.data.name);
                console.log('Response:', response.data);
                navigate('/MainExam');
              } catch (error) {
                console.error('Error submitting form:', error);
              } finally {
                setLoading(false); // Set loading to false after submission
              }
            }}
          >
            {({ errors, touched }) => (
              <Form dir="rtl" className="me-3 col-11">
                <p>عزيزي التلميذ / عزيزتي التلميذة: عليك ملء البيانات الشخصية التالية :</p>
                <label htmlFor="name">الاسم :</label>
                <Field id="name" name="name" type="text" className="form-control mt-2" />
                {errors.name && touched.name && (
                  <div className="text-danger mt-1">{errors.name}</div>
                )}

                <label htmlFor="level" className="mt-3">الفصل :</label>
                <Field as="select" id="level" name="level" className="form-control mt-2">
                  <option value="" disabled>اختر الفصل</option>
                  <option value="4">الصف الرابع الابتدائي</option>
                  <option value="5">الخامس</option>
                  <option value="6">السادس</option>
                  <option value="1">الصف الاول الاعدادي</option>
                  <option value="2">الثاني</option>
                  <option value="3">الثالث</option>
                </Field>
                {errors.level && touched.level && (
                  <div className="text-danger mt-1">{errors.level}</div>
                )}

                <div className="d-flex align-items-center mt-3">
                  <label htmlFor="gender" className="">
                    الجنس :
                  </label>
                  <label>
                    <Field type="radio" name="gender" value="0" className="me-3" /> ذكر
                  </label>
                  <label>
                    <Field type="radio" name="gender" value="1" className="me-3" /> انثى
                  </label>
                </div>
                {errors.gender && touched.gender && (
                  <div className="text-danger mt-1">{errors.gender}</div>
                )}

                {/* Show loading spinner while submitting */}
                <button 
                  type="submit" 
                  className="btn btn-primary mt-5 px-4"
                  disabled={loading} // Disable button while loading
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    'إرسال'
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default StudentForm;
