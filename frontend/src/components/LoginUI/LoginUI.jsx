import './LoginUI.css'
import { useState } from 'react';

function LoginUI() {
    const [formData, setFormData] = useState({
            username: '',
            password: '',
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
        
        console.log("Sending formData to backend:", formData);


        try {
            // deployment
            //const response = await fetch('https://sensachef-backend.onrender.com/create_user', {
            // development
             const response = await fetch('http://localhost:8000/sign_in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const userData = await response.json();
                const accessToken = userData.session.access_token;
                console.log(response)
                console.log(userData)
                console.log(accessToken);
                sessionStorage.setItem('access_token', accessToken);
                const userInfo = await fetch('http://localhost:8000/protected', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                const userInfo1 = await userInfo.json();
                console.log(userInfo1)
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

    return(
        <div className="login-page">
            <div className="login-container">
                <div className="upper-container" >
                    <h1 className="title-text" >Login</h1>
                    <hr />
                </div>
                <div className="middle-container">
                    <h2 className="username-text" >Username:</h2>
                    <input 
                        type="text"
                        name="username" 
                        placeholder="Enter Username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="bottom-container">
                    <h2 className="password-text" >Password:</h2>
                    <input className="password-input" 
                        type="password" 
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleInputChange}
                    /> 
                </div>
                <div className="login-enter-button">
                    <button onClick={handleSubmit}>Login</button>
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

export default LoginUI;