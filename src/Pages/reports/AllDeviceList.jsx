import React from 'react';
import DynamicTable from '../../Components/Table/DynamicTable';
import { Typography } from '@mui/material';

const AllDeviceList = () => {
  const columns = [
    { field: 'model', header: 'Model' },
    { field: 'esn', header: 'ESN' },
    { field: 'iccid', header: 'ICCID' },
    { field: 'imei', header: 'IMEI' },
    { field: 'telecom1', header: 'Telecom 1' },
    { field: 'telecom2', header: 'Telecom 2' },
    { field: 'msisdn1', header: 'MSISDN 1' },
    { field: 'status', header: 'Status' },
    { field: 'esim_validity', header: 'ESIM Validity' },
    { field: 'esim_provider', header: 'ESIM Provider' },
    { field: 'remarks', header: 'Remarks' },
    { field: 'created', header: 'Created' },
    { field: 'created_by', header: 'Created By' }
  ];

  const data = [
    {
      id: 1,
      model: 'TN MODEL 1',
      esn: 'GEM1205',
      iccid: '01092024',
      imei: '868960065504918',
      telecom1: 'BSNL',
      telecom2: 'AIRTEL',
      msisdn1: '9773300556',
      status: 'Assigned',
      esim_validity: '09-11-2026',
      esim_provider: 'TN M2M',
      remarks: '',
      created: '10-11-2024',
      created_by: 'TN maker'
    },
    {
      id: 2,
      model: 'TN MODEL 1',
      esn: 'ASMABC00000013',
      iccid: '86185006025361000001',
      imei: '861850060253610',
      telecom1: 'vodafone',
      telecom2: 'bsnl',
      msisdn1: '9773300554',
      status: 'Assigned',
      esim_validity: '19-11-2026',
      esim_provider: 'TN M2M',
      remarks: '2nd test',
      created: '19-11-2024',
      created_by: 'TN maker'
    }
  ];

  return (
    <div>
      <DynamicTable 
        columns={columns}
        rows={data}
        getRowId={(row) => row.id}
        title="All Device List"
      />
    </div>
  );
};

export default AllDeviceList; 