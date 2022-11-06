import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,18}$/;

const SignIn = () => {
    const [emailLogin, setEmailLogin] = useState('');
    const [emailLoginValid, setEmailLoginValid] = useState(false);
    const [emailLoginFocus, setEmailLoginFocus] = useState(false);

    const [pwdLogin, setPwdLogin] = useState('');
    const [pwdLoginValid, setPwdLoginValid] = useState(false);
    const [pwdLoginFocus, setPwdLoginFocus] = useState(false);

    useEffect ( () => {
        const res =EMAIL_REGEX.test(emailLogin);
        setEmailLoginValid(res);
    }, [emailLogin]);

    useEffect ( ()  => {
        const res = PWD_REGEX.test(pwdLogin);
        setPwdLoginValid(res);
    }, [pwdLogin]);

    return (
        <section>
            <form>
                <h1> Sign In </h1>
                <div className="input">
                    <label>Email Address: </label>
                    <span className={emailLoginFocus && emailLoginValid ? "showMark" : "hideMark"}> 
                        <FontAwesomeIcon icon={faCheck}/> 
                    </span>
                    <span className={emailLoginFocus && emailLogin.length > 0 && emailLoginValid === false ? "showMark" : "hideMark"}> 
                        <FontAwesomeIcon icon={faTimes}/> 
                    </span>
                    <input
                        required
                        autoComplete="off"
                        type="text"
                        id="emailAddressLogin"
                        onChange={(e) => setEmailLogin(e.target.value)}
                        onFocus = {() => setEmailLoginFocus(true)}
                        onBlur = {() => setEmailLoginFocus(false)}
                    />
                    <p className={emailLoginFocus && emailLogin.length > 0 && emailLoginValid === false ? "showInstruction" : "hideInstruction"}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        Email address is invalid.
                    </p>
                </div>

                <div className="input">
                    <label>Password: </label>
                    <span className={pwdLoginFocus && pwdLoginValid ? "showMark" : "hideMark"}> 
                        <FontAwesomeIcon icon={faCheck}/> 
                    </span>
                    <span className={pwdLoginFocus && pwdLogin.length > 0 && pwdLoginValid === false ? "showMark" : "hideMark"}> 
                        <FontAwesomeIcon icon={faTimes}/> 
                    </span>
                    <input
                        required
                        type="password"
                        autoComplete="off"
                        id="passwordLogin"
                        onChange={(e) => setPwdLogin(e.target.value)}
                        onFocus = {() => setPwdLoginFocus(true)}
                        onBlur = {() => setPwdLoginFocus(false)}
                    />
                    <p className={pwdLoginFocus && pwdLogin.length > 0  && pwdLoginValid === false ? "showInstruction" : "hideInstruction"}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                                6 to 20 characters. <br/>
                                Must include uppercase and lowercase letters, a number and a special character.<br/>
                                Allowed special characters: !, @, #, $, %
                    </p>
                </div>

                <button disabled={emailLoginValid && pwdLoginValid ? false : true}> Login </button>
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