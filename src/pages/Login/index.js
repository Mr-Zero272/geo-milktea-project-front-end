import React, { useState } from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validation from './LoginValidation';
import { loginApi } from '../../components/Api/User';
function LoginForm() {
    const [values, setValues] = useState({
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    function handleChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validation(values));
        if (Object.keys(validation(values)).length === 0) {
            // alert('Form Submitted successfully');
            try {
                console.log(values);
                await loginApi.login(values);
                toast.success('Login user successfully');
            } catch (error) {
                toast.error('login failed');
            }
        }
    };

    return (
        <div className="login_container">
            <div className="login-form">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="img-container">
                        <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" className="avatar" />
                    </div>
                    <div className="container">
                        <label htmlFor="username">
                            <b>Username</b>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            value={values.username}
                            name="username"
                            onChange={handleChange}
                        />
                        {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}

                        <label htmlFor="password">
                            <b>Password</b>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={values.password}
                            name="password"
                            onChange={handleChange}
                        />

                        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

                        <label style={{ display: 'flex', alignItems: 'center' }}>
                            <input type="checkbox" defaultChecked name="remember" /> Remember me
                            <label style={{ marginLeft: 'auto' }}>
                                <Link>Forgot Password</Link>
                            </label>
                        </label>
                    </div>
                    <div className="container">
                        <button type="submit">Login</button>
                        <span>
                            Don't have an account? <Link to="/register">&nbsp;Sign Up</Link>
                        </span>
                        <div className="center-content">
                            <strong>Or Login Using</strong>
                            <div className="social-icons">
                                <div className="icon-circle facebook-circle">
                                    <Link>
                                        <FontAwesomeIcon icon={faFacebookF} className="facebook-icon" />
                                    </Link>
                                </div>
                                <div className="icon-circle google-circle">
                                    <Link>
                                        <FontAwesomeIcon icon={faGoogle} className="google-icon" />
                                    </Link>
                                </div>
                                <div className="icon-circle twitter-circle">
                                    <Link>
                                        <FontAwesomeIcon icon={faTwitter} className="twitter-icon" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default LoginForm;
