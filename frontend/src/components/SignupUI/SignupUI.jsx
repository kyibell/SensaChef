import './SignupUI.css';

function SignupUI() {
    return(
        <div className="signup-page">
            <div className="signup-container">
                <div className="signup-title">
                    <h1 className='signup-title-h1'>Sign Up</h1>
                </div>
                <hr className='signup-hr'/>
                <div className="signup-FirstName">
                    <h2>First Name:</h2>
                    <input type="text" placeholder='Enter your Name' />
                </div>
                <div className="signup-LastName">
                    <h2>Last Name:</h2>
                    <input type="text" placeholder='Enter your Last Name' />
                </div>
                <div className="signup-Email">
                    <h2>Enter your Email:</h2>
                    <input type="email" placeholder='Enter your Email'/>
                </div>
                <div className="signup-Password">
                    <h2>Enter a Password:</h2>
                    <input type="password" placeholder='Enter a Password' />
                </div>
                <div className="signup-Password-confirm">
                    <h2>Confirm your Password:</h2>
                    <input type="password" placeholder='Confirm Password'/>
                </div>
                <div className="signup-enter-button">
                    <button>Sign Up</button>
                </div>
            </div>
        </div>
    );
}

export default SignupUI