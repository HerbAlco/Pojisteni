import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailEditInsuranceModal from './DetailEditInsuranceModal';

const ViewInsuranceTable = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const [insurances, setInsurances] = useState([]);
    const [selectedInsuranceId, setSelectedInsuranceId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [insurancesPerPage] = useState(5);
    const { id } = useParams();

    useEffect(() => {
        const url = id
            ? `http://localhost:8080/api/users/${id}`
            : 'http://localhost:8080/api/insurances';

        fetch(url,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log("Received data:", data);
                const insuranceList = id ? data.insurances || [] : data;
                setInsurances(insuranceList);
            })
            .catch((error) => console.error('Error fetching insurances:', error));
    }, [id]);

    const handleEdit = (insuranceId) => {
        setSelectedInsuranceId(insuranceId);
    };

    const handleCloseModal = () => {
        setSelectedInsuranceId(null);
    };

    const handleDelete = (insuranceId) => {
        const confirmDelete = window.confirm("Opravu chcete odstranit toto pojištění?");

        if (confirmDelete) {
            console.log('Delete insurance with ID:', insuranceId);
            fetch(`http://localhost:8080/api/insurances/${insuranceId}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
                .then((response) => {
                    if (response.ok) {
                        setInsurances((prevState) =>
                            prevState.filter((insurance) => insurance.id !== insuranceId)
                        );
                    } else {
                        console.error('Error deleting insurance');
                    }
                })
                .catch((error) => console.error('Error deleting insurance:', error));
        } else {
            console.log("Odstranění pojištění bylo zrušeno.");
        }
    };


    const indexOfLastInsurance = currentPage * insurancesPerPage;
    const indexOfFirstInsurance = indexOfLastInsurance - insurancesPerPage;
    const currentInsurances = insurances.slice(indexOfFirstInsurance, indexOfLastInsurance);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-4 mb-5">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Název pojištění</th>
                        <th>Cena</th>
                        {role === "ROLE_ADMIN" && (
                            <th>Akce</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {currentInsurances.length > 0 ? (
                        currentInsurances.map((insurance) => (
                            <tr key={insurance.id}>
                                <td>{insurance.name}</td>
                                <td>{insurance.amount} Kč</td>
                                {role === "ROLE_ADMIN" && (
                                    <td>
                                        <button
                                            className="btn btn-warning me-2"
                                            onClick={() => handleEdit(insurance.id)}
                                        >
                                            Upravit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(insurance.id)}
                                        >
                                            Odstranit
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">
                                Žádná pojištění nenalezena.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="d-flex justify-content-center">
                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => paginate(currentPage - 1)} aria-disabled={currentPage === 1}>
                                Předchozí
                            </button>
                        </li>
                        {[...Array(Math.ceil(insurances.length / insurancesPerPage))].map((_, index) => (
                            <li key={index} className={`page-item ${index + 1 === currentPage ? "active" : ""}`}>
                                <button
                                    className="page-link"
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === Math.ceil(insurances.length / insurancesPerPage) ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => paginate(currentPage + 1)} aria-disabled={currentPage === Math.ceil(insurances.length / insurancesPerPage)}>
                                Další
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {selectedInsuranceId && <DetailEditInsuranceModal insuranceId={selectedInsuranceId} onClose={handleCloseModal} />}
        </div>
    );
};

export default ViewInsuranceTable;
