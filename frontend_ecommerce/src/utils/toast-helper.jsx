import React from 'react'
import toast from 'react-hot-toast'

export const showLoginRequiredToast  = () => {
  toast.error(
    "Please login to use this feature.",
    {
        duration: 2500,
    }
  );
};