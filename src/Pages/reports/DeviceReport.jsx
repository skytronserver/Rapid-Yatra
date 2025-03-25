import React from 'react';
import DynamicTable from '../../Components/Table/DynamicTable';

const DeviceReport = () => {
  const columns = [
    { field: 'esn', header: 'ESN' },
    { field: 'iccid', header: 'ICCID' },
    { field: 'imei', header: 'IMEI No.' },
    { field: 'assigned_date', header: 'Assigned Date' },
    { field: 'status', header: 'Status' },
    { field: 'remarks', header: 'Remarks' }
  ];

  const data = [
    {
      id: 1,
      esn: 'ABC00000012',
      iccid: '5754210038999',
      imei: '861850060252547',
      assigned_date: '03-03-2025',
      status: 'Available',
      remarks: ''
    }
  ];

  return (
    <div>
      <DynamicTable 
        columns={columns}
        rows={data}
        getRowId={(row) => row.id}
        title="Device Report"
      />
    </div>
  );
};

export default DeviceReport; 