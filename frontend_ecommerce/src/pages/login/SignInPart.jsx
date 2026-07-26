import React, { useState } from 'react'
import SocialIcons from '../../components/auth-form/SocialIcons'
import { useNavigate } from 'react-router-dom';

export const SignInPart = ({login}) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(
        form.email,
        form.password
      );

      console.log("Login Success.");
      navigate("/")
    } catch (error ){
      console.log(error);
    }
  }

  return (
    <div className='form-container sign-in'>
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>

        <SocialIcons />
        <span>Or use your email password</span>
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
        <a href='#'>Forgot your password?</a>
        <button type='submit'>Sign In</button>
      </form>
    </div>
  )
}