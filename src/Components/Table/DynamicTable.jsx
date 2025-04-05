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
import { Box, IconButton, Typography, Tooltip } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

const transformText = (text) => {
  if (!text || typeof text !== 'string') return text;
  
  const preserveUppercase = ['ID', 'ESN', 'IMEI', 'ICCID', 'MSISDN', 'ESIM'];
  
  return text.split('_')
    .map(word => {
      if (preserveUppercase.includes(word.toUpperCase())) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 'none',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 2px 12px 0 ' + alpha(theme.palette.primary.main, 0.08),
  overflow: 'hidden',
  
  // Cell styling
  '& .MuiDataGrid-cell': {
    border: 'none',
    padding: '16px 20px',
    fontSize: '0.875rem',
    color: theme.palette.text.primary,
    fontWeight: 400,
    transition: 'background-color 0.2s ease',
    '&:focus, &:focus-within': {
      outline: 'none',
    },
  },

  // Header styling
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: alpha(theme.palette.background.default, 0.5),
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    '& .MuiDataGrid-columnHeader': {
      padding: '16px 20px',
      '&:focus, &:focus-within': {
        outline: 'none',
      },
      '& .MuiDataGrid-columnHeaderTitle': {
        fontSize: '0.75rem',
        fontWeight: 600,
        color: theme.palette.text.secondary,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      },
    },
  },

  // Row styling
  '& .MuiDataGrid-row': {
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.04),
    },
    '&.Mui-selected': {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.12),
      },
    },
  },

  // Footer styling
  '& .MuiDataGrid-footerContainer': {
    borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    backgroundColor: theme.palette.background.paper,
  },

  // Pagination styling
  '& .MuiTablePagination-root': {
    color: theme.palette.text.secondary,
    '& .MuiTablePagination-select': {
      borderRadius: theme.shape.borderRadius,
    },
  },

  // Scrollbars
  '& ::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
  },
  '& ::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '& ::-webkit-scrollbar-thumb': {
    background: alpha(theme.palette.primary.main, 0.2),
    borderRadius: '3px',
    '&:hover': {
      background: alpha(theme.palette.primary.main, 0.3),
    },
  },
}));

// Styled toolbar
const StyledToolbar = styled(GridToolbarContainer)(({ theme }) => ({
  padding: '16px 20px',
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  gap: theme.spacing(2),
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
}));

// Styled toolbar button
const StyledToolbarButton = styled((props) => {
  const Component = props.component;
  return <Component {...props} />;
})(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  padding: '8px 16px',
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.2s ease',
  border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
}));

// Styled search field
const StyledQuickFilter = styled(GridToolbarQuickFilter)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: alpha(theme.palette.background.default, 0.8),
    borderRadius: theme.shape.borderRadius,
    padding: '4px 12px',
    transition: 'all 0.2s ease',
    border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
    '&:hover, &:focus-within': {
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
    },
    '& .MuiInputBase-input': {
      fontSize: '0.875rem',
      padding: '8px 12px',
      '&::placeholder': {
        color: theme.palette.text.secondary,
        opacity: 0.7,
      },
    },
  },
}));

const CustomToolbar = () => {
  const theme = useTheme();

  return (
    <StyledToolbar>
      <Box sx={{ 
        display: 'flex', 
        gap: 1,
        flexWrap: 'wrap',
        '& .MuiButton-root': {
          [theme.breakpoints.down('sm')]: {
            padding: '4px 8px',
            minWidth: 'auto',
            fontSize: '0.75rem',
          }
        }
      }}>
        <StyledToolbarButton component={GridToolbarColumnsButton} />
        <StyledToolbarButton component={GridToolbarFilterButton} />
        <StyledToolbarButton component={GridToolbarExport} />
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <StyledQuickFilter />
    </StyledToolbar>
  );
};

const ActionButton = styled(IconButton)(({ theme }) => ({
  padding: '6px',
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-1px)',
  },
}));

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

  const processedColumns = React.useMemo(() => {
    let cols = visibleFields
      ? providedColumns.filter((column) => visibleFields.includes(column.field))
      : providedColumns;

    cols = cols.map(column => ({
      ...column,
      flex: 1,
      minWidth: 150,
      headerName: column.headerName || transformText(column.field),
      renderCell: (params) => {
        let value = params.value;

        if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
          value = new Date(value).toLocaleString();
        }

        if (typeof value === 'string' && value.includes('_')) {
          value = transformText(value);
        }

        return (
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.875rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {value}
          </Typography>
        );
      },
    }));

    if (onView || onEdit || onDelete) {
      cols.push({
        field: 'actions',
        headerName: 'Actions',
        width: 120,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {onView && (
              <Tooltip title="View">
                <ActionButton
                  onClick={() => onView(params.row)}
                  sx={{ color: theme.palette.primary.main }}
                >
                  <Visibility sx={{ fontSize: '1.1rem' }} />
                </ActionButton>
              </Tooltip>
            )}
            {onEdit && (
              <Tooltip title="Edit">
                <ActionButton
                  onClick={() => onEdit(params.row)}
                  sx={{ color: theme.palette.warning.main }}
                >
                  <Edit sx={{ fontSize: '1.1rem' }} />
                </ActionButton>
              </Tooltip>
            )}
            {onDelete && (
              <Tooltip title="Delete">
                <ActionButton
                  onClick={() => onDelete(params.row)}
                  sx={{ color: theme.palette.error.main }}
                >
                  <Delete sx={{ fontSize: '1.1rem' }} />
                </ActionButton>
              </Tooltip>
            )}
          </Box>
        ),
      });
    }

    return cols;
  }, [providedColumns, visibleFields, onView, onEdit, onDelete, theme]);

  return (
    <Box sx={{ height: '100%', width: '100%', p: { xs: 1, sm: 2, md: 3 } }}>
      {title && (
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: 600,
            color: theme.palette.text.primary,
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
      />
    </Box>
  );
};

export default DynamicTable; 