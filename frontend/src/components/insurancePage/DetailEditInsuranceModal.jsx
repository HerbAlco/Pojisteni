import React, { useEffect, useState } from "react";

const DetailEditInsuranceModal = ({ insuranceId, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        amount: "",
        insuranceItem: "",
        validFrom: "",
        validTo: "",
        userId: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");


    useEffect(() => {
        const fetchInsurance = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/insurances/${insuranceId}`,
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );
                if (!response.ok) {
                    throw new Error("Chyba při načítání pojištění.");
                }
                const data = await response.json();
                setFormData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchInsurance();
    }, [insuranceId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleValidation = () => {
        const today = new Date().toISOString().split("T")[0];

        if (formData.validFrom && formData.validTo) {
            if (formData.validFrom > formData.validTo) {
                return "Datum 'Platnost od' nemůže být později než 'Platnost do'.";
            }
            if (formData.validTo < today) {
                return "Datum 'Platnost do' nemůže být v minulosti.";
            }
        }
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = handleValidation();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/insurances/${insuranceId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Chyba při ukládání změn.");
            }

            onClose();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }} aria-hidden="false">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" style={{ borderRadius: "15px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }}>
                    <div className="modal-header" style={{ borderBottom: "2px solid #ddd" }}>
                        <h5 className="modal-title" style={{ fontWeight: "bold" }}>Editace pojištění</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body" style={{ padding: "30px 40px" }}>
                        {loading ? (
                            <p>Načítání...</p>
                        ) : (
                            <form onSubmit={handleSubmit} className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Název</label>
                                        <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Pojištěná položka</label>
                                        <input type="text" name="insuranceItem" className="form-control" value={formData.insuranceItem} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Platnost do</label>
                                        <input type="date" name="validTo" className="form-control" value={formData.validTo} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Částka</label>
                                        <input type="number" name="amount" className="form-control" value={formData.amount} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Platnost od</label>
                                        <input type="date" name="validFrom" className="form-control" value={formData.validFrom} onChange={handleChange} required />
                                    </div>
                                </div>

                                {error && <div className="alert alert-danger">{error}</div>}

                                <div className="text-center" style={{ marginTop: "20px" }}>
                                    <button type="submit" className="btn btn-primary">Uložit změny</button>
                                    <button type="button" className="btn btn-secondary" onClick={onClose} style={{ marginLeft: "10px" }}>Zrušit</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailEditInsuranceModal;
