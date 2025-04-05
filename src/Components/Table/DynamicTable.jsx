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
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  overflow: 'hidden',
  
  // Cell styling
  '& .MuiDataGrid-cell': {
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
    padding: '14px 20px',
    fontSize: '13px',
    color: theme.palette.text.secondary,
    fontWeight: 450,
    transition: 'background-color 0.2s ease',
    '& .MuiDataGrid-cellContent': {
      overflow: 'visible',
      whiteSpace: 'normal',
      lineHeight: '1.5',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
    },
  },

  // Header styling
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: alpha(theme.palette.primary.main, 0.02),
    borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    '& .MuiDataGrid-columnHeader': {
      padding: '16px 20px',
      '& .MuiDataGrid-columnHeaderTitle': {
        fontSize: '12px',
        fontWeight: 600,
        color: theme.palette.text.primary,
        letterSpacing: '0.6px',
        textTransform: 'uppercase',
      },
    },
  },

  // Row styling
  '& .MuiDataGrid-row': {
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.02),
    },
    '&:nth-of-type(even)': {
      backgroundColor: alpha(theme.palette.background.default, 0.3),
    },
  },

  // Footer styling
  '& .MuiDataGrid-footerContainer': {
    borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    backdropFilter: 'blur(8px)',
  },

  // Pagination styling
  '& .MuiTablePagination-root': {
    color: theme.palette.text.secondary,
    '& .MuiTablePagination-select': {
      borderRadius: '8px',
    },
  },

  // Remove cell selection outline
  '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
    outline: 'none',
  },

  // Scrollbars
  '& ::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
  },
  '& ::-webkit-scrollbar-track': {
    background: alpha(theme.palette.primary.main, 0.04),
    borderRadius: '8px',
  },
  '& ::-webkit-scrollbar-thumb': {
    background: alpha(theme.palette.primary.main, 0.2),
    borderRadius: '8px',
    '&:hover': {
      background: alpha(theme.palette.primary.main, 0.3),
    },
  },
}));

// Styled toolbar buttons
const StyledToolbarButton = styled((props) => {
  const Component = props.component;
  return <Component {...props} />;
})(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  color: theme.palette.text.secondary,
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  borderRadius: '8px',
  padding: '8px 16px',
  fontSize: '13px',
  fontWeight: 500,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    color: theme.palette.primary.main,
    borderColor: alpha(theme.palette.primary.main, 0.2),
  },
}));

// Custom Toolbar Component
const CustomToolbar = () => {
  const theme = useTheme();

  return (
    <GridToolbarContainer
      sx={{
        padding: '20px 24px',
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', gap: 1 }}>
        <StyledToolbarButton component={GridToolbarColumnsButton} />
        <StyledToolbarButton component={GridToolbarFilterButton} />
        <StyledToolbarButton component={GridToolbarExport} />
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarQuickFilter
        debounceMs={500}
        sx={{
          '& .MuiInputBase-root': {
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
            border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
            borderRadius: '8px',
            padding: '4px 16px',
            transition: 'all 0.2s ease',
            '&:hover, &:focus-within': {
              borderColor: theme.palette.primary.main,
              backgroundColor: '#ffffff',
              boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
            },
            '& .MuiInputBase-input': {
              fontSize: '13px',
              padding: '8px 12px',
              '&::placeholder': {
                color: theme.palette.text.secondary,
                opacity: 0.7,
              },
            },
          },
        }}
      />
    </GridToolbarContainer>
  );
};

// Update action buttons styling
const actionButtonStyle = {
  padding: '8px',
  borderRadius: '8px',
  backgroundColor: 'transparent',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

const DynamicTable = ({
  columns: providedColumns,
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

  // Generate columns from data if not provided
  const columns = React.useMemo(() => {
    if (providedColumns?.length > 0) return providedColumns;
    
    if (!rows || rows.length === 0) return [];

    // Get the first row to extract fields
    const firstRow = rows[0];
    return Object.keys(firstRow).map(field => ({
      field,
      headerName: field
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      type: typeof firstRow[field] === 'number' ? 'number' : 'string',
    }));
  }, [providedColumns, rows]);

  const processedColumns = React.useMemo(() => {
    let filteredColumns = visibleFields
      ? columns.filter((column) => visibleFields.includes(column.field))
      : columns;

    filteredColumns = filteredColumns.map(column => ({
      ...column,
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        let displayValue = params.value;

        if (typeof displayValue === 'string' && displayValue.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
          displayValue = new Date(displayValue).toLocaleString();
        }

        if (typeof displayValue === 'string') {
          displayValue = displayValue.replace(/_/g, ' ');
        }

        return (
          <Box sx={{ 
            width: '100%',
            height: '100%',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            overflow: 'visible',
            lineHeight: '1.5',
            display: 'flex',
            alignItems: 'center',
            py: 1,
            px: 0.5,
          }}>
            {displayValue}
          </Box>
        );
      }
    }));

    if (onView || onEdit || onDelete) {
      filteredColumns = [
        ...filteredColumns,
        {
          field: 'actions',
          headerName: 'Actions',
          width: 140,
          renderCell: (params) => (
            <Box sx={{
              display: 'flex',
              gap: 1,
              justifyContent: 'center',
              width: '100%'
            }}>
              {onView && (
                <IconButton
                  size="small"
                  onClick={() => onView(params.row)}
                  sx={{
                    ...actionButtonStyle,
                    color: theme.palette.primary.main,
                    '&:hover': {
                      ...actionButtonStyle['&:hover'],
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                >
                  <Visibility sx={{ fontSize: '1.1rem' }} />
                </IconButton>
              )}
              {onEdit && (
                <IconButton
                  size="small"
                  onClick={() => onEdit(params.row)}
                  sx={{
                    ...actionButtonStyle,
                    color: theme.palette.warning.main,
                    '&:hover': {
                      ...actionButtonStyle['&:hover'],
                      backgroundColor: alpha(theme.palette.warning.main, 0.08),
                    },
                  }}
                >
                  <Edit sx={{ fontSize: '1.1rem' }} />
                </IconButton>
              )}
              {onDelete && (
                <IconButton
                  size="small"
                  onClick={() => onDelete(params.row)}
                  sx={{
                    ...actionButtonStyle,
                    color: theme.palette.error.main,
                    '&:hover': {
                      ...actionButtonStyle['&:hover'],
                      backgroundColor: alpha(theme.palette.error.main, 0.08),
                    },
                  }}
                >
                  <Delete sx={{ fontSize: '1.1rem' }} />
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
      p: { xs: 0.5, sm: 1, md: 2 },
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
        getEstimatedRowHeight={() => 60}
        disableRowSelectionOnClick
        autoHeight
        sx={{
          '& .MuiDataGrid-cell': {
            padding: { xs: '8px', sm: '12px 16px' },
            fontSize: { xs: '12px', sm: '13px' }
          },
          '& .MuiDataGrid-columnHeader': {
            padding: { xs: '8px', sm: '16px' },
            fontSize: { xs: '12px', sm: '13px' }
          },
          '& .MuiDataGrid-main': {
            overflow: 'hidden'
          }
        }}
      />
    </Box>
  );
};

export default DynamicTable; 