import React from 'react';
import ViewInsuranceTable from './ViewInsuranceTable';

const InsuranceListTable = () => {  

    return (
        <div className="container mt-4">
            <h2>Všechna pojištění</h2>
            <ViewInsuranceTable />
        </div>
    );
};

export default InsuranceListTable;
