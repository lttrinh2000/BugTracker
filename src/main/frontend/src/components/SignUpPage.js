import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,18}$/;

const SignUp = () => {
    const emailRef = useRef();
    const errRef = useRef();

    const [emailAddress, setEmailAddress] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    // Check if the form is successfully submited
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect( () => {
        emailRef.current.focus();
    }, []);

    // Validate email address
    useEffect( () => {
        const res = EMAIL_REGEX.test(emailAddress);
        setValidEmail(res);
    }, [emailAddress]);

    // Validate password and matching password
    useEffect( () => {
        const res = PWD_REGEX.test(pwd);
        setValidPwd(res);
        const match = (pwd === matchPwd);
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect( () => {
        setErrMsg('');
    }, [emailAddress, pwd, matchPwd]);

    const submitFunction = async (e) => {
        e.preventDefault();
        
        // Prevent JS hack
        const v1 = EMAIL_REGEX.test(emailAddress);
        const v2 = PWD_REGEX.test(pwd);
        if (v1 === false || v2 === false) {
            setErrMsg("Invalid entry");
            return;
        }
        /*console.log("Sign up successfully: " + emailAddress + " " + pwd);
        setSuccess(true);*/

        try {
            const response = await axios.post("http://localhost:3001/registered", {
                email: emailAddress,
                password: pwd
            });
            console.log(response.data);
            console.log(JSON.stringify(response));
            setSuccess(true);

        } catch(err) {
            /*if (!err?.response) {
                setErrMsg('No server response');
            } else if (err.response?.status === 409) {
                setErrMsg("Username taken");
            } else {
                setErrMsg("Sign up failed");
            } */

            errRef.current.focus();
        }
    }

    return (
        <>
        {success === true ? (
            <section>
                <h1>Sign up successfully!</h1>
                <p>
                    <a href="/SignIn">Sign In</a>
                </p>
            </section>
        ) : (
            <section className="registration">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                
                <form>
                    <h1>Sign Up</h1>
                    <div className="input">
                        <label htmlFor="emailAddress"> 
                            Email Address:
                        </label>

                        <span className={validEmail ? "showMark" : "hideMark"} /* Show checkmark icon when valid or nothing when invalid */>
                            <FontAwesomeIcon icon={faCheck}/>
                        </span>

                        <span className={validEmail || !emailAddress ? "hideMark" : "showMark"} /* If emailAddress is valid or emailAddress is empty then hide the x mark */>
                            <FontAwesomeIcon icon={faTimes}/>
                        </span>

                        <input
                            type="text"
                            id="emailAddress"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmailAddress(e.target.value)}
                            required
                            // Set to true mean value is invalid and false mean value is valid
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uid"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />

                        <p id="uid" className={emailAddress.length > 0 && !validEmail ? "showInstruction" : "hideInstruction"}
                            // If emailFocus is True and the state of emailAddress exist and the emailAddress is invalid
                            //  then show instruction otherwise hide the instruction
                        >
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            Email address is invalid.
                        </p>
                    </div>

                    <div className="input">
                        <label htmlFor="password"> 
                            Password:
                        </label>
                        
                        <span className={validPwd && pwd.length > 0 ? "showMark" : "hideMark"}>
                            <FontAwesomeIcon icon={faCheck}/>
                        </span>

                        <span className={validPwd || pwd.length === 0 ? "hideMark" : "showMark"}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </span>

                        <input 
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        
                        <p id="pwdnote" className={pwd.length > 0 && !validPwd ? "showInstruction" : "hideInstruction"}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            6 to 20 characters. <br/>
                            Must include uppercase and lowercase letters, a number and a special character.<br/>
                            Allowed special characters: !, @, #, $, %
                        </p>
                    </div>

                    <div className="input">
                        <label htmlFor="matchPassword"> 
                            Confirm Password:
                        </label>
                        
                        <span className={ pwd.length > 0 && matchPwd.length > 0 && validMatch ? "showMark" : "hideMark"}>
                            <FontAwesomeIcon icon={faCheck}/>
                        </span>

                        <span className={validMatch || matchPwd.length === 0 ? "hideMark" : "showMark"}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </span>

                        <input 
                            type="password"
                            id="password"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="matchpwdnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        
                        <p id="matchpwdnote" className={!validMatch ? "showInstruction" : "hideInstruction"}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            Password doesn't match
                        </p>
                    </div>

                    <button onClick={submitFunction} disabled={ (validEmail === false || validPwd === false || validMatch === false) ? true : false}>
                        Submit
                    </button>

                    <p> Already registered? <br/>
                        <span>
                            <a href="/SignIn">Sign In</a>
                        </span>
                    </p>
                </form>
            </section> 
        )}
        </>
    )
}

export default SignUp;