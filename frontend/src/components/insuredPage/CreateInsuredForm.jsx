import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";

const CreateInsuredForm = () => {
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
        postCode: "",
    });

    const [emailError, setEmailError] = useState("");
    const [alertMessage, setAlertMessage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/users", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Pojištěnec úspěšně vytvořen");
                localStorage.setItem("insuredSuccessMessage", "✅ Pojištěnec byl úspěšně přidán!");
                navigate("/insured");
            } else {
                setAlertMessage({ type: "danger", text: "❌ Nepodařilo se vytvořit uživatele." });
                const contentType = response.headers.get("Content-Type");
                let errorData;

                if (contentType && contentType.includes("application/json")) {
                    errorData = await response.json();
                } else {
                    errorData = await response.text();
                }

                setEmailError(errorData);
                console.error("Chyba při vytváření pojištěnce");
            }
        } catch (error) {
            setAlertMessage({ type: "danger", text: "❌ Nepodařilo se vytvořit uživatele." });
            console.error("Chyba připojení k API:", error);
        }
    };



    return (
        <div className="container mt-4">
            {alertMessage && (
                <div className={`alert alert-${alertMessage.type} mt-3`} role="alert">
                    {alertMessage.text}
                </div>
            )}
            <h2>Nový pojištěnec</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <label style={{ marginTop: "10px" }}>Jméno:</label>
                        <input
                            type="text"
                            name="firstname"
                            className="form-control"
                            onChange={handleChange}
                            required
                            tabIndex="1"
                        />

                        <label style={{ marginTop: "10px" }}>Datum narození:</label>
                        <input
                            type="date"
                            name="birthDate"
                            className="form-control"
                            onChange={handleChange}
                            required
                            tabIndex="3"
                        />

                        <label style={{ marginTop: "10px" }}>Telefon:</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            className="form-control"
                            onChange={handleChange}
                            required
                            tabIndex="5"
                        />

                        <label style={{ marginTop: "10px" }}>Ulice a číslo popisné:</label>
                        <input
                            type="text"
                            name="street"
                            className="form-control"
                            onChange={handleChange}
                            required
                            tabIndex="7"
                        />
                    </div>
                    <div className="col-md-6">
                        <label style={{ marginTop: "10px" }}>Příjmení:</label>
                        <input
                            type="text"
                            name="lastname"
                            className="form-control"
                            onChange={handleChange}
                            required
                            tabIndex="2"
                        />

                        <label style={{ marginTop: "10px" }}>Email:</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            onChange={handleChange}
                            required
                            tabIndex="4"
                        />
                        {emailError && (
                            <div className="text-danger" style={{ fontSize: "0.875rem" }}>
                                {emailError}
                            </div>
                        )}

                        <label style={{ marginTop: "10px" }}>Město:</label>
                        <input
                            type="text"
                            name="city"
                            className="form-control"
                            onChange={handleChange}
                            required
                            tabIndex="6"
                        />

                        <label style={{ marginTop: "10px" }}>PSČ:</label>
                        <input
                            type="text"
                            name="postCode"
                            className="form-control"
                            onChange={handleChange}
                            required
                            tabIndex="8"
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3" tabIndex="9">
                    Přidat pojištěnce
                </button>
            </form>
        </div>
    );
};

export default CreateInsuredForm;