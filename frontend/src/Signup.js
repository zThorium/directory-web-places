import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import validation from './SignupValidation'
import axios from 'axios';

function Signup() {
    const [values, setValues] = useState({ 
        name:'',
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
            axios.post('http://localhost:8081/web-directory', values)
            .then(res => {
                navigate('/');
            })
            .catch(err => console.log(err));
        }

        // If there are no validation errors, you can proceed with form submission
        if (Object.keys(validationErrors).length === 0) {
            // Perform your form submission logic here
        }
    }

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h3>Panel de Registro</h3>
            <form action = '' onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='name'><strong>Nombre</strong></label>
                    <input type='text' placeholder='Ingresa tu Nombre' name='name'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.name && <span className='text-danger'>{errors.name}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='email' placeholder='Ingresa tu Email' name='email'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Contraseña</strong></label>
                    <input type='password' placeholder='Ingresa tu contraseña' name='password'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'>Registrarse</button>
                <p>Aceptas las politicas y terminos de la pagina</p>
                <Link to='/' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
            </form>
        </div>
    </div>
  )
}

export default Signup