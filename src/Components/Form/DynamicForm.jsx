import React from 'react';
import { TextField, Button, MenuItem, Grid, Typography, Chip, Checkbox, ListItemText } from '@mui/material';

const DynamicForm = ({ fields, values = {}, onChange, onSubmit, submitText = 'Submit', title }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  const sanitizeInput = (value, type) => {
    if (value === undefined || value === null) return '';
    
    switch (type) {
      case 'text':
      case 'textarea':
        // Remove HTML tags and trim whitespace
        return value.toString().replace(/<[^>]*>/g, '').trim();
      case 'email':
        // Basic email sanitization
        return value.toString().toLowerCase().trim();
      case 'number':
        // Ensure it's a valid number
        return !isNaN(value) ? Number(value) : '';
      case 'date':
        // Ensure it's a valid date
        return value ? new Date(value).toISOString().split('T')[0] : '';
      default:
        return value;
    }
  };

  const handleChange = (field, value) => {
    if (field.type === 'file') {
      // Fix: Handle FileList object correctly
      const fileInput = value.target ? value.target.files[0] : value;
      if (fileInput && validateFileType(fileInput, field.accept)) {
        onChange({ ...values, [field.name]: fileInput });
      } else {
        console.error('File was invalid or blocked');
      }
    } else {
      const sanitizedValue = sanitizeInput(value, field.type);
      onChange({ ...values, [field.name]: sanitizedValue });
    }
  };

  const validateFileType = (file, acceptedTypes) => {
    if (!file) return false;
    
    // Convert accept string to array of mime types
    const mimeTypes = acceptedTypes.split(',').map(type => {
      // Convert file extensions to mime types
      const mimeTypeMap = {
        '.pdf': 'application/pdf',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        '.xls': 'application/vnd.ms-excel'
      };
      return mimeTypeMap[type] || type;
    });

    // Block executable files
    const blockedTypes = [
      'application/x-msdownload',
      'application/x-executable',
      'application/x-msdos-program',
      'application/x-msdos-windows',
      'application/octet-stream'
    ];

    if (blockedTypes.includes(file.type)) {
      return false;
    }

    return mimeTypes.includes(file.type);
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'date':
      case 'tel':
        return (
          <TextField
            fullWidth
            type={field.type}
            id={field.name}
            name={field.name}
            value={values[field.name] || ''}
            onChange={(e) => handleChange(field, e.target.value)}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            disabled={field.disabled}
            InputProps={{
              readOnly: field.readOnly,
              inputProps: { 
                min: field.type === 'date' ? "1900-01-01" : undefined,
                pattern: field.type === 'tel' ? "[0-9]{3}-[0-9]{3}-[0-9]{4}" : undefined
              }
            }}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        );
      case 'file':
        return (
          <div style={{ marginTop: "16px" }}>
            <input
              type="file"
              id={field.name}
              name={field.name}
              onChange={(e) => handleChange(field, e)}
              accept={field.accept || '*/*'}
              style={{ display: "none" }}
            />
            <label htmlFor={field.name}>
              <Button
                variant="outlined"
                component="span"
                sx={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "10px",
                  justifyContent: "flex-start",
                }}
              >
                {field.label}
                {" : "}
                <span style={{ color: "#2196f3", fontStyle: "italic" }}>
                  {values[field.name]?.name || ""}
                </span>
              </Button>
            </label>
            {field.helperText && (
              <div style={{ fontSize: "12px", color: "gray", marginTop: "4px" }}>
                {field.helperText}
              </div>
            )}
          </div>
        );
      case 'textarea':
        return (
          <TextField
            fullWidth
            multiline
            rows={4}
            id={field.name}
            name={field.name}
            value={values[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            variant="outlined"
          />
        );
      case 'select':
      case 'multiselect':
        return (
          <TextField
            select
            fullWidth
            id={field.name}
            name={field.name}
            value={field.type === 'multiselect' ? (values[field.name] || []) : (values[field.name] || '')}
            onChange={(e) => {
              const value = field.type === 'multiselect' 
                ? typeof e.target.value === 'string' 
                  ? e.target.value.split(',') 
                  : e.target.value
                : e.target.value;
              handleChange(field, value);
            }}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            disabled={field.disabled}
            variant="outlined"
            InputLabelProps={{ 
              shrink: true,
              style: { color: field.disabled ? 'rgba(0, 0, 0, 0.38)' : undefined }
            }}
            SelectProps={{
              multiple: field.type === 'multiselect',
              renderValue: field.type === 'multiselect'
                ? (selected) => (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={field.options?.find(opt => opt.value === value)?.label}
                          onDelete={() => {
                            const newValue = values[field.name].filter(v => v !== value);
                            handleChange(field, newValue);
                          }}
                          size="small"
                        />
                      ))}
                    </div>
                  )
                : (selected) => field.options?.find(opt => opt.value === selected)?.label || selected,
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 250,
                    width: 'auto',
                    minWidth: '200px'
                  }
                }
              }
            }}
            sx={{
              '& .MuiSelect-select': {
                minHeight: '1.4375em',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '4px'
              },
              '& .Mui-disabled': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                cursor: 'not-allowed'
              }
            }}
          >
            {field.type !== 'multiselect' && !field.disabled && (
              <MenuItem value="">
                <em>{field.placeholder || `Select ${field.label}`}</em>
              </MenuItem>
            )}
            {(field.options || []).map((option) => (
              <MenuItem 
                key={option.value} 
                value={option.value}
                sx={{
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                  padding: '8px 16px',
                  minHeight: '40px'
                }}
              >
                {field.type === 'multiselect' && (
                  <>
                    <Checkbox checked={values[field.name]?.includes(option.value)} />
                    <ListItemText primary={option.label} />
                  </>
                )}
                {field.type !== 'multiselect' && option.label}
              </MenuItem>
            ))}
          </TextField>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {title && (
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{
            mb: 3,
            fontWeight: 500
          }}
        >
          {title}
        </Typography>
      )}
      <Grid 
        container 
        spacing={2}
        sx={{
          padding: { xs: 1.5, sm: 2 },
          mt: 2
        }}
      >
        {fields.map((field) => (
          <Grid 
            item 
            xs={12} 
            md={field.fullWidth ? 12 : 6} 
            key={field.name}
            sx={{ 
              position: 'relative',
              '& .MuiTextField-root': {
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontSize: '0.95rem',
                },
                '& .MuiInputLabel-root': {
                  fontSize: '0.95rem',
                },
              }
            }}
          >
            {renderField(field)}
          </Grid>
        ))}
        <Grid 
          item 
          xs={12} 
          sx={{ 
            mt: 2,
            display: 'flex',
            justifyContent: 'flex-start'
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              minWidth: { xs: '100%', sm: '180px' },
              py: 1.25,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 400,
              borderRadius: 2,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 1
              }
            }}
          >
            {submitText}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default DynamicForm; 