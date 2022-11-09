import React, {useState} from "react";
import axios from "axios";

const SignIn = () => {
    const [emailLogin, setEmailLogin] = useState('');
    const [pwdLogin, setPwdLogin] = useState('');
    const [signInStatus, setSignInStatus] = useState('');

    const loginFunction = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/SignIn', 
            {
                email: emailLogin,
                password: pwdLogin
            });
            
            if (response.data.length > 0) {
                console.log(response.data);
                setSignInStatus("Login Successful!");
                window.location.href = '/imageupload';
            }
            else {
                setSignInStatus(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section>
            <form>
                <h1> Sign In </h1>
                <div className="input">
                    <label>Email Address: </label>
                    <input
                        required
                        autoComplete="off"
                        type="text"
                        id="emailAddressLogin"
                        onChange={(e) => setEmailLogin(e.target.value)}
                    />
                </div>

                <div className="input">
                    <label>Password: </label>
                    <input
                        required
                        type="password"
                        autoComplete="off"
                        id="passwordLogin"
                        onChange={(e) => setPwdLogin(e.target.value)}
                    />
                </div>

                <button onClick={loginFunction} disabled={emailLogin.length > 0 && pwdLogin.length > 0 ? false : true}> Login </button>
                
                <p>{signInStatus}</p>
                
                <p>Don't have an account? <br/>
                    <span>
                        <a href="/">Sign Up</a>
                    </span>
                </p>
            </form>
            
        </section>
    );

};

export default SignIn;