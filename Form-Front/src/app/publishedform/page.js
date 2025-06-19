'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import {
  BackwardOutlined,
  CloseOutlined,
  SaveOutlined,
  DeleteOutlined,
  EyeFilled,
  EyeInvisibleFilled,
} from "@ant-design/icons";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  CircularProgress,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { publishformurlbyid, submitformclient } from '../../done/common';
import Breadcrumb from "../../app/commoncomponents/Breadcrumb/Breadcrumb";
import { toast, ToastContainer } from 'react-toastify';
import { StatusCode } from '../../utils/commonEnum';
import InputBox from '../commoncomponents/InputBox/InputBox';

export default function PublishedFormPage() {
  const searchParams = useSearchParams();
  const formSlug = searchParams.get('form');

  const [formDetails, setFormDetails] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordVisibility, setPasswordVisibility] = useState({});
  
  // Stepper state
  const [activeStep, setActiveStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);
  const [stepNames, setStepNames] = useState([]);
  const [fieldsByStep, setFieldsByStep] = useState({});

  const fetchFormData = async () => {
    try {
      const response = await publishformurlbyid({ form_url: formSlug });

      if (response.statusCode === StatusCode.success) {
        const fetchedData = response?.data?.[0];

        if (fetchedData) {
          const parsedFields = JSON.parse(fetchedData.fields || '[]');

          setFormDetails({
            form_title: fetchedData.form_title,
            form_type: fetchedData.form_type,
            fields: parsedFields,
          });

          // Initialize form data
          const initialData = { status: 1 };
          parsedFields.forEach(field => {
            if (field.type === 'checkbox') {
              initialData[field.name || `field_${field.id}`] = false;
            } else if (field.type === 'radio') {
              initialData[field.name || `field_${field.id}`] = '';
            } else {
              initialData[field.name || `field_${field.id}`] = '';
            }
          });
          setFormData(initialData);

          // Setup stepper if form type is stepper
          if (fetchedData.form_type === 'stepper') {
            setupStepper(parsedFields);
          }
        } else {
          setFormDetails(null);
        }
      } else {
        toast.error('Failed to load form');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch form data");
    } finally {
      setLoading(false);
    }
  };

  const setupStepper = (fields) => {
    // Group fields by step
    const grouped = {};
    let maxStepNum = 1;
    const stepNamesMap = {};
    
    fields.forEach(field => {
      const step = field.step || 1;
      if (!grouped[step]) {
        grouped[step] = [];
      }
      grouped[step].push(field);
      maxStepNum = Math.max(maxStepNum, step);

      if (field.stepName && !stepNamesMap[step]) {
stepNamesMap[step] = field.stepName;
}
});

    setFieldsByStep(grouped);
    setMaxStep(maxStepNum);

    // Generate step names
    const names = [];
    for (let i = 1; i <= maxStepNum; i++) {
      names.push(stepNamesMap[i] || `Step ${i}`);
    }
    setStepNames(names);
  };

  useEffect(() => {
    if (formSlug) {
      fetchFormData();
    }
  }, [formSlug]);

  const handleChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  const handlePasswordToggle = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateCurrentStep = () => {
    const newErrors = {};
    const currentFields = fieldsByStep[activeStep] || [];
    
    currentFields.forEach(field => {
      const fieldName = field.name || `field_${field.id}`;
      const isRequired = field.validation?.required || field.required;
      
      if (isRequired && (!formData[fieldName] || formData[fieldName] === '')) {
        newErrors[fieldName] = 'This field is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    const newErrors = {};
    
    formDetails.fields.forEach(field => {
      const fieldName = field.name || `field_${field.id}`;
      const isRequired = field.validation?.required || field.required;
      
      if (isRequired && (!formData[fieldName] || formData[fieldName] === '')) {
        newErrors[fieldName] = 'This field is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setActiveStep((prevStep) => Math.min(prevStep + 1, maxStep));
    } else {
      toast.error('Please fill in all required fields before proceeding');
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const submitForm = async (values) => {
   if (!validateForm()) {
      toast.error('Please fill in all required fields');
      // Go to the first step with errors
      for (let step = 1; step <= maxStep; step++) {
        const stepFields = fieldsByStep[step] || [];
        const hasErrors = stepFields.some(field => {
          const fieldName = field.name || `field_${field.id}`;
          return errors[fieldName];
        });
        if (hasErrors) {
          setActiveStep(step);
          break;
        }
      }
      return;
    }


  setSubmitting(true);
  try {
    // Map field IDs to labels
    const fieldIdToLabel = {};
    formDetails.fields.forEach(field => {
      const idKey = `field_${field.id}`;
      fieldIdToLabel[idKey] = field.label;
    });

    // Transform values to use labels as keys
    const formDataLabels = {};
    Object.keys(values).forEach(key => {
      if (key !== 'status') {
        const label = fieldIdToLabel[key] || key; // fallback to key if no label
        formDataLabels[label] = values[key];
      }
    });

    const payload = {
      form_url: formSlug,
      form_data: formDataLabels,
    };

    // Send to server
    const result = await submitformclient({ payload });
   if (result.statusCode === StatusCode.success){
     toast.success('Form submitted successfully!');
     setSubmitted(true);
     resetFun();
   }else{
    setSubmitted(false);
     toast.error(result?.message || "Something went wrong");
   }
  }  catch (error) {
    console.error('Submission error:', error); // Add this for debugging
    setSubmitted(false);
    toast.error('Form submission failed.');
  } finally {
    setSubmitting(false);
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm(formData);
  };

  const resetFun = () => {
    const resetData = { status: 1 };
    formDetails.fields.forEach(field => {
      const fieldName = field.name || `field_${field.id}`;
      resetData[fieldName] = field.type === 'checkbox' ? false : '';
    });
    setFormData(resetData);
    setErrors({});
    setActiveStep(1);
  };

  const renderStepper = () => {
    if (maxStep <= 1) return null;  // Hide stepper if only one step
    const stepsToRender = stepNames.slice(0, maxStep);
    return (
      <Box sx={{ width: '100%', mb: 4 }}>
        <Stepper activeStep={activeStep - 1} alternativeLabel>
          {stepsToRender.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    );
  };

  const renderField = (field, index) => {
    const fieldName = field.name || `field_${field.id}`;
    const isRequired = field.validation?.required || field.required;
    const fieldError = errors[fieldName];
    
    const getGridSize = (type) => {
      switch (type) {
        case 'textarea':
        case 'description':
          return { xs: 12, sm: 12, md: 12, lg: 12 };
        case 'address':
          return { xs: 12, sm: 12, md: 8, lg: 8 };
        default:
          return { xs: 12, sm: 12, md: 4, lg: 4 };
      }
    };

    const gridSize = getGridSize(field.type);

    switch (field.type) {
      case 'textarea':
      case 'description':
        return (
          <Grid item {...gridSize} key={index}>
            <InputBox
              label={
                <span>
                  {field.label}
                  {isRequired && <span className="lableStar">*</span>}
                </span>
              }
              size="small"
              type="text"
              placeholder=""
              multiline
              rows={3}
              name={fieldName}
              value={formData[fieldName] || ''}
              onChange={(e) => handleChange(fieldName, e.target.value)}
              error={Boolean(fieldError)}
              helperText={fieldError}
            />
          </Grid>
        );

      case 'password':
        return (
          <Grid item {...gridSize} key={index}>
            <InputBox
              label={
                <span>
                  {field.label}
                  {isRequired && <span className="lableStar">*</span>}
                </span>
              }
              size="small"
              type={passwordVisibility[fieldName] ? "text" : "password"}
              placeholder=""
              name={fieldName}
              value={formData[fieldName] || ''}
              onChange={(e) => handleChange(fieldName, e.target.value)}
              error={Boolean(fieldError)}
              helperText={fieldError}
              InputProps={{
                style: { borderRadius: "599px" },
                shrink: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handlePasswordToggle(fieldName)}
                      edge="end"
                      size="small"
                    >
                      {passwordVisibility[fieldName] ? <EyeInvisibleFilled /> : <EyeFilled />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        );

      case 'radio':
        return (
          <Grid item {...gridSize} key={index}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium' }}>
              {field.label}
              {isRequired && <span style={{ color: 'red' }}>*</span>}
            </Typography>
            <RadioGroup
              name={fieldName}
              value={formData[fieldName] || ''}
              onChange={(e) => handleChange(fieldName, e.target.value)}
            >
              {(field.options || '').split(',').map((option, optIndex) => (
                <FormControlLabel
                  key={optIndex}
                  value={option.trim()}
                  control={<Radio size="small" />}
                  label={option.trim()}
                />
              ))}
            </RadioGroup>
            {fieldError && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                {fieldError}
              </Typography>
            )}
          </Grid>
        );

      case 'checkbox':
        return (
          <Grid item {...gridSize} key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData[fieldName] || false}
                  onChange={(e) => handleChange(fieldName, e.target.checked)}
                  size="small"
                />
              }
              label={
                <span>
                  {field.label}
                  {isRequired && <span style={{ color: 'red' }}>*</span>}
                </span>
              }
            />
            {fieldError && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                {fieldError}
              </Typography>
            )}
          </Grid>
        );

      case 'select':
        const selectOptions = (field.options || '').split(',').map(opt => ({
          label: opt.trim(),
          value: opt.trim()
        }));
        
        return (
          <Grid item {...gridSize} key={index}>
            <Autocomplete
              fullWidth
              disableClearable
              size="small"
              className="searchAutoBox"
              options={selectOptions}
              getOptionLabel={(option) => option.label || option.value || option}
              value={selectOptions.find(opt => opt.value === formData[fieldName]) || null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  size="small"
                  placeholder=""
                  label={
                    <span>
                      {field.label}
                      {isRequired && <span className="lableStar">*</span>}
                    </span>
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    style: { borderRadius: "599px" },
                    shrink: true,
                    ...params.InputProps,
                  }}
                  error={Boolean(fieldError)}
                  helperText={fieldError}
                />
              )}
              onChange={(event, newValue) => {
                handleChange(fieldName, newValue?.value || '');
              }}
            />
          </Grid>
        );

      case 'date':
        return (
          <Grid item {...gridSize} key={index}>
            <InputBox
              label={
                <span>
                  {field.label}
                  {isRequired && <span className="lableStar">*</span>}
                </span>
              }
              size="small"
              type="date"
              placeholder=""
              name={fieldName}
              value={formData[fieldName] || ''}
              onChange={(e) => handleChange(fieldName, e.target.value)}
              error={Boolean(fieldError)}
              helperText={fieldError}
            />
          </Grid>
        );

      case 'file':
        return (
          <Grid item {...gridSize} key={index}>
            <div style={{ marginBottom: '16px' }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium' }}>
                {field.label}
                {isRequired && <span style={{ color: 'red' }}>*</span>}
              </Typography>
              <input
                type="file"
                name={fieldName}
                onChange={(e) => handleChange(fieldName, e.target.files[0])}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: fieldError ? '2px solid #f44336' : '1px solid #ccc',
                  borderRadius: '599px',
                  fontSize: '14px',
                }}
                accept={field.accept}
              />
              {fieldError && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                  {fieldError}
                </Typography>
              )}
              <div style={{ fontSize: "12px", color: "#888", marginTop: '4px' }}>
                Max file size: {field.maxSizeMB || 5}MB
              </div>
            </div>
          </Grid>
        );

      default:
        return (
          <Grid item {...gridSize} key={index}>
            <InputBox
              label={
                <span>
                  {field.label}
                  {isRequired && <span className="lableStar">*</span>}
                </span>
              }
              size="small"
              type={field.type || 'text'}
              placeholder=""
              name={fieldName}
              value={formData[fieldName] || ''}
              onChange={(e) => handleChange(fieldName, e.target.value)}
              error={Boolean(fieldError)}
              helperText={fieldError}
            />
          </Grid>
        );
    }
  };

  const renderCurrentStepFields = () => {
    const currentFields = fieldsByStep[activeStep] || [];
    
    if (currentFields.length === 0) {
      return (
        <Typography variant="body1" color="text.secondary" textAlign="center">
          No fields found for this step.
        </Typography>
      );
    }

    // Group fields in rows
    const rows = [];
    let currentRow = [];
    
    currentFields.forEach((field, index) => {
      if (field.type === 'textarea' || field.type === 'description' || field.type === 'address') {
        // Full width fields get their own row
        if (currentRow.length > 0) {
          rows.push([...currentRow]);
          currentRow = [];
        }
        rows.push([field]);
      } else {
        currentRow.push(field);
        if (currentRow.length === 3) {
          rows.push([...currentRow]);
          currentRow = [];
        }
      }
    });
    
    // Add remaining fields
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }
    
    return rows.map((row, rowIndex) => (
      <Grid
        key={rowIndex}
        container
        justifyContent={"center"}
        className="gridMargin"
        spacing={4}
      >
        {row.map((field, fieldIndex) => renderField(field, `${activeStep}-${rowIndex}-${fieldIndex}`))}
      </Grid>
    ));
  };

  const renderAllFields = () => {
    if (!formDetails.fields || formDetails.fields.length === 0) return null;

    const rows = [];
    let currentRow = [];
    
    formDetails.fields.forEach((field, index) => {
      if (field.type === 'textarea' || field.type === 'description' || field.type === 'address') {
        if (currentRow.length > 0) {
          rows.push([...currentRow]);
          currentRow = [];
        }
        rows.push([field]);
      } else {
        currentRow.push(field);
        if (currentRow.length === 3) {
          rows.push([...currentRow]);
          currentRow = [];
        }
      }
    });
    
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }
    
    return rows.map((row, rowIndex) => (
      <Grid
        key={rowIndex}
        container
        justifyContent={"center"}
        className="gridMargin"
        spacing={4}
      >
        {row.map((field, fieldIndex) => renderField(field, `${rowIndex}-${fieldIndex}`))}
      </Grid>
    ));
  };

  const renderStepperNavigation = () => {
    if (formDetails?.form_type !== 'stepper' || maxStep <= 1) return null;

    return (
      <Grid item xs={12} className="btnSeparate">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 1}
            size="small"
            className="buttonStyle"
          >
            Back
          </Button>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {activeStep === maxStep ? (
              <Button
                variant="contained"
                color="success"
                size="small"
                className="buttonStyle"
                onClick={handleSubmit}
                disabled={submitting}
              >
                <SaveOutlined className="mr-1" />
                {submitting ? 'Submitting...' : 'Submit'}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="buttonStyle"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Grid>
    );
  };

  const renderRegularFormActions = () => {
    if (formDetails?.form_type === 'stepper') return null;

    return (
      <Grid item xs={12} className="btnSeparate">
        <Button
          variant="contained"
          color="success"
          size="small"
          className="buttonStyle"
          type="submit"
          disabled={submitting}
        >
          <SaveOutlined className="mr-1" />
          {submitting ? 'Submitting...' : 'Submit'}
        </Button>

        <Button
          variant="contained"
          color="info"
          size="small"
          className="buttonStyle"
          onClick={() => window.history.back()}
        >
          <CloseOutlined className="mr-1" />
          Cancel
        </Button>
      </Grid>
    );
  };

  const getMainContent = () => {
    // Loading state
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress size={60} />
          {/* <Typography variant="h6" sx={{ ml: 2 }}>Loading form...</Typography> */}
        </Box>
      );
    }

    // Main form content
    const empListingdata = {
      title: formDetails.form_title,
    };

    return (
      <>
      <ToastContainer />
        {/* Page heading */}
        <Grid item xs={12} sm={4} md={3} lg={1.5}>
            <Breadcrumb {...empListingdata} />
        </Grid>

        {/* Stepper - only show if form type is stepper */}
        {/* Form Details */}
        <form onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <Card variant="outlined" className="addCardMain">
              <h2 className="addPageTitle mb-4">
                {formDetails.form_title}
                {formDetails.form_type === 'stepper' && maxStep > 1 && (
                  <span style={{ fontSize: '16px', color: '#666', marginLeft: '10px' }}>
                    - Step {activeStep} of {maxStep}
                  </span>
                )}
              </h2>
             {formDetails.form_type === 'stepper' && renderStepper()}
              <CardContent className="addCardContents">
                {/* Render fields based on form type */}
                {formDetails.form_type === 'stepper' ? renderCurrentStepFields() : renderAllFields()}
              </CardContent>
            </Card>
          </Grid>

          {/* Form actions */}
          {renderStepperNavigation()}
          {renderRegularFormActions()}
        </form>       
      </>
    );
  };

  return getMainContent();
}
