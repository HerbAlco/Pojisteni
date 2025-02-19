import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import insuranceTypes from "../constants/InsuranceTypes";

const CreateInsuranceForm = () => {
    const token = localStorage.getItem("token");
    const { id } = useParams();
    const [insured, setInsured] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        amount: "",
        insuranceItem: "",
        validFrom: "",
        validTo: "",
        userId: id
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/api/users/${id}`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        )
            .then(response => response.json())
            .then(data => setInsured(data))
            .catch(error => console.error("Chyba při načítání pojištěnce:", error));
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const today = new Date().toISOString().split("T")[0];


        if (formData.validFrom && formData.validTo) {
            if (formData.validFrom > formData.validTo) {
                setError("Datum 'Platnost od' nemůže být později než 'Platnost do'.");
                return;
            }

            if (formData.validTo < today) {
                setError("Datum 'Platnost do' nemůže být v minulosti.");
                return;
            }
        }

        setError("");

        const insuranceData = {
            userId: id,
            ...formData
        };

        try {
            const response = await fetch("http://localhost:8080/api/insurances", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(insuranceData)
            });

            if (response.ok) {
                navigate(`/insured-detail/${id}`);
            } else {
                console.error("Chyba při vytváření pojištění");
            }
        } catch (error) {
            console.error("Chyba při odesílání dat:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Přidat pojištění k {insured ? `${insured.firstname} ${insured.lastname}` : "pojištěnci"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Typ pojištění:</label>
                    <select name="name" className="form-select" value={formData.name} onChange={handleChange} required>
                        <option value="">Vyberte pojištění</option>
                        {insuranceTypes.map((type) => (
                            <option key={type.id} value={type.name}>{type.name}</option>
                        ))}
                    </select>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Částka:</label>
                        <input type="number" name="amount" className="form-control" value={formData.amount} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Předmět pojištění:</label>
                        <input type="text" name="insuranceItem" className="form-control" value={formData.insuranceItem} onChange={handleChange} required />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Platnost od:</label>
                        <input type="date" name="validFrom" className="form-control" value={formData.validFrom} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Platnost do:</label>
                        <input type="date" name="validTo" className="form-control" value={formData.validTo} onChange={handleChange} required />
                    </div>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <button type="submit" className="btn btn-success">Vytvořit pojištění</button>
            </form>
        </div>
    );
};

export default CreateInsuranceForm;
