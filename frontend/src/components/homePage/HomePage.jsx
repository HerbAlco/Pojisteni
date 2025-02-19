import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import logo from "../../assets/logo2.jpg";

const HomePage = () => {
    return (
        <div className="container-fluid p-0">
            <div className="row align-items-center" style={{ height: "80vh", backgroundColor: "#f0f8ff" }}>
                <div className="col-12 text-center">
                    <h1 className="display-3 mb-4" style={{ fontWeight: "bold" }}>
                        Vítejte u Pojišťovny
                    </h1>
                    <p className="lead mb-4">
                        U nás získáte nejlepší pojištění pro sebe a svou rodinu.
                    </p>
                    <img
                        src={logo}
                        alt="Pojišťovna"
                        className="img-fluid rounded-3 mb-4"
                        style={{ width: '300px', height: '300px' }}
                    />
                    <p className="lead">
                        Vyberte si pojištění, které vám vyhovuje, a buďte klidní, že máte vše pod kontrolou.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
