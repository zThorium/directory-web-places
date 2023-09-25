import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import validation from './LoginValidation';
import axios from 'axios';


function Login() {
    const [values, setValues] = useState({ 
        email:'',
        password: ''      
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Perform validation and update errors
        const validationErrors = validation(values);
        setErrors(validationErrors);
        if(errors.name === '' && errors.email === '' && errors.password === ''){
            axios.post('http://localhost:8081/login', values)
            .then(res => {
                if(res.data==='Success'){
                    navigate('/home');
                } else {
                    alert('No existe dicha cuenta');
                }
            })
            .catch(err => console.log(err));
        }

        // If there are no validation errors, you can proceed with form submission
        
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <form action='' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input
                            type='email'
                            placeholder='Ingresa tu Email'
                            name='email'
                            value={values.email}
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Contraseña</strong></label>
                        <input
                            type='password'
                            placeholder='Ingresa tu contraseña'
                            name='password'
                            value={values.password}
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>
                        Iniciar Sesion
                    </button>
                    <p>Aceptas las políticas y términos de la página</p>
                    <Link
                        to='/signup'
                        className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'
                    >
                        Registrarte
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
