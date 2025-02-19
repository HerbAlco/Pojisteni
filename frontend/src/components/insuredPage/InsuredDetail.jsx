import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useParams, useNavigate } from "react-router-dom";
import avatarImage from '../../assets/avatar.png';
import ViewInsuranceTable from "../insurancePage/ViewInsuranceTable";
import EditInsuredModal from "../modals/EditInsuredModal";

const InsuredDetail = () => {
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [insured, setInsured] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const fetchInsuredData = async () => {
        console.log("UserId :", userId);

        try {
            const response = await fetch(`http://localhost:8080/api/users/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
            if (!response.ok) {
                const errorMessage = await response.text();
                console.error("Server error:", errorMessage);
                throw new Error("Chyba při načítání dat");
            }
            const data = await response.json();
            setInsured(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!id) {
            setError("ID je povinné.");
            setLoading(false);
            return;
        }

        fetchInsuredData();
    }, [id]);

    const handleAddInsurance = () => {
        navigate(`/add-insurance/${id}`);
    };

    const handleEditInsured = (id) => {
        setSelectedUserId(id);
    };

    const handleDeleteInsured = () => {
        if (window.confirm("Opravu chcete odstranit tohoto pojištěnce?")) {
            fetch(`http://localhost:8080/api/users/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
                .then((response) => {
                    if (response.ok) {
                        navigate('/insured');
                    } else {
                        console.error('Chyba při odstraňování pojištěnce');
                    }
                })
                .catch((error) => console.error('Chyba při odstraňování pojištěnce:', error));
        }
    };

    const handleCloseModal = () => {
        setSelectedUserId(null);
    };

    if (loading) {
        return <div>Načítám data...</div>;
    }

    if (error) {
        return <div>Chyba: {error}</div>;
    }

    if (!insured) {
        return <div>Pojištěnec nenalezen.</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="text mb-4">Detail pojištěnce</h2>
            <div className="row">
                <div className="col-md-4 d-flex justify-content-center align-items-center mb-4 mb-md-0">
                    <img
                        src={avatarImage}
                        alt="Pojištěnec"
                        className="img-fluid rounded-circle"
                        style={{ width: '150px', height: '150px' }}
                    />
                </div>
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-12 col-md-6 mb-3">
                            <div className="form-group">
                                <label className="fw-bold">Jméno:</label>
                                <p>{insured.firstname} {insured.lastname}</p>
                            </div>

                            <div className="form-group">
                                <label className="fw-bold">Ulice a číslo popisné:</label>
                                <p>{insured.street}</p>
                            </div>

                            <div className="form-group">
                                <label className="fw-bold">Město:</label>
                                <p>{insured.city}</p>
                            </div>

                            <div className="form-group">
                                <label className="fw-bold">PSČ:</label>
                                <p>{insured.postCode}</p>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label className="fw-bold">Datum narození:</label>
                                <p>{new Date(insured.birthDate).toLocaleDateString()}</p>
                            </div>

                            <div className="form-group">
                                <label className="fw-bold">Email:</label>
                                <p>{insured.email}</p>
                            </div>

                            <div className="form-group">
                                <label className="fw-bold">Telefonní číslo:</label>
                                <p>{insured.phoneNumber}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="text mb-4 mt-5">Sjednané pojištění</h2>
            <ViewInsuranceTable />
            {role === "ROLE_ADMIN" && (
                <div className="d-flex justify-content-center fixed-bottom pb-2 bg-light shadow">
                    <button className="btn btn-success mt-2" onClick={handleAddInsurance}>
                        Přidat pojištění
                    </button>
                    <button className="btn btn-warning mt-2 ms-2" onClick={() => handleEditInsured(insured.id)}>
                        Upravit pojištěnce
                    </button>
                    <button className="btn btn-danger mt-2 ms-2" onClick={handleDeleteInsured}>
                        Odstranit pojištěnce
                    </button>
                </div>
            )}
            {selectedUserId && <EditInsuredModal userId={selectedUserId} onClose={handleCloseModal} />}
        </div>
    );
};

export default InsuredDetail;
