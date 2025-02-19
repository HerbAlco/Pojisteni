import React, { useState } from "react";

const RegisterModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleOpen = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Hesla se neshodují.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error("Registrace neproběhla úspěšně.");
            }

            const data = await response.json();
            setSuccess("Úspěšně jste se zaregistrovali!");
            handleClose();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <button className="btn btn-secondary" onClick={handleOpen}>Registrovat se</button>
            {showModal && (
                <div
                    className="modal fade show"
                    id="registerModal"
                    tabIndex="-1"
                    aria-hidden="false"
                    style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content" style={{ borderRadius: "15px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }}>
                            <div className="modal-header" style={{ borderBottom: "2px solid #ddd" }}>
                                <h5 className="modal-title" style={{ fontWeight: "bold" }}>Registrovat se</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleClose}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body" style={{ padding: "30px 40px" }}>
                                {error && <div className="alert alert-danger">{error}</div>}
                                {success && <div className="alert alert-success">{success}</div>}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">Potvrďte heslo:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">Registrovat se</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RegisterModal;
