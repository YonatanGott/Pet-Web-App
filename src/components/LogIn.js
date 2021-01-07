import React, { useRef, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "../lib/api";
import { UserContext } from "../contexts/UserContext";

const LogIn = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [error, setError] = useState("");
    const { handleUserLogin } = useContext(UserContext)

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        try {
            setLoading(true);
            let user = {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            }
            const loggedId = await loginUser(user);
            handleUserLogin(loggedId);
            history.push("/Home");
        } catch {
            setError("Failed to Log In");
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
                    <div className="input-field col s12">
                        <input name="login-email" type="email" ref={emailRef} required />
                        <label htmlFor="login-email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input name="login-password" type="password" ref={passwordRef} required />
                        <label htmlFor="login-password">Password</label>
                    </div>
                </div>
                <div className="btn-sign">
                    <button disabled={loading} className="btn" type="submit">
                        <span className="btn__content">Log In</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
export default LogIn;