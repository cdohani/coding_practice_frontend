import React, { useEffect, useState } from 'react'
import "../assets/css/login.css";
import { postData, fetchData } from 'services/methods/api';
import { useHistory } from "react-router-dom";
function Login() {
    //////////////////////////////////
    //Hooks
   

    useEffect(() => {

    }, []);


    //////////////////////////////////
    //States
    const [formData, setFormData] = useState();
    const [validationError, setValidationError] = useState('');
    /////////////////////////////////

    /////////////////////////////////




    //////////////////////////////////
    //Methods
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        postData('/student/login', formData).then((res) => {
            localStorage.setItem("access_token",res.data.data.token);
            localStorage.setItem("permissions",JSON.stringify(res.data.data.permissions));
            history.push("/admin/create");
        })
        .catch(error => {
            setValidationError(error.error);
        });
    }
    

    return (

        <section className="myform-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="form-area login-form">
                            <div className="form-content">
                                <h2>Login</h2>
                                

                            </div>
                            <div className="form-input">
                                <h2>Login Form</h2>
                                <p style={{color:"red"}}>{validationError}</p>
                                <form onSubmit={handleFormSubmit}>
                                    <div className="form-group">
                                        <input type="text" id="" name="id" required onChange={handleChange} />
                                        <label>Id</label>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" id="" name="password" required onChange={handleChange} />
                                        <label>password</label>
                                    </div>
                                    <div className="myform-button">
                                        <button className="myform-btn" type='submit'>Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;