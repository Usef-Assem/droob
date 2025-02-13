import React, { useState } from 'react';
import style from './Navbar.module.css';
import logo from '../../Assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Navbar() {
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('Token');

  const handleLogout = async () => {
    setisLoading(true);
    try {
      const response = await axios.post(`https://doroob.info/public/api/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("Token");
      toast.success('تم تسجيل الخروج بنجاح');
      const data = response.data;
      console.log(data);
      navigate('/');
    } catch (error) {
      toast.error('فشل تسجيل الخروج');
      console.error('Logout failed:', error);
    } finally {
      setisLoading(false); // Ensure loading state is cleared
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand w-25" to={'/'}>
          <img src={logo} alt="droob" className={style.logo} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to={'/'}>الرئيسية</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#About">من نحن</a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">الاحصائيات</a>
            </li> */}
          </ul>
          <div className="d-flex ms-auto">
            {token ? (
              <button
  className={`btn rounded-2 text-white ${style.RegisterBtn}`}
  onClick={handleLogout}
  disabled={isLoading} // Disable button while loading
  style={{ width: '120px' }} // Set a fixed width to match the text width
>
  {isLoading ? (
    <div className="spinner-border spinner-border-sm text-light" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : (
    'تسجيل خروج'
  )}
</button>

            ) : (
              // Show "تسجيل دخول" and "انشاء حساب" if no token
              <>
                <Link className={`btn rounded-2 me-3 ${style.LoginBtn}`} to={'/Login'}>
                  تسجيل دخول
                </Link>
                <Link className={`btn rounded-2 text-white ${style.RegisterBtn}`} to={'/Register'}>
                  انشاء حساب
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
