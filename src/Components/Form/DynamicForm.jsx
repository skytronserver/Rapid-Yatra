import React, { useState } from 'react';
import { TextField, Button, MenuItem, Grid, Typography, Chip, Checkbox, ListItemText } from '@mui/material';

const DynamicForm = ({ fields, values = {}, onChange, onSubmit, submitText = 'Submit', title }) => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (field, value) => {
    try {
      if (field.validation) {
        field.validation.validateSync(value);
      } else if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
        throw new Error(`${field.label} is required`);
      }
      return null;
    } catch (error) {
      return error.message;
    }
  };

  const validateForm = () => {
    const newErrors = {};
    fields.forEach(field => {
      // Get current value for the field
      const value = values[field.name];
      const error = validateField(field, value);
      if (error) {
        newErrors[field.name] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Always validate and show all errors
    const isValid = validateForm();
    
    if (!isValid) {
      // If there are validation errors, scroll to the first error
      const firstErrorField = document.querySelector('.Mui-error');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'An error occurred while submitting the form'
      }));
    } finally {
      setIsSubmitting(false);
    }
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
    // Clear existing error for this field
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field.name];
      return newErrors;
    });

    if (field.type === 'file') {
      const fileInput = value.target ? value.target.files[0] : value;
      if (fileInput) {
        const error = validateField(field, fileInput);
        if (error) {
          setErrors(prev => ({
            ...prev,
            [field.name]: error
          }));
          return;
        }
        onChange({ ...values, [field.name]: fileInput });
      }
    } else {
      const sanitizedValue = sanitizeInput(value, field.type);
      const error = validateField(field, sanitizedValue);
      if (error) {
        setErrors(prev => ({
          ...prev,
          [field.name]: error
        }));
      }
      onChange({ ...values, [field.name]: sanitizedValue });
    }
  };

  const validateFileType = (file, acceptedTypes) => {
    if (!file) return false;
    
    // Define allowed MIME types and their corresponding extensions
    const allowedTypes = {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'application/pdf': ['.pdf'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    };

    // List of explicitly blocked MIME types
    const blockedTypes = [
      'application/x-msdownload',
      'application/x-executable',
      'application/x-msdos-program',
      'application/x-msdos-windows',
      'application/octet-stream',
      'application/x-javascript',
      'text/javascript',
      'application/javascript'
    ];

    // Check if file type is blocked
    if (blockedTypes.includes(file.type)) {
      console.error('Blocked file type detected:', file.type);
      return false;
    }

    // Check if file type is allowed
    return Object.keys(allowedTypes).includes(file.type);
  };

  const renderField = (field) => {
    const commonProps = {
      error: !!errors[field.name],
      helperText: errors[field.name],
      required: field.required,
      disabled: field.disabled,
      fullWidth: true,
      id: field.name,
      name: field.name,
      label: field.label,
      placeholder: field.placeholder,
      InputLabelProps: { 
        shrink: true,
        style: { color: field.disabled ? 'rgba(0, 0, 0, 0.38)' : undefined }
      },
      sx: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          fontSize: '0.95rem',
        },
        '& .MuiInputLabel-root': {
          fontSize: '0.95rem',
        }
      }
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'date':
      case 'tel':
        return (
          <TextField
            {...commonProps}
            type={field.type}
            value={values[field.name] || ''}
            onChange={(e) => handleChange(field, e.target.value)}
            InputProps={{
              readOnly: field.readOnly,
              inputProps: { 
                min: field.type === 'date' ? "1900-01-01" : undefined,
                pattern: field.type === 'tel' ? "[0-9]{10}" : undefined
              }
            }}
          />
        );
      case 'file':
        return (
          <div>
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
                  justifyContent: "left",
                  borderColor: errors[field.name] ? 'error.main' : undefined,
                  color: errors[field.name] ? 'error.main' : undefined,
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)"
                  }
                }}
              >
                <div style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "left",
                  justifyContent: "left",
                  width: "100%"
                }}>
                  <span style={{ 
                    fontSize: "0.875rem", 
                    fontWeight: 500,
                    marginBottom: "2px"
                  }}>
                    {field.label}
                    {field.required && " *"}
                  </span>
                  <span style={{ 
                    fontSize: "0.75rem", 
                    color: values[field.name] ? "#2196f3" : "rgba(0, 0, 0, 0.6)",
                    fontStyle: "italic",
                    maxWidth: "90%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}>
                    {values[field.name]?.name || (field.placeholder || "Click to select a file")}
                  </span>
                </div>
              </Button>
            </label>
            {field.message && (
              <div style={{ 
                fontSize: "12px", 
                color: "gray", 
                marginTop: "4px" 
              }}>
                {field.message}
              </div>
            )}
            {errors[field.name] && (
              <div style={{ 
                fontSize: "12px", 
                color: "#d32f2f", 
                marginTop: "4px" 
              }}>
                {errors[field.name]}
              </div>
            )}
          </div>
        );
      case 'textarea':
        return (
          <TextField
            {...commonProps}
            multiline
            rows={4}
            value={values[field.name] || ''}
            onChange={(e) => handleChange(field, e.target.value)}
          />
        );
      case 'select':
      case 'multiselect':
        return (
          <TextField
            {...commonProps}
            select
            value={field.type === 'multiselect' ? (values[field.name] || []) : (values[field.name] || '')}
            onChange={(e) => {
              const value = field.type === 'multiselect' 
                ? typeof e.target.value === 'string' 
                  ? e.target.value.split(',') 
                  : e.target.value
                : e.target.value;
              handleChange(field, value);
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
                : undefined,
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
        {errors.submit && (
          <Grid item xs={12}>
            <Typography color="error" sx={{ mt: 2 }}>
              {errors.submit}
            </Typography>
          </Grid>
        )}
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
            disabled={isSubmitting}
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
            {isSubmitting ? 'Submitting...' : submitText}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default DynamicForm; 