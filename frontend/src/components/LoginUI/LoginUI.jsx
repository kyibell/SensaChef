import './LoginUI.css'

export default function LoginUI() {

    return(
        <div className="login-page">
            <div className="login-container">
                <div className="upper-container" >
                    <h1 className="title-text" >Login</h1>
                    <hr />
                </div>
                <div className="middle-container">
                    <h2 className="username-text" >Username:</h2>
                    <input type="text" placeholder="Enter Username"/>
                </div>
                <div className="bottom-container">
                    <h2 className="password-text" >Password:</h2>
                    <input className="password-input" type="password" placeholder="Enter Password"/> 
                </div>
                <button>Login</button>
            </div>
        </div>
    );

}
