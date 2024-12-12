import React from 'react';
import style from './Navbar.module.css'
import logo from '../../Assets/logo.png'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary ">
      <div className="container">
        <a className="navbar-brand w-25" href="#">
          <img src={logo} alt="droob" className='w-25' />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto me-4 mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#">الرئيسية</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#About">من نحن</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">الاحصائيات</a>
            </li>
          </ul>
          <div className="d-flex ms-auto">
          <button className={` btn rounded-2 me-3 ${style.LoginBtn}`}> تسجيل دخول </button>
            <button className={` btn rounded-2 text-white ${style.RegisterBtn}`}> انشاء حساب </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
