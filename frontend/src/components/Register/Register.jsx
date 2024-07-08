// src/Register.js

import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { Route } from 'react-router-dom';
import { RegisterUser } from '../../api/api';

const Register = () => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: ''
    });

    const { fname, lname, email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const resp = RegisterUser({fname,lname,email,password});
    };

    return (
        <div className='parentForm'>
        <form onSubmit={onSubmit}>
            <div>
                <label>First Name</label>
                <input type="text" name="fname" value={fname} onChange={onChange} required />
            </div>
            <div>
                <label>Last Name</label>
                <input type="text" name="lname" value={lname} onChange={onChange} required />
            </div>
            <div>
                <label>Email</label>
                <input type="email" name="email" value={email} onChange={onChange} required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" value={password} onChange={onChange} required />
            </div>
            {}
            <button type="submit">Register</button>
            <span>Already Registered...? <a href='./'>Login</a></span>
        </form>
        </div>
    );
};

export default Register;
