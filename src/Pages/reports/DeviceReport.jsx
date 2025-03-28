import React from 'react';
import DynamicTable from '../../Components/Table/DynamicTable';
import { useGetDealerDeviceListQuery } from '../../store/services/reportsService';

const DeviceReport = () => {
  const { data, isLoading, error } = useGetDealerDeviceListQuery();

  console.log(data,"data");

  if (error) {
    return <div className="p-4 text-red-600">Error loading device data: {error.message}</div>;
  }

  if (isLoading) {
    return <div className="p-4">Loading device data...</div>;
  }

  const columns = [
    { field: 'device_esn', headerName: 'Device ESN' },
    { field: 'imei', headerName: 'IMEI' },
    { field: 'iccid', headerName: 'ICCID' },
    { field: 'telecom_provider1', headerName: 'Telecom Provider 1' },
    { field: 'telecom_provider2', headerName: 'Telecom Provider 2' },
    { field: 'msisdn1', headerName: 'MSISDN 1' },
    { field: 'msisdn2', headerName: 'MSISDN 2' },
    { field: 'esim_status', headerName: 'ESIM Status' },
    { field: 'esim_validity', headerName: 'ESIM Validity' },
    { field: 'stock_status', headerName: 'Stock Status' },
    { field: 'remarks', headerName: 'Remarks' },
    { field: 'created', headerName: 'Created' },
    { field: 'assigned', headerName: 'Assigned' }
  ];

  return (
    <div className="p-4">
      <DynamicTable 
        columns={columns}
        rows={data?.data || []}
        getRowId={(row) => row.id}
        title="Device Report"
      />
    </div>
  );
};

export default DeviceReport; 