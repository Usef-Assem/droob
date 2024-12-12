import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import AboutImg from '../../Assets/About-kid.png';
import style from './About.module.css';

function About() {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <>
      <div id='About' className={`${style.About} p-4 d-flex flex-wrap justify-content-around align-items-center`}>
        <div 
          className="imgContent col-md-5 col-lg-4 col-12" 
          data-aos="zoom-in-down" 
        >
          <img src={AboutImg} alt="kids-droob" className="w-100 rounded-5" />
        </div>
        <div className={`${style.AboutContent} col-md-6 col-12`} data-aos="zoom-in-down" >
          <h1 dir="rtl" className="h3 text-center text-white mb-md-5 mt-3">من نحن</h1>
          <p dir="rtl" className="text-white text-center">
            دروب: رحلتنا تبدأ من هنا! معاً نكتشف المتعلمين من ذوي صعوبات التعلم، ونقدم لهم الدعم اللازم لتحقيق النجاح في كل مراحل حياتهم.
            نحن منصة متخصصة تساعد المُعلّم لتشخيص ذوي صعوبات التعلم، وتقديم الدعم والتوجيه التعليمي لهم. نحو تحقيق التكيّف النفسي والاجتماعي والاكاديمي لذوي صعوبات التعلم.
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
