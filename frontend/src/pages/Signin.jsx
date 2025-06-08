import Header from "../components/singin-components/Header";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineLock } from "react-icons/md";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signin = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [isCredentialsRight, setIsCredentialsRight] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:5500/api/user/signin", {
                usernameOrEmail: credentials.username,
                password: credentials.password
            });
            setIsCredentialsRight(true);
            console.log("log in", response);
        } catch (error) {
            console.log("Error:", error);
            setIsCredentialsRight(false);
            console.log(error.response.data.message);
        }
        setCredentials({ username: "", password: "" });
    }

    return (
        <div className="signin__container">
            <div className="signin__wrapper">
                <Header />
                <form className="signin__form">
                    {!isCredentialsRight && (
                        <div className="error">
                            <p>
                                Invalid username or password
                            </p>
                        </div>
                    )}
                    <div className="input__container">
                        <label htmlFor="username">Username</label>
                        <div className="input__wrapper">
                            <FaRegUser className="user__icon" size={20} />
                            <input id="username" type="text" value={credentials.username} onChange={(event) => setCredentials({ username: event.target.value, password: credentials.password })} autoComplete="off" required />
                        </div>
                    </div>
                    <div className="input__container">
                        <label htmlFor="password">Password</label>
                        <div className="input__wrapper">
                            <MdOutlineLock className="user__icon" size={20} />
                            <input id="password" type="password" autoComplete="off" value={credentials.password} onChange={(event) => setCredentials({ username: credentials.username, password: event.target.value })} required />
                        </div>
                    </div>
                    <button className="submit__btn" onClick={handleSubmit}>Sign in</button>
                    <div>Don't have an account? <Link to={"/signup"}>Click here</Link></div>
                </form>
            </div>
        </div>

    )
}

export default Signin