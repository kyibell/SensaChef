import './SignupUI.css';
import { useState } from 'react';

function SignupUI() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: 'regular',
    });

    const [signupMessage, setSignupMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setSignupMessage("❌ Passwords do not match");
            return;
        }

        console.log("Sending formData to backend:", formData);


        try {
            // deployment
            const response = await fetch('https://sensachef-backend.onrender.com/create_user', {
            // development
            // const response = await fetch('http://localhost:8000/create_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSignupMessage("✅ Signup successful!");
            } else {
                const error = await response.json();

                if (Array.isArray(error.detail)) {
                    const messages = error.detail.map(err => err.msg).join(', ');
                    setSignupMessage(`❌ Signup failed: ${messages}`);
                } else if (typeof error.detail === 'string') {
                    setSignupMessage(`❌ Signup failed: ${error.detail}`);
                } else {
                    setSignupMessage("❌ Signup failed: Unknown error");
                }
            }
        } catch (err) {
            console.error(err);
            setSignupMessage("❌ Signup failed: Server error");
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <div className="signup-title">
                    <h1 className='signup-title-h1'>Sign Up</h1>
                </div>
                <hr className='signup-hr'/>

                <div className="signup-FirstName">
                    <h2>First Name:</h2>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Enter your Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="signup-LastName">
                    <h2>Last Name:</h2>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Enter your Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="signup-UserName">
                    <h2>Username:</h2>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your desired username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="signup-Email">
                    <h2>Email:</h2>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your Email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="signup-Password">
                    <h2>Password:</h2>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter a Password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="signup-Password-confirm">
                    <h2>Confirm Password:</h2>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="signup-UserType">
                    <h2 className="signup-label-modern">Sign up as:</h2>
                    <div>
                        <input
                            type="radio"
                            id="regularUser"
                            name="userType"
                            value="regular"
                            onChange={handleInputChange}
                            checked={formData.userType === 'regular'}
                        />
                        <label htmlFor="regularUser">Regular User</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="helper"
                            name="userType"
                            value="helper"
                            onChange={handleInputChange}
                            checked={formData.userType === 'helper'}
                        />
                        <label htmlFor="helper">Helper / Volunteer</label>
                    </div>
                </div>

                <div className="signup-enter-button">
                    <button onClick={handleSubmit}>Sign Up</button>
                </div>

                {signupMessage && (
                    <div className="signup-message">
                        <p>{signupMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SignupUI;
