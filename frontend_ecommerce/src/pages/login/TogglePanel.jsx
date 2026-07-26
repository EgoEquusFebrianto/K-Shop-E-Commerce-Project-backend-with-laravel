import React from 'react'

export const TogglePanelPage = ({ active, setActive }) => {
    return (

        <div className="toggle-container">
            <div className="toggle">
                <div className="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>
                    <p>
                        Enter your personal details to use all
                        of site features
                    </p>
                    <button
                        type="button"
                        className="hidden"
                        onClick={() => setActive(false)}
                    >
                        Sign In
                    </button>
                </div>

                <div className="toggle-panel toggle-right">
                    <h1>Hello, Friend!</h1>
                    <p>
                        Register with your personal details
                        to use all site features
                    </p>
                    <button
                        type="button"
                        className="hidden"
                        onClick={() => setActive(true)}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}