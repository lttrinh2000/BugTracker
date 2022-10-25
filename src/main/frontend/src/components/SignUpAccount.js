import React, { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = new RegExp("^\\w[\\w.]{2,18}\\w$");
const PWD_REGEX = new RegExp("^\\w[\\w.]{2,18}\\w$");

const SignUp = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [userName, setUserName] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

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
        userRef.current.focus();
    }, []);

    // Validate user name
    useEffect( () => {
        const res = USER_REGEX.test(userName);
        console.log(res);
        console.log(userName);
        setValidName(res);
    }, [userName]);

    // Validate password and matching password
    useEffect( () => {
        const res = PWD_REGEX.test(pwd);
        console.log(res);
        console.log(pwd);
        setValidName(res);
        const match = (pwd === matchPwd);
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect( () => {
        setErrMsg('');
    }, [userName, pwd, matchPwd]);

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form>
                <label htmlFor="username"> 
                    Username:
                    

                </label>

                <input 
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    // Set to true mean value is invalid and false mean value is valid
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uid"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />

                <span className={validName ? "valid" : "hide"} /* Show checkmark icon when valid or nothing when invalid */>
                        <FontAwesomeIcon icon={faCheck}/>
                </span>

                <span className={validName || !userName ? "hide" : "invalid"} /* If username is valid or username is empty then hide the x mark */>
                    <FontAwesomeIcon icon={faTimes}/>
                </span>

                <p id="uid" className={userFocus && userName && !validName ? "instruction" : "offscreen"}
                    // If userFocus is True and the state of userName exist and the username is invalid
                    //  then show instruction otherwise hide the instruction
                >
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    4 to 20 characters. <br/>
                    Must begin with a letter. <br/>
                    Only letters and numbers allowed.
                </p>

                <label htmlFor="password"> 
                    Password:
                </label>
                
                <input 
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />

                <span className={validPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                </span>

                <span className={validPwd || !pwd ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
                
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instruction" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    4 to 20 characters. <br/>
                    Must include uppercase and lowercase letters, a number and a special character.<br/>
                    Allowed special characters: !, @, #, $, %
                </p>

            </form>
        </section>
    )
}

export default SignUp;