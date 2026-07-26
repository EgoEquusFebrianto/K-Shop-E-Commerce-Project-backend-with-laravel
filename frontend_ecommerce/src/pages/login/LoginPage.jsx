import React, { useState } from 'react'
import { SignInPart } from './SignInPart';
import { SignUpPart } from './SignUpPart';
import { TogglePanelPage } from './TogglePanel';
import "./LoginStyle.css";
import { useAuth } from '../../context/auth/hooks/auth-hook';

export const LoginPage = ({state}) => {
    const [active, setActive] = useState(state);
    const {login, register} = useAuth();

    return (
        <div className='login-wrapper'>
            <div className={`container ${active ? "active": ""}`}>
                <SignInPart login={login} />
                <SignUpPart register={register} />
                <TogglePanelPage active={active} setActive={setActive}/>
            </div>
        </div>
    )
}