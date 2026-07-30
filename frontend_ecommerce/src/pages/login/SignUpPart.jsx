import React, { useState } from 'react'
import SocialIcons from '../../components/auth-form/SocialIcons'
import { useNavigate } from 'react-router-dom';
import { showErrorToast } from '../../utils/toast-helper';

const initialForm = {
  fullname: "",
  email: "",
  password: "",
  password_confirmation: "",
  phone: ""
};

export const SignUpPart = ({register}) => {
  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm(prev => ({...prev, [name]: value}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(form);
      console.log("Register Successful.");
      
      setForm(initialForm);
      navigate("/");
    } catch (error) {
      showErrorToast("Invalid email or password.");
      console.log(error);
    }
  }
  // console.log(form);

  return (
    <div className='form-container sign-up'>
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <SocialIcons/>
        <span>Or use your email for registration?</span>
        <input 
          type='text'
          name='fullname'
          value={form.fullname}
          onChange={handleChange}
          placeholder='Full Name'
        />
        <input 
          type='email'
          name='email'
          value={form.email}
          onChange={handleChange}
          placeholder='Email'
        />
        <input 
          type='password'
          name='password'
          value={form.password}
          onChange={handleChange} 
          placeholder='Password'
        />
        <input 
          type='password'
          name='password_confirmation'
          value={form.password_confirmation}
          onChange={handleChange} 
          placeholder='Password Confirmation'
        />
        <input 
          type='text'
          name='phone'
          value={form.phone}
          onChange={handleChange}
          placeholder='Phone'
        />
        <button type='submit'>Sign Up</button>
      </form>
      
    </div>

  )
}