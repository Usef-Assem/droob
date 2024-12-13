import React from 'react';
import style from './Footer.module.css';
import logo from '../../Assets/logo.png'


function Footer() {
  return (
    <>
      <footer className={`${style.footer} py-5`}>
        <div className={`${style.content} p-5 d-flex align-items-center flex-column`}>
          <h1 className='text-white'>Doroob</h1>
          <div className="socialMedia d-flex py-4">
          <i className="fa-brands fa-facebook fa-2xl" style={{ color: "#ffffff" }}></i>
          <i className="fa-brands fa-linkedin fa-2xl ms-5" style={{ color: "#ffffff" }}></i>
          <i className="fa-brands fa-twitter fa-2xl ms-5" style={{ color: "#ffffff" }}></i>
          <i class="fa-brands fa-youtube fa-2xl ms-5" style={{color:"#ffffff"}}></i>
          </div>
        </div>
          <p className='text-center text-white'>CopyRights &copy; 2024 All Rights are Reserved</p>
      </footer>
    </>
  );
}

export default Footer;
