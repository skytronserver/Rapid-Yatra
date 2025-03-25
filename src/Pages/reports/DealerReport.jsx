import React from 'react';
import DynamicTable from '../../Components/Table/DynamicTable';

const DealerReport = () => {
  const columns = [
    { field: 'company_name', header: 'Company Name' },
    { field: 'mobile', header: 'Mobile' },
    { field: 'email', header: 'Email' },
    { field: 'gst_no', header: 'GST No.' },
    { field: 'created_by', header: 'Created By' }
  ];

  const data = [
    {
      id: 1,
      company_name: 'TN dealer',
      mobile: '2234567895',
      email: 'b.sujal+TNdealer@gmail.com',
      gst_no: '01092024',
      created_by: 'TN STATE ADMIN'
    },
    {
      id: 2,
      company_name: 'Gobind PVT LTD',
      mobile: '9999999999',
      email: 'a65471280+dealer2@gmail.com',
      gst_no: '56785678',
      created_by: 'TN STATE ADMIN'
    }
  ];

  return (
    <div>
      <DynamicTable 
        columns={columns}
        rows={data}
        getRowId={(row) => row.id}
        title="Dealer Report"
      />
    </div>
  );
};

export default DealerReport; 