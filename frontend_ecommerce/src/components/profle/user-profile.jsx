import React from 'react'
import "./user-profile.css"
import { useAuth } from '../../context/auth/hooks/auth-hook';

export const UserProfile = () => {
    const { user, loading, isAuthenticated } = useAuth();

    if (loading) {
        return (
            <div className="user-profile-loading">
                Loading profile...
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return (
            <div className="user-profile-empty">
                <h2>Profile</h2>
                <p>Please login to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="user-profile">
            <div className="user-profile-card">

                <div className="profile-header">
                    <img
                        src={user.avatar}
                        alt={user.fullname}
                        className="profile-avatar"
                    />

                    <div className="profile-main-info">
                        <h1>{user.fullname}</h1>
                        <p>{user.email}</p>
                    </div>
                </div>

                <div className="profile-details">

                    <div className="profile-field">
                        <span className="profile-label">
                            Full Name
                        </span>
                        <span className="profile-value">
                            {user.fullname}
                        </span>
                    </div>

                    <div className="profile-field">
                        <span className="profile-label">
                            Email
                        </span>
                        <span className="profile-value">
                            {user.email}
                        </span>
                    </div>

                    <div className="profile-field">
                        <span className="profile-label">
                            Phone
                        </span>
                        <span className="profile-value">
                            {user.phone || "-"}
                        </span>
                    </div>

                    <div className="profile-field">
                        <span className="profile-label">
                            Status
                        </span>
                        <span className="profile-value">
                            {user.status}
                        </span>
                    </div>


                </div>

            </div>
        </div>
    );
};