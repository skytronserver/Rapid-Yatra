import React, { useState } from 'react';
import DynamicTable from '../Components/Table/DynamicTable';
import DynamicForm from '../Components/Form/DynamicForm';

const Example = () => {
  // Table example
  const columns = [
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'role', header: 'Role' },
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

  const data = [
    { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'inactive' }
  ];

  // Form example
  const [formValues, setFormValues] = useState({});
  
  const formFields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'role', label: 'Role', type: 'select', required: true, 
      options: [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' }
      ]
    },
    { name: 'message', label: 'Message', type: 'textarea' }
  ];

  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
  };

  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Dynamic Table Example</h2>
        <DynamicTable 
          columns={columns} 
          data={data} 
          onRowClick={(row) => console.log('Row clicked:', row)} 
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Dynamic Form Example</h2>
        <DynamicForm 
          fields={formFields}
          values={formValues}
          onChange={setFormValues}
          onSubmit={handleSubmit}
          submitText="Save Changes"
        />
      </div>
    </div>
  );
};

export default Example; 