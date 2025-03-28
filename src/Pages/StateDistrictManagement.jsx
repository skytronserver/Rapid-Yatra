import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import DynamicForm from '../Components/Form/DynamicForm';
import DynamicTable from '../Components/Table/DynamicTable';
import { 
  stateInitials, 
  stateFields, 
  districtInitials, 
  districtFields
} from '../Components/formfeilds/statedistrict';
import toast from 'react-hot-toast';

// Demo data
const mockStates = [
  { id: 1, state: 'California', status: 'active' },
  { id: 2, state: 'New York', status: 'active' },
  { id: 3, state: 'Texas', status: 'inactive' }
];

const mockDistricts = [
  { id: 1, district: 'Los Angeles', district_code: 'LA', state: 1, status: 'active' },
  { id: 2, district: 'San Francisco', district_code: 'SF', state: 1, status: 'active' },
  { id: 3, district: 'Manhattan', district_code: 'MAN', state: 2, status: 'active' },
  { id: 4, district: 'Houston', district_code: 'HOU', state: 3, status: 'inactive' }
];

const StateDistrictManagement = () => {
  // State management
  const [stateValues, setStateValues] = useState(stateInitials);
  const [districtValues, setDistrictValues] = useState(districtInitials);
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stateOptions, setStateOptions] = useState([]);

  // Load demo data
  const fetchData = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setStateList(mockStates);
      setStateOptions(mockStates.map(state => ({
        value: state.id,
        label: state.state
      })));
      
      setDistrictList(mockDistricts);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle state form submission
  const handleStateSubmit = (values) => {
    // Create new state with demo ID
    const newState = {
      ...values,
      id: stateList.length > 0 ? Math.max(...stateList.map(s => s.id)) + 1 : 1
    };
    
    // Update state list
    setStateList([...stateList, newState]);
    
    // Update state options
    setStateOptions([
      ...stateOptions,
      { value: newState.id, label: newState.state }
    ]);
    
    toast.success("State added successfully");
    setStateValues(stateInitials);
  };

  // Handle district form submission
  const handleDistrictSubmit = (values) => {
    // Create new district with demo ID
    const newDistrict = {
      ...values,
      id: districtList.length > 0 ? Math.max(...districtList.map(d => d.id)) + 1 : 1
    };
    
    // Update district list
    setDistrictList([...districtList, newDistrict]);
    
    toast.success("District added successfully");
    setDistrictValues(districtInitials);
  };

  // Configure state form fields
  const stateFormFields = Object.entries(stateFields).map(([name, field]) => ({
    ...field,
    name,
    required: !!field.validation
  }));

  // Configure district form fields with updated state options
  const districtFormFields = Object.entries(districtFields).map(([name, field]) => {
    let updatedField = { ...field, name, required: !!field.validation };
    
    // Update state options in district form
    if (name === 'state') {
      updatedField.options = stateOptions;
    }
    
    return updatedField;
  });

  // Table columns for states
  const stateColumns = [
    { field: 'id', header: 'ID', width: 70 },
    { field: 'state', header: 'State Name' },
    { 
      field: 'status', 
      header: 'Status',
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          row.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {row.status}
        </span>
      )
    }
  ];

  // Table columns for districts
  const districtColumns = [
    { field: 'id', header: 'ID', width: 70 },
    { field: 'district', header: 'District Name' },
    { field: 'district_code', header: 'District Code' },
    { 
      field: 'state', 
      header: 'State',
      render: (row) => {
        const state = stateList.find(s => s.id === row.state);
        return state ? state.state : row.state;
      }
    },
    { 
      field: 'status', 
      header: 'Status',
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          row.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {row.status}
        </span>
      )
    }
  ];

  return (
    <div className="p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            State & District Management
          </h1>
          
        </div>

        {/* Section: Forms */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 px-2">Data Entry</h2>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card className="shadow-lg rounded-xl overflow-hidden border border-gray-100 transition-all hover:shadow-xl">
                <CardContent className="p-0">
                  <div className="bg-blue-50 py-3 px-6 border-b border-gray-100">
                    <Typography variant="h6" className="font-semibold text-blue-800">
                      Create State
                    </Typography>
                  </div>
                  <div className="p-5">
                    <DynamicForm
                      fields={stateFormFields}
                      values={stateValues}
                      onChange={setStateValues}
                      onSubmit={handleStateSubmit}
                      submitText="Add State"
                    />
                  </div>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card className="shadow-lg rounded-xl overflow-hidden border border-gray-100 transition-all hover:shadow-xl">
                <CardContent className="p-0">
                  <div className="bg-purple-50 py-3 px-6 border-b border-gray-100">
                    <Typography variant="h6" className="font-semibold text-purple-800">
                      Create District
                    </Typography>
                  </div>
                  <div className="p-5">
                    <DynamicForm
                      fields={districtFormFields}
                      values={districtValues}
                      onChange={setDistrictValues}
                      onSubmit={handleDistrictSubmit}
                      submitText="Add District"
                    />
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>

        {/* Section: Tables */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 px-2">Data Overview</h2>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card className="shadow-lg rounded-xl overflow-hidden border border-gray-100 transition-all hover:shadow-xl">
                <CardContent className="p-0">
                  <div className="bg-blue-50 py-3 px-6 border-b border-gray-100">
                    <Typography variant="h6" className="font-semibold text-blue-800">
                      State List
                    </Typography>
                  </div>
                  <DynamicTable
                    columns={stateColumns}
                    rows={stateList}
                    loading={loading}
                    onEdit={(row) => console.log('Edit state', row)}
                    onDelete={(row) => console.log('Delete state', row)}
                    getRowId={(row) => row.id}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card className="shadow-lg rounded-xl overflow-hidden border border-gray-100 transition-all hover:shadow-xl">
                <CardContent className="p-0">
                  <div className="bg-purple-50 py-3 px-6 border-b border-gray-100">
                    <Typography variant="h6" className="font-semibold text-purple-800">
                      District List
                    </Typography>
                  </div>
                  <DynamicTable
                    columns={districtColumns}
                    rows={districtList}
                    loading={loading}
                    onEdit={(row) => console.log('Edit district', row)}
                    onDelete={(row) => console.log('Delete district', row)}
                    getRowId={(row) => row.id}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default StateDistrictManagement; 