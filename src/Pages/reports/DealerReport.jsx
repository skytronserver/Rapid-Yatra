import React from 'react';
import DynamicTable from '../../Components/Table/DynamicTable';
import { useGetDealersListQuery } from '../../store/services/reportsService';

const DealerReport = () => {
  const { data, isLoading, error } = useGetDealersListQuery();

  if (error) {
    return <div className="p-4 text-red-600">Error loading dealer data: {error.message}</div>;
  }

  if (isLoading) {
    return <div className="p-4">Loading dealer data...</div>;
  }

  const transformedData = data?.map((dealer) => ({
    id: dealer.id,
    company_name: dealer.company_name,
    dealer_name: dealer.users?.[0]?.name || '-',
    email: dealer.users?.[0]?.email || '-',
    mobile: dealer.users?.[0]?.mobile || '-',
    created_by: dealer.users?.[0]?.created_by_name || '-',
  }));

  const columns = [
    { field: 'company_name', header: 'Company Name' },
    { field: 'dealer_name', header: 'Dealer Name' },
    { field: 'email', header: 'Email' },
    { field: 'mobile', header: 'Mobile' },
    { field: 'created_by', header: 'Created By' }
  ];

  return (
    <div className="p-4">
      <DynamicTable
        columns={columns}
        rows={transformedData || []}
        getRowId={(row) => row.id}
        title="Dealer Report"
        rowCount={data?.totalCount || 0}
      />
    </div>
  );
};

export default DealerReport; 