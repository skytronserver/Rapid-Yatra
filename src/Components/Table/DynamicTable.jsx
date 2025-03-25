import * as React from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { styled, useTheme } from '@mui/material/styles';
import { Box, IconButton, Typography } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

// Styled Components
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 'none',
  '& .MuiDataGrid-cell': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: 400,
    color: theme.palette.text.primary,
    lineHeight: 1.5,
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    '& .MuiDataGrid-cellContent': {
      overflow: 'visible',
      whiteSpace: 'pre-wrap',
    },
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    '& .MuiDataGrid-columnHeader': {
      padding: '16px',
      fontWeight: 700,
      fontSize: '15px',
      color: theme.palette.text.primary,
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
    },
  },
  '& .MuiDataGrid-row': {
    '&:nth-of-type(odd)': {
      backgroundColor: alpha(theme.palette.primary.main, 0.03),
    },
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
    },
    '&.Mui-selected': {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.2),
      },
    },
  },
  '& .MuiDataGrid-root': {
    borderRadius: '20px',
    boxShadow: '0 8px 32px 0 rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    padding: '16px',
  },
  '& .MuiDataGrid-virtualScroller': {
    backgroundColor: theme.palette.background.paper,
  },
}));

const StyledToolbarButton = styled((props) => {
  const Component = props.component;
  return <Component {...props} />;
})(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '8px',
  padding: '8px 16px',
  fontSize: '14px',
  fontWeight: 500,
  '&:hover': { 
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    borderColor: theme.palette.primary.main,
  },
}));

// Custom Toolbar Component
const CustomToolbar = () => {
  const theme = useTheme();

  return (
    <GridToolbarContainer
      sx={{
        p: 3,
        bgcolor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap',
      }}
    >
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <StyledToolbarButton component={GridToolbarColumnsButton} />
        <StyledToolbarButton component={GridToolbarFilterButton} />
        <StyledToolbarButton component={GridToolbarExport} />
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarQuickFilter
        debounceMs={500}
        sx={{
          width: { xs: '100%', sm: 'auto', minWidth: '300px' },
          '& .MuiInputBase-root': {
            height: '45px',
            borderRadius: '8px',
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: theme.palette.background.paper,
            '&:hover': {
              borderColor: theme.palette.primary.main,
            },
            '& .MuiInputBase-input': {
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 400,
              color: theme.palette.text.primary,
              '&::placeholder': {
                color: theme.palette.text.secondary,
                opacity: 0.8,
              },
            },
          },
        }}
      />
    </GridToolbarContainer>
  );
};

const DynamicTable = ({
  columns,
  rows,
  loading = false,
  pageSize = 10,
  page = 0,
  rowCount,
  visibleFields,
  useServerSearch = false,
  onSearchChange,
  onPaginationChange,
  onView,
  onEdit,
  onDelete,
  getRowId,
  title,
}) => {
  const theme = useTheme();

  const processedColumns = React.useMemo(() => {
    let filteredColumns = visibleFields
      ? columns.filter((column) => visibleFields.includes(column.field))
      : columns;

    filteredColumns = filteredColumns.map(column => ({
      ...column,
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <div style={{ 
          width: '100%',
          height: '100%',
          whiteSpace: 'pre-wrap',
          overflow: 'visible',
          lineHeight: '1.5'
        }}>
          {params.value}
        </div>
      )
    }));

    if (onView || onEdit || onDelete) {
      filteredColumns = [
        ...filteredColumns,
        {
          field: 'actions',
          headerName: 'Actions',
          sortable: false,
          width: {
            xs: 120, // smaller screens
            sm: 150, // medium screens
            md: 180, // larger screens
          },
          renderCell: (params) => (
            <Box sx={{
              display: 'flex',
              gap: { xs: 0.5, sm: 1, md: 1.5 },
              opacity: 0.85,
              transition: 'opacity 0.2s',
              '&:hover': { opacity: 1 },
              flexWrap: 'nowrap',
              justifyContent: 'center',
              width: '100%'
            }}>
              {onView && (
                <IconButton
                  size="small"
                  onClick={() => onView(params.row)}
                  sx={{
                    color: 'primary.main',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    '&:hover': { 
                      backgroundColor: alpha(theme.palette.primary.main, 0.2),
                    },
                    padding: { xs: '4px', sm: '8px' }
                  }}
                >
                  <Visibility sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                </IconButton>
              )}
              {onEdit && (
                <IconButton
                  size="small"
                  onClick={() => onEdit(params.row)}
                  sx={{
                    color: 'warning.main',
                    backgroundColor: alpha(theme.palette.warning.main, 0.1),
                    '&:hover': { 
                      backgroundColor: alpha(theme.palette.warning.main, 0.2),
                    },
                    padding: { xs: '4px', sm: '8px' }
                  }}
                >
                  <Edit sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                </IconButton>
              )}
              {onDelete && (
                <IconButton
                  size="small"
                  onClick={() => onDelete(params.row)}
                  sx={{
                    color: 'error.main',
                    backgroundColor: alpha(theme.palette.error.main, 0.1),
                    '&:hover': { 
                      backgroundColor: alpha(theme.palette.error.main, 0.2),
                    },
                    padding: { xs: '4px', sm: '8px' }
                  }}
                >
                  <Delete sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                </IconButton>
              )}
            </Box>
          ),
        },
      ];
    }
    return filteredColumns;
  }, [columns, visibleFields, onView, onEdit, onDelete, theme]);
 
  return (
    <Box sx={{
      height: '100%',
      width: '100%',
      p: { xs: 0.5, sm: 1, md: 2 }, // Responsive padding
      bgcolor: 'background.default',
    }}>
      {title && (
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{
            mb: 3,
            ml: 2,
            mt: 2,
            fontWeight: 500
          }}
        >
          {title}
        </Typography>
      )}
      <StyledDataGrid
        rows={rows}
        columns={processedColumns}
        loading={loading}
        pagination
        paginationMode="server"
        rowCount={rowCount}
        pageSizeOptions={[5, 10, 25, 50]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize,
              page,
            },
          },
        }}
        getRowId={getRowId}
        slots={{
          toolbar: CustomToolbar,
        }}
        onPaginationModelChange={(model) => {
          if (onPaginationChange) {
            onPaginationChange(model.page, model.pageSize);
          }
        }}
        onFilterModelChange={(model) => {
          if (useServerSearch && onSearchChange) {
            onSearchChange(model.quickFilterValues?.[0] ?? '');
          }
        }}
        getRowHeight={() => 'auto'}
        getEstimatedRowHeight={() => 100}
        sx={{
          // Add responsive styles for the grid
          '& .MuiDataGrid-cell': {
            padding: { xs: '8px', sm: '12px 16px' },
            fontSize: { xs: '12px', sm: '14px' }
          },
          '& .MuiDataGrid-columnHeader': {
            padding: { xs: '8px', sm: '16px' },
            fontSize: { xs: '13px', sm: '15px' }
          }
        }}
      />
    </Box>
  );
};

export default DynamicTable; 