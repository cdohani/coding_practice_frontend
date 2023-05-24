import React, { useEffect, useState } from 'react'
import "../assets/css/login.css";
import { fetchData, postData } from 'services/methods/api';
import { useHistory } from "react-router-dom";

function StudentRegister() {
    //////////////////////////////////
    //Hooks

    const history = useHistory();

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
        postData('/student/register', formData).then(() => {
            history.push("/");
        })
        .catch(error => {
            setValidationError(error);
        });
    }
    /////////////////////////////////


    //////////////////////////////////
    //Others

    /////////////////////////////////


    return (

        <section className="myform-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="form-area login-form">
                            <div className="form-content">
                                <h2>Register</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non aperiam cum quas quod reprehenderit.</p>

                            </div>
                            <div className="form-input" style={{ overflowY: "auto" }}>
                                <h2>Register Form</h2>
                                <form onSubmit={handleFormSubmit}>
                                    <div className="form-group">
                                        <input type="text" id="" name="name" required onChange={handleChange} />
                                        <label>Name</label>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" id="" name="password" required onChange={handleChange} />
                                        <label>password</label>
                                    </div>
                                    <div className="form-group">
                                        <select name='block' class="form-control" onChange={handleChange}>
                                            <option>Select Block</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                            <option value="E">E</option>
                                            <option value="F">F</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <select name='branch' class="form-control" onChange={handleChange}>
                                            <option>Select Branch</option>
                                            <option value="Lahore">Lahore</option>
                                            <option value="Karachi">Karachi</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <select id="disabledSelect" name='course' class="form-control" onChange={handleChange}>
                                            <option>Select Course</option>
                                            <option value="short">short </option>
                                            <option value="long">Long</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <input type="text" id="" name="phoneNumber" required onChange={handleChange} />
                                        <label>phoneNumber</label>
                                    </div>

                                    <div className="form-group">
                                        <input type="text" id="" name="registrationNo" required onChange={handleChange} />
                                        <label>registrationNo</label>
                                    </div>

                                    <div className="form-group">
                                        <select id="disabledSelect" name='roomNo' class="form-control" onChange={handleChange}>
                                            <option>Select Room</option>
                                            <option value="room_101">Room 101 </option>
                                            <option value="room_101">Room 102</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <input type="email" id="" name="email" required onChange={handleChange} />
                                        <label>Email</label>
                                        <small style={{ color: "red" }} >{validationError?.email ? validationError?.email : ''}</small>
                                    </div>


                                    <div className="myform-button">
                                        <button className="myform-btn" type='submit'>Register</button>
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

export default StudentRegister