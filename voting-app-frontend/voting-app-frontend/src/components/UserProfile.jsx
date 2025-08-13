import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../api/index';
import { getToken } from '../utils/auth';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = getToken();
            if (!token) {
                setError('No token found, please log in.');
                setLoading(false);
                return;
            }

            try {
                const profileData = await getUserProfile(token);
                setUser(profileData);
            } catch (err) {
                setError('Failed to fetch user profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            {user && (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Mobile: {user.mobile}</p>
                    <p>Age: {user.age}</p>
                    <p>Aadhar Card Number: {user.aadharCardNumber}</p>
                </div>
            )}
        </div>
    );
};

export default UserProfile;