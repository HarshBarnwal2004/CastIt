import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signup } from '../api/index';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        mobile: '',
        aadharCardNumber: '',
        password: ''
    });
    const [error, setError] = useState('');
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signup(formData);
            if (response.token) {
                localStorage.setItem('token', response.token);
                history.push('/'); // Redirect to home after signup
            }
        } catch (err) {
            setError(err.response.data.error || 'Signup failed');
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input type="text" name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} />
                <input type="text" name="aadharCardNumber" placeholder="Aadhar Card Number" value={formData.aadharCardNumber} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;