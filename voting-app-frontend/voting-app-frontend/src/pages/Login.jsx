import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../api/index';
import { setToken } from '../utils/auth';

const Login = () => {
    const [aadharCardNumber, setAadharCardNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await login({ aadharCardNumber, password });
            setToken(response.token);
            history.push('/'); // Redirect to home after successful login
        } catch (err) {
            setError('Invalid Aadhar Card Number or Password');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Aadhar Card Number</label>
                    <input
                        type="text"
                        value={aadharCardNumber}
                        onChange={(e) => setAadharCardNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;