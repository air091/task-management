import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios";
import Header from "../components/signup-components/Header";
import "../components/signup-components/signup.style.css";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isUsernameRight, setIsUsernameRight] = useState({
        status: false,
        message: ""
    });
    const [isEmailRight, setIsEmailRight] = useState({
        status: false,
        message: ""
    });
    const [isPasswordRight, setIsPasswordRight] = useState({
        status: false,
        message: ""
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (username === "") setIsUsernameRight({ status: false, message: "Username is required" });
        if (email === "") setIsEmailRight({ status: false, message: "Email is required" });
        if (password === "") setIsPasswordRight({ status: false, message: "Password is required" });

        if (isUsernameRight.status && isEmailRight.status && isPasswordRight.status) {
            try {
                await axios.post("http://localhost:5500/api/user/signup", {
                    username: username,
                    email: email,
                    password: password
                });

                setUsername("");
                setEmail("");
                setPassword("");
            } catch (error) {
                console.log("error:", error.response.data.message);
            }
        }
    }

    const handleOnChangeUsername = (event) => {
        const value = event.target.value;
        setUsername(value);

        if (value.length === 0) return setIsUsernameRight({ status: false, message: "Username is required" });
        if (/\s/.test(value)) return setIsUsernameRight({ status: false, message: "Username should not contain spaces" });
        if (value.trim().length < 6) return setIsUsernameRight({ status: false, message: "Must be at least 6 characters" });
        return setIsUsernameRight({ status: true, message: "" });
    }
    const handleOnChangeEmail = (event) => {
        const value = event.target.value;
        setEmail(value);

        if (value.length === 0) return setIsEmailRight({ status: false, message: "Email is required" });
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setIsEmailRight({ status: false, message: "Email is invalid" });
        return setIsEmailRight({ status: true, message: "" });
    }
    const handleOnChangePassword = (event) => {
        const value = event.target.value;
        setPassword(value);

        if (value.length === 0) return setIsPasswordRight({ status: false, message: "Password is required" });
        if (/\s/.test(value)) return setIsPasswordRight({ status: false, message: "Password must not contain spaces" });
        if (value.trim().length < 8) return setIsPasswordRight({ status: false, message: "Password must be at least 8 characters" });
        return setIsPasswordRight({ status: true, message: "" });
    }

    return (
        <div className="signup__container">
            <div className="signup__wrapper">
                <Header />
                <form className="signup__form">
                    <div className="input__container">
                        <label htmlFor="username">Username</label>
                        <div className="input__wrapper">
                            <FaRegUser className="user__icon" size={20} />
                            <input id="username" type="text" value={username} onChange={handleOnChangeUsername} autoComplete="off" required />
                        </div>
                        {!isUsernameRight.status && (
                            <div className="error">
                                <p>{isUsernameRight.message}</p>
                            </div>
                        )}
                    </div>
                    <div className="input__container">
                        <label htmlFor="email">Email</label>
                        <div className="input__wrapper">
                            <MdOutlineEmail className="user__icon" size={20} />
                            <input id="email" type="email" value={email} onChange={handleOnChangeEmail} autoComplete="off" required />
                        </div>
                        {!isEmailRight.status && (
                            <div className="error">
                                <p>{isEmailRight.message}</p>
                            </div>
                        )}
                    </div>
                    <div className="input__container">
                        <label htmlFor="password">Password</label>
                        <div className="input__wrapper">
                            <MdOutlineLock className="user__icon" size={20} />
                            <input id="password" type="password" value={password} onChange={handleOnChangePassword} autoComplete="off" required />
                        </div>
                        {!isPasswordRight.status && (
                            <div className="error">
                                <p>{isPasswordRight.message}</p>
                            </div>
                        )}
                    </div>
                    <div className="agreement__wrapper">
                        <p>By clicking on Sign up, you agree to TaMa's <Link to={"/terms-and-conditions"}>Terms and Conditions of Use</Link>.</p>
                        <p>To learn more about how TaMa collects, uses, shares and protects your personal data please read
                            TaMa's <Link to={"/privacy-policy"}>Privacy Policy</Link>.
                        </p>
                    </div>
                    <button className="submit__btn" onClick={handleSubmit}>Sign up</button>
                    <div>Already have an account? <Link to={"/signin"}>Click here</Link></div>
                </form>
            </div>
        </div>
    )
}

export default Signup