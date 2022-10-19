import { userRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = new RegExp("^\\w[\\w.]{2,18}\\w$");
const PWD_REGEX = new RegExp("^\\w[\\w.]{2,18}\\w$");

const SignUp = () => {
    const userRef = userRef();
    const errRef = userRef();

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
        userRef.focus();
    }, []);

    // Validate user name
    useEffect( () => {
        const res = USER_REGEX.test(userName);
        console.log(res);
        console.log(user);
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
            <p ref={errMsg} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form>
                <label htmlFor="username"> 
                    Username:
                    // Show checkmark icon when valid or nothing when invalid
                    <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    // if username is valid or username is empty then hide the x mark
                    <span className={validName || !userName ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>

                </label>
                <input 
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    // Set to true mean value is invalid and false mean value is valid
                    aria-invalid={validName ? "false" : "true"}
                    aria-decribedby="uid"
                    onFocus={() => setUserForcus(true)}
                    onBlur={() => setUserFocus(false)}
                />

                // If userFocus is True and the state of userName exist and the username is invalid 
                //  then show instruction otherwise hide the instruction
                <p id="uid" className={userFocus && userName && !validName ? "instruction" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    3 to 19 characters. <br />
                    Must begin with a letter, <br/>
                    Only letters and numbers allowed.
                </p>
            </form>
        </section>
    )
}

export default SignUp;