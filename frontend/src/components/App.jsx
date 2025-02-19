import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from './layout/Header'
import ViewInsuredTable from "./insuredPage/ViewInsuredTable";
import CreateInsuredForm from "./insuredPage/CreateInsuredForm";
import InsuredDetail from "./insuredPage/InsuredDetail";
import CreateInsuranceForm from "./insurancePage/CreateInsuranceForm";
import InsuranceListTable from "./insurancePage/InsuranceListTable";
import HomePage from "./homePage/HomePage";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/insured" element={<ViewInsuredTable />} />
            <Route path="/create-insured" element={<CreateInsuredForm />} />
            <Route path="/insured-detail/:id" element={<InsuredDetail />} />
            <Route path="/add-insurance/:id" element={<CreateInsuranceForm />} />
            <Route path="/all-insurances" element={<InsuranceListTable />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;