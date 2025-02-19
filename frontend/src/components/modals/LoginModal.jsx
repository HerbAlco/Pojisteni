import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ onLogin }) => {
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleOpen = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false);
        setUsername("");
        setPassword("");
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/authenticate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error("Neplatné přihlašovací údaje!");
            }

            const data = await response.json();
            
            localStorage.setItem("token", data.token);
            console.log("userId:", data.userId);
            localStorage.setItem("userId", data.userId); 
            console.log("userId:", localStorage.getItem("userId"));

            let userRole = "ROLE_USER";
            if (data.admin && data.admin.length > 0) {
                userRole = data.admin[0].authority;
            }

            localStorage.setItem("role", userRole);

            if (onLogin) onLogin(userRole);
            handleClose();

            // Přesměrování na základě role
            if (userRole === "ROLE_ADMIN") {
                navigate("/insured");
            } else if (userRole === "ROLE_USER") {
                const userId = data.userId;  // Získání userId z data
                navigate(`/insured-detail/${userId}`);  // Přesměrování na správnou stránku
            }

        } catch (error) {
            setError("Neplatné přihlašovací údaje!");
        }
    };



    return (
        <>
            <button className="btn btn-primary" onClick={handleOpen}>Přihlásit se</button>
            {showModal && (
                <div className="modal fade show" tabIndex={-1} aria-hidden="false" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content" style={{ borderRadius: "15px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }}>
                            <div className="modal-header" style={{ borderBottom: "2px solid #ddd" }}>
                                <h5 className="modal-title" style={{ fontWeight: "bold" }}>Přihlásit se</h5>
                                <button type="button" className="btn-close" onClick={handleClose} aria-label="Zavřít"></button>
                            </div>
                            <div className="modal-body" style={{ padding: "30px 40px" }}>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="text" className="form-label">Email:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Heslo:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">Přihlásit se</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoginModal;
