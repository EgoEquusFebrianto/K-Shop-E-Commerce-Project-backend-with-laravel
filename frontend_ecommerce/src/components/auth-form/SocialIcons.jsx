import React from 'react'
import { FaFacebookF, FaGithub, FaGoogle, FaLinkedin } from 'react-icons/fa'

const SocialIcons = () => {
  return (
    <div className='social-icons'>
        <a href='#'>
            <FaGoogle />
        </a>

        <a href='#'>
            <FaFacebookF />
        </a>

        <a href='#'>
            <FaGithub />
        </a>

        <a href='#'>
            <FaLinkedin />
        </a>
    </div>
  )
}

export default SocialIcons