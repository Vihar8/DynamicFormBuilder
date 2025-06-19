'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from '../components/FormContext';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography
} from '@mui/material';

function FieldPreview({ field, value, onChange }) {
  const { id, label, type, required, options = [] } = field;

  // Parse options string into array if it's a string
  const optionsArray = typeof options === 'string'
    ? options.split(',').map(opt => opt.trim())
    : options;

  switch (type) {
    case 'textarea':
      return (
        <div className="mb-4">
          <label htmlFor={id} className="block mb-1 font-medium text-black">
            {label} {required && <span className='text-red-500'>*</span>}
          </label>
          <textarea
            id={id}
            required={required}
            value={value || ''}
            onChange={(e) => onChange(id, e.target.value, label)}
            className="w-full border-1 border-black rounded px-3 py-2"
            rows={4}
          />
        </div>
      );
    case 'checkbox':
      return (
        <div className="mb-4 flex items-center gap-2">
          <input
            id={id}
            type="checkbox"
            checked={value || false}
            onChange={(e) => onChange(id, e.target.checked, label)}
            className="accent-black"
          />
          <label htmlFor={id} className="font-medium text-black">
            {label} {required && <span className='text-red-500'>*</span>}
          </label>
        </div>
      );
    case 'radio':
      return (
        <div className="mb-4">
          <fieldset>
            <legend className="block mb-1 font-medium text-black">
              {label} {required && <span className='text-red-500'>*</span>}
            </legend>
            {optionsArray.map((option, idx) => (
              <div key={idx} className="flex items-center gap-2 mt-1">
                <input
                  id={`${id}-${idx}`}
                  name={id}
                  type="radio"
                  value={option}
                  checked={value === option}
                  onChange={() => onChange(id, option, label)}
                  className="accent-black"
                  required={required && idx === 0}
                />
                <label htmlFor={`${id}-${idx}`} className="text-black">
                  {option}
                </label>
              </div>
            ))}
          </fieldset>
        </div>
      );
    case 'select':
      return (
        <div className="mb-4">
          <label htmlFor={id} className="block mb-1 font-medium text-black">
            {label} {required && <span className='text-red-500'>*</span>}
          </label>
          <select
            id={id}
            required={required}
            value={value || ''}
            onChange={(e) => onChange(id, e.target.value, label)}
            className="w-full border-1 border-black rounded px-3 py-2"
          >
            <option value="">Select an option</option>
            {optionsArray.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      );
    case 'date':
      return (
        <div className="mb-4">
          <label htmlFor={id} className="block mb-1 font-medium text-black">
            {label} {required && <span className='text-red-500'>*</span>}
          </label>
          <input
            id={id}
            type="date"
            required={required}
            value={value || ''}
            onChange={(e) => onChange(id, e.target.value, label)}
            className="w-full border-1 border-black rounded px-3 py-2"
          />
        </div>
      );
    case 'file':
      return (
        <div className="mb-4">
          <label htmlFor={id} className="block mb-1 font-medium text-black">
            {label} {required && <span className='text-red-500'>*</span>}
          </label>
          <input
            id={id}
            type="file"
            required={required}
            onChange={(e) => {
              const file = e.target.files[0];
              onChange(id, file ? file.name : '', label);
            }}
            className="w-full border-1 border-black rounded px-3 py-2"
          />
        </div>
      );
    default:
      return (
        <div className="mb-4">
          <label htmlFor={id} className="block mb-1 font-medium text-black">
            {label} {required && <span className='text-red-500'>*</span>}
          </label>
          <input
            id={id}
            type={type}
            required={required}
            value={value || ''}
            onChange={(e) => onChange(id, e.target.value, label)}
            className="w-full border-1 border-black rounded px-3 py-2"
          />
        </div>
      );
  }
}

export default function FormPreview() {
  const { formTitle, fields, stepNames, setStepNames } = useFormContext();
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [namedFormData, setNamedFormData] = useState({}); // Store data with field names as keys
  const [loading, setLoading] = useState(false);
  const prevStepNamesRef = useRef();
  // const [dynamicStepNames, setDynamicStepNames] = useState([]);

  const maxStep = Math.max(
    ...fields.map((f) => f.step || 1),
    1
  );


  const filteredFields = fields.filter((field) => {
    return field.step === activeStep || typeof field.step === 'undefined';
  });

  const handleNext = () => {
    if (activeStep < maxStep) setActiveStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (activeStep > 1) setActiveStep((prev) => prev - 1);
  };

  const handleChange = (id, value, label) => {
    // Store data with both ID and name-based references
    setFormData((prev) => ({ ...prev, [id]: value }));
    setNamedFormData((prev) => ({ ...prev, [label]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeStep < maxStep) return;

    // try {
    // setLoading(true);

    // // Display both ID-based and name-based data
    // console.log("Form data by ID:", formData);
    // console.log("Form data by field name:", namedFormData);

    // alert('Form submitted successfully!');
    // } catch (error) {
    // console.error('Submission error:', error);
    // alert('Failed to submit the form');
    // } finally {
    // setLoading(false);
    // }
    console.log("Form data by ID:", formData);
    console.log("Form data by field name:", namedFormData);
    alert('Preview Complete!');
  };

  // useEffect(() => {
  // console.log('fields or maxStep changed:', fields, maxStep);
  // if (fields.length > 0) {
  // const stepNameMap = {};
  // fields.forEach(field => {
  // if (field.step && field.stepName) {
  // stepNameMap[field.step] = field.stepName;
  // }
  // });
  // const orderedStepNames = [];
  // for (let i = 1; i <= maxStep; i++) {
  // orderedStepNames.push(stepNameMap[i] || `Step ${i}`);
  // }
  // // setDynamicStepNames(orderedStepNames);
  // setStepNames(orderedStepNames); // Use orderedStepNames directly instead of dynamicStepNames
  // }
  // }, [fields, maxStep]);


  useEffect(() => {
    if (fields.length > 0) {
      const stepNameMap = {};
      fields.forEach(field => {
        if (field.step && field.stepName) {
          stepNameMap[field.step] = field.stepName;
        }
      });
      const orderedStepNames = [];
      for (let i = 1; i <= maxStep; i++) {
        orderedStepNames.push(stepNameMap[i] || `Step ${i}`);
      }
      // Only update if different
      if (
        !prevStepNamesRef.current ||
        JSON.stringify(prevStepNamesRef.current) !== JSON.stringify(orderedStepNames)
      ) {
        prevStepNamesRef.current = orderedStepNames;
        setStepNames(orderedStepNames);
      }
    }
  }, [fields, maxStep]);


  const renderStepper = () => {
    if (maxStep <= 1) return null; // No need for stepper if only one step

    const stepsToRender = stepNames.length > 0
      ? stepNames
      : Array.from({ length: maxStep }, (_, i) => `Step ${i + 1}`);
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
  return (
    <div className="max-w-xl mx-auto border-1 border-black rounded-md p-6 bg-white">
      {renderStepper()}

      <Typography variant="h6" className="text-black mb-6 font-bold">
        {formTitle}
      </Typography>

      <form onSubmit={handleSubmit}>
        {filteredFields.map((field) => (
          <FieldPreview
            key={field.id}
            field={field}
            value={formData[field.id]}
            onChange={handleChange}
          />
        ))}

        {filteredFields.length > 0 && (
          <div className="flex justify-between mt-4">
            <Button
              onClick={handlePrevious}
              disabled={activeStep === 1}
              variant="outlined"
              sx={{ color: 'black', borderColor: 'black' }}
            >
              Previous
            </Button>

            {activeStep < maxStep ? (
              <Button
                onClick={handleNext}
                variant="outlined"
                sx={{ color: 'black', borderColor: 'black' }}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                variant="outlined"
                sx={{ color: 'black', borderColor: 'black' }}
              >
                Preview Complete
              </Button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
