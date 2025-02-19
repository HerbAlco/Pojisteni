import React, { useEffect, useState } from "react";

const EditInsuredModal = ({ userId, onClose }) => {
    const token = localStorage.getItem("token");
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        birthDate: "",
        email: "",
        phoneNumber: "",
        street: "",
        houseNumber: "",
        city: "",
        postCode: ""
    });

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:8080/api/users/${userId}`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    setFormData({
                        firstname: data.firstname || "",
                        lastname: data.lastname || "",
                        birthDate: data.birthDate || "",
                        email: data.email || "",
                        phoneNumber: data.phoneNumber || "",
                        street: data.street || "",
                        houseNumber: data.houseNumber || "",
                        city: data.city || "",
                        postCode: data.postCode || ""
                    });
                })
                .catch((error) => console.error("Error loading user data:", error));
        }
    }, [userId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/api/users/${userId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then((response) => {
                if (response.ok) {
                    alert("Uživatel byl úspěšně upraven.");
                    onClose();
                } else {
                    console.error("Chyba při úpravě uživatele");
                }
            })
            .catch((error) => console.error("Error updating user:", error));
    };

    const handleClose = () => {
        setFormData({
            firstname: "",
            lastname: "",
            birthDate: "",
            email: "",
            phoneNumber: "",
            street: "",
            houseNumber: "",
            city: "",
            postCode: ""
        });
        onClose();
    };


    return (
        <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            aria-hidden="false"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" style={{ borderRadius: "15px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }}>
                    <div className="modal-header" style={{ borderBottom: "2px solid #ddd" }}>
                        <h5 className="modal-title" style={{ fontWeight: "bold" }}>Upravit uživatele</h5>
                        <button type="button" className="btn-close" onClick={handleClose} style={{ border: "none", background: "transparent" }}></button>
                    </div>
                    <div className="modal-body" style={{ padding: "30px 40px" }}>
                        <form onSubmit={handleSubmit} className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Jméno</label>
                                    <input
                                        type="text"
                                        name="firstname"
                                        className="form-control"
                                        value={formData.firstname}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: "8px", padding: "10px" }}
                                        tabIndex="1"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Datum narození</label>
                                    <input
                                        type="date"
                                        name="birthDate"
                                        className="form-control"
                                        value={formData.birthDate}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: "8px", padding: "10px" }}
                                        tabIndex="3"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Telefonní číslo</label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        className="form-control"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: "8px", padding: "10px" }}
                                        tabIndex="5"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Ulice a číslo popisné</label>
                                    <input
                                        type="text"
                                        name="street"
                                        className="form-control"
                                        value={formData.street}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: "8px", padding: "10px" }}
                                        tabIndex="7"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Příjmení</label>
                                    <input
                                        type="text"
                                        name="lastname"
                                        className="form-control"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: "8px", padding: "10px" }}
                                        tabIndex="2"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: "8px", padding: "10px" }}
                                        tabIndex="4"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Město</label>
                                    <input
                                        type="text"
                                        name="city"
                                        className="form-control"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: "8px", padding: "10px" }}
                                        tabIndex="6"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">PSČ</label>
                                    <input
                                        type="text"
                                        name="postCode"
                                        className="form-control"
                                        value={formData.postCode}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: "8px", padding: "10px" }}
                                        tabIndex="8"
                                    />
                                </div>
                            </div>
                            <div className="text-center" style={{ marginTop: "20px" }}>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    style={{
                                        backgroundColor: "#007bff",
                                        borderColor: "#007bff",
                                        padding: "12px 20px",
                                        borderRadius: "8px",
                                        fontWeight: "bold",
                                        fontSize: "16px"
                                    }}
                                >
                                    Uložit změny
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleClose}
                                    style={{
                                        backgroundColor: "#6c757d",
                                        borderColor: "#6c757d",
                                        padding: "12px 20px",
                                        borderRadius: "8px",
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        marginLeft: "10px"
                                    }}
                                >
                                    Zrušit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditInsuredModal;
