import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditInsuredModal from "../modals/EditInsuredModal";

const ViewInsuredTable = () => {
    const token = localStorage.getItem("token");
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const navigate = useNavigate();

    const fetchUsers = () => {
        fetch("http://localhost:8080/api/users", 
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        )
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error fetching users:", error));
    };

    useEffect(() => {
        const message = localStorage.getItem("insuredSuccessMessage");
        if (message) {
            setSuccessMessage(message);
            localStorage.removeItem("insuredSuccessMessage");
        }

        fetchUsers();
    }, []);

    const handleEdit = (id) => {
        setSelectedUserId(id);
    };

    const handleDelete = (id) => {
        if (window.confirm("Opravdu chcete odstranit tohoto pojištěnce?")) {
            fetch(`http://localhost:8080/api/users/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
                .then((response) => {
                    if (response.ok) {
                        fetchUsers();
                    } else {
                        console.error("Chyba při odstraňování pojištěnce");
                    }
                })
                .catch((error) => console.error("Chyba při odstraňování pojištěnce:", error));
        }
    };

    const handleView = (id) => {
        navigate(`/insured-detail/${id}`);
    };

    const handleCreateForm = () => {
        navigate("/create-insured");
    };

    const handleCloseModal = () => {
        setSelectedUserId(null);
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-4">
            {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {successMessage}
                    <button type="button" className="btn-close" onClick={() => setSuccessMessage("")}></button>
                </div>
            )}
            <h2 className="text-start">Pojištěnci</h2>
            <div className="d-flex justify-content-center my-3">
                <button className="btn btn-success" onClick={handleCreateForm}>Nový pojištěnec</button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Jméno</th>
                        <th>Email</th>
                        <th>Telefon</th>
                        <th>Akce</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.length > 0 ? (
                        currentUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.firstname + " " + user.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td>
                                    <button className="btn btn-info me-2" onClick={() => handleView(user.id)}>Zobrazit</button>
                                    <button className="btn btn-warning me-2" onClick={() => handleEdit(user.id)}>Upravit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Odstranit</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">Žádní pojištěnci nenalezeni.</td>
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
                        {[...Array(Math.ceil(users.length / usersPerPage))].map((_, index) => (
                            <li key={index} className={`page-item ${index + 1 === currentPage ? "active" : ""}`}>
                                <button
                                    className="page-link"
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === Math.ceil(users.length / usersPerPage) ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => paginate(currentPage + 1)} aria-disabled={currentPage === Math.ceil(users.length / usersPerPage)}>
                                Další
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {selectedUserId && <EditInsuredModal userId={selectedUserId} onClose={handleCloseModal} />}
        </div>
    );
};

export default ViewInsuredTable;
