import React from "react";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState("");
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const savedRole = localStorage.getItem("role");
        const savedUserId = localStorage.getItem("userId");

        if (token && savedRole && savedUserId) {
            setIsAuthenticated(true);
            setRole(savedRole);
            setUserId(savedUserId);
        }
    }, []);

    const handleLogin = (userRole, userId) => {
        setIsAuthenticated(true);
        setRole(userRole);
        setUserId(userId);

        localStorage.setItem("role", userRole);

    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");


        setIsAuthenticated(false);
        setRole("");
        setUserId(null);
        navigate("/");
    };

    const handleUserProfile = () => {
        if (userId) {
            navigate(`/insured-detail/${userId}`);
        }
    };

    return (
        <header className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <div className="container">
                <a className="navbar-brand" href="/">Pojišťovna</a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto">
                        {isAuthenticated && role === "ROLE_ADMIN" && (
                            <>
                                <li className="nav-item"><a className="nav-link" href="/insured">Pojištěnci</a></li>
                                <li className="nav-item"><a className="nav-link" href="/all-insurances">Pojištění</a></li>
                            </>
                        )}
                        {isAuthenticated && role === "ROLE_USER" && (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={handleUserProfile}>Můj profil</a>
                                </li>
                            </>
                        )}
                        <li className="nav-item"><a className="nav-link" href="#udalosti">Události</a></li>
                        <li className="nav-item"><a className="nav-link" href="#o-aplikaci">O aplikaci</a></li>
                    </ul>
                    <div className="d-flex">
                        {isAuthenticated ? (
                            <button className="btn btn-danger" onClick={handleLogout}>Odhlásit se</button>
                        ) : (
                            <>
                                <LoginModal onLogin={handleLogin} />
                                <RegisterModal />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
