import React, { useEffect } from 'react';
import style from './Home.module.css'; // Make sure the CSS is imported
import cloud from '../../Assets/cloud.png';
import girl from '../../Assets/girl.jpg';
import { Helmet } from "react-helmet";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1500 }); // Initialize AOS with a 1-second duration
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Droob | Home</title>
      </Helmet>

      <div className={`Home py-5 ${style.landing}`}>
        <div className="d-flex mx-auto w-75 justify-content-end py-md-0 flex-column align-items-end">
          <img src={cloud} alt="cloud" className="mt-3 me-5 px-5" />
        </div>

        <div className="content position-relative d-flex flex-wrap justify-content-center align-items-center">
          <div className={`${style.halfCircle} d-md-block d-none`}></div>
          <div className={`${style.imgContent} col-md-7 col-lg-5 col-12`}>
            <img src={girl} alt="girl" className={`w-75 ms-3 ${style.roundedImage}`} />
            <div className={`${style.circle}`}></div>
          </div>

          <div className={`${style.textContent} ms-lg-5 col-md-5 col-12 d-flex flex-column align-items-end`} data-aos="fade-down">
            <h1 dir="rtl" className={`${style.title} me-md-2 me-2`}>منصة دروب</h1>
            <p dir="rtl" className='fs-4 me-2 me-md-2 '>
              دروب مساعدك الشخصي كمُعلّم في تشخيص المتعلمين من ذوي صعوبات التعلم واكتشاف الدروب المناسبة وتقديم الدعم والتوجيه التعليمي المناسب لهم.
            </p>
            <button className={`py-md-3 px-md-5 py-2 px-2 rounded-5 me-4 mt-4 text-white ${style.btn}`}>
              اختبر تلميذك الان
            </button>
          </div>
        </div>

        <div className={`${style.ballsContainer}`}>
          <div className={`${style.star}`}></div>
          <div className={`${style.star}`}></div>
          <div className={`${style.star}`}></div>
          <div className={`${style.star}`}></div>
          <div className={`${style.star}`}></div>
          <div className={`${style.star}`}></div>
        </div>
      </div>
    </>
  );
}

export default Home;
