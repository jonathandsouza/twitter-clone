import "../styles/Login.css";

import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { SignupModal, LoginModal, Feed, Links, Signup } from "../components";

const Login = () => {
    const user = useSelector((state) => state.auth.user);

    const [signupModal, setSignupModal] = useState(false);
    const [loginModal, setLoginModal] = useState(false);

    const openSignupModal = () => setSignupModal(true);
    const closeSignupModal = () => setSignupModal(false);

    const openLoginModal = () => setLoginModal(true);
    const closeLoginModal = () => setLoginModal(false);

    if (user) {
        return <Navigate to="/home" replace />;
    }

    return (
        <main>
            <SignupModal isOpen={signupModal} closeModal={closeSignupModal} />
            <LoginModal isOpen={loginModal} closeModal={closeLoginModal} />

            <div className="column" id="general">
                <header>
                    <h1>Explore</h1>
                </header>

                <Feed />
            </div>

            <div className="column" id="widgets">
                <div className="sticky-wrapper">
                    <Signup openModal={openSignupModal} />
                    <Links />
                </div>
            </div>

            <div className="footer-login">
                <div className="footer_text">
                    <h2>Don't miss what's happening</h2>
                    <p>People on Twitter are the first to know.</p>
                </div>
                <div className="footer_btns">
                    <button className="login" onClick={openLoginModal}>
                        Log In
                    </button>
                    <button className="white-btn signup" onClick={openSignupModal}>
                        Sign up
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Login;
