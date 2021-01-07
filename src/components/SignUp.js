import React, { useRef, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { signUpUser } from '../lib/api';
import { UserContext } from "../contexts/UserContext";


const SignUp = () => {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const phoneRef = useRef();
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [error, setError] = useState("");
    const { handleUserId } = useContext(UserContext)

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        if (passwordRef.current.value.length < 6) {
            return setError("Password must be at least 6 characters long");
        }
        else if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }
        try {
            setLoading(true);
            let user = {
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                phone: phoneRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            }
            console.log(user);
            const newUser = await signUpUser(user);
            handleUserId(newUser);
            console.log(newUser);
            history.push("/Home");
        } catch {
            setError("Failed to create an account");
        }
        setLoading(false);
    }

    return (
        <div className="signup-main row">
            {error && (
                <div className='row'>
                    <div className="col s12 error">
                        <div className="card-panel amber lighten-4">
                            <i className="material-icons">report_problem</i><span className="black-text"> {error} </span>
                        </div>
                    </div>
                </div>
            )}
            <form className="col s12" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="input-field col s12 m6">
                        <input name="signup-first-name" type="text" ref={firstNameRef} />
                        <label htmlFor="signup-first-name">First Name</label>
                    </div>
                    <div className="input-field col s12 m6">
                        <input name="signup-last-name" type="text" ref={lastNameRef} />
                        <label htmlFor="signup-last-name">Last Name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input name="signup-phone" type="number" ref={phoneRef} />
                        <label htmlFor="signup-phone">Phone Number</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input name="signup-email" type="email" ref={emailRef} required />
                        <label htmlFor="signup-email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input name="signup-password" type="password" ref={passwordRef} required />
                        <label htmlFor="signup-password">Password</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input name="signup-con-password" type="password" ref={passwordConfirmRef} required />
                        <label htmlFor="signup-con-password">Password Confirmation</label>
                    </div>
                </div>
                <div className="btn-sign">
                    <button disabled={loading} className="btn" type="submit">
                        <span className="btn__content">Sign Up</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
export default SignUp;