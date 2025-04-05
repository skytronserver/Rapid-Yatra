import React from 'react';
import DynamicTable from '../../Components/Table/DynamicTable';
import { useGetStockListQuery } from '../../store/services/reportsService';
import ElegantLoader from '../../Components/Loader';

const StockReport = () => {
  const { data, isLoading, error } = useGetStockListQuery();

  if (error) {
    return <div className="p-4 text-red-600">Error loading stock data: {error.message}</div>;
  }

  if (isLoading) {
    return <ElegantLoader
     variant="circular"
     text="Loading..."
     fullScreen
     transparent
     />
  }

  const transformedData = data?.data?.map(item => ({
    id: item.id,
    model: item.model?.model_name || '-',
    device_esn: item.device_esn,
    iccid: item.iccid,
    imei: item.imei,
    telecom1: item.telecom_provider1,
    telecom2: item.telecom_provider2,
    msisdn1: item.msisdn1,
    msisdn2: item.msisdn2,
    status: item.stock_status,
    esim_status: item.esim_status,
    esim_validity: new Date(item.esim_validity).toLocaleDateString(),
    dealer_name: item.dealer?.company_name || '-',
    created: new Date(item.created).toLocaleDateString(),
    created_by: item.created_by?.name || '-',
    remarks: item.remarks || '-'
  }));

  const columns = [
    { field: 'model', headerName: 'Model', flex: 1, minWidth: 150 },
    { field: 'device_esn', headerName: 'ESN', flex: 1, minWidth: 120 },
    { field: 'dealer_name', headerName: 'Dealer', flex: 1, minWidth: 150 },
    { field: 'iccid', headerName: 'ICCID', flex: 1, minWidth: 120 },
    { field: 'imei', headerName: 'IMEI', flex: 1, minWidth: 120 },
    { field: 'telecom1', headerName: 'Telecom 1', flex: 1, minWidth: 120 },
    { field: 'telecom2', headerName: 'Telecom 2', flex: 1, minWidth: 120 },
    { field: 'msisdn1', headerName: 'MSISDN 1', flex: 1, minWidth: 120 },
    { field: 'msisdn2', headerName: 'MSISDN 2', flex: 1, minWidth: 120 },
    { field: 'status', headerName: 'Status', flex: 1, minWidth: 100 },
    { field: 'esim_status', headerName: 'ESIM Status', flex: 1, minWidth: 150 },
    { field: 'esim_validity', headerName: 'ESIM Validity', flex: 1, minWidth: 120 },
    { field: 'remarks', headerName: 'Remarks', flex: 1, minWidth: 150 },
    { field: 'created', headerName: 'Created', flex: 1, minWidth: 100 },
    { field: 'created_by', headerName: 'Created By', flex: 1, minWidth: 150 }
  ];

  return (
    <div className="p-4">
      <DynamicTable 
        columns={columns}
        rows={transformedData || []}
        getRowId={(row) => row.id}
        title="Stock Report"
        rowCount={transformedData?.length || 0}
      />
    </div>
  );
};

export default StockReport; 