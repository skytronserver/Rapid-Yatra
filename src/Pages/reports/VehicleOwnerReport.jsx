import React from 'react';
import DynamicTable from '../../Components/Table/DynamicTable';

const VehicleOwnerReport = () => {
  const columns = [
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email Id' },
    { field: 'mobile', header: 'Mobile' },
    { field: 'dob', header: 'DOB' },
    { field: 'status', header: 'Status' },
    { field: 'created_on', header: 'Created On' }
  ];

  const data = [
    {
      id: 1,
      name: 'Haryana_vehicle_owner',
      email: 'twinklebaruah123+haryanavehicleowner@gmail.com',
      mobile: '9191919109',
      dob: '2024-12-01',
      status: 'active',
      created_on: '31-12-2024'
    },
    {
      id: 2,
      name: 'ankur',
      email: 'twinklebaruah.zigsaw+vehicleowner@gmail.com',
      mobile: '1000000008',
      dob: '2025-01-01',
      status: 'active',
      created_on: '17-01-2025'
    },
    {
      id: 3,
      name: 'Owner 1',
      email: 'b.sujal+owner1@gmail.com',
      mobile: '1234567899',
      dob: '2024-09-01',
      status: 'active',
      created_on: '21-10-2024'
    },
    {
      id: 4,
      name: 'kr vehilce1',
      email: 'twinklebaruah123+krvehilce1@gmail.com',
      mobile: '1234567127',
      dob: '2024-12-01',
      status: 'active',
      created_on: '20-12-2024'
    }
  ];

  return (
    <div>
      <DynamicTable 
        columns={columns}
        rows={data}
        getRowId={(row) => row.id}
        title="Vehicle Owner Report"
      />
    </div>
  );
};

export default VehicleOwnerReport; 