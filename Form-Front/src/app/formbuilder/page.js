'use client';
import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  TouchSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';
import { FaGripVertical, FaPlusCircle } from 'react-icons/fa';
import { useFormContext } from '../components/FormContext';
import FormPreview from '../preview/page';
import { submitform } from '../../done/common';
import { fieldTypeIcons, fileUploadIcon, StatusCode } from '../../utils/commonEnum';

// Component for each draggable field in the form
const SortableField = ({
  field,
  index,
  updateField,
  removeField,
  formType,
  totalSteps,
  stepNames,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: field.id });

  const [activeTab, setActiveTab] = useState('basic');

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    updateField(field.id, 'file', file);
    updateField(field.id, 'fileName', file ? file.name : '');
  };

  const handleValidationChange = (key, value, checked = null) => {
    const currentValidation = field.validation || {};

    if (checked !== null) {
      // For checkbox inputs
      if (checked) {
        updateField(field.id, 'validation', {
          ...currentValidation,
          [key]: value
        });
      } else {
        const { [key]: removed, ...rest } = currentValidation;
        updateField(field.id, 'validation', rest);
      }
    } else {
      // For regular inputs
      updateField(field.id, 'validation', {
        ...currentValidation,
        [key]: value
      });
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="mb-4 border-1 rounded-xs bg-white shadow-sm"
    >
      {/* Field Header */}
      <div className="flex justify-between items-center p-3 border-b bg-gray-50">
        <div className="flex items-center gap-2">
          <div {...attributes} {...listeners} className="cursor-grab">
            <FaGripVertical className="text-gray-400" />
          </div>
          <strong className="text-sm">
            New Field ({field.type})
          </strong>
        </div>
        <div className="items-center gap-2">
          <button
            onClick={() => removeField(field.id)}
            className="p-1 text-gray-400 hover:text-red-500"
            title="Remove Field"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="m19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b bg-gray-50">
        <button
          onClick={() => setActiveTab('basic')}
          className={`px-4 py-2 text-sm font-medium ${activeTab === 'basic'
              ? 'text-emerald-500 border-b-2 border-emerald-500 bg-white'
              : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          Basic
        </button>
        <button
          onClick={() => setActiveTab('validation')}
          className={`px-4 py-2 text-sm font-medium ${activeTab === 'validation'
              ? 'text-red-500 border-b-2 border-red-500 bg-white'
              : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          Validation
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'basic' && (
          <div className="space-y-4">
            {/* Field Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Field Type</label>
                <select
                  value={field.type}
                  onChange={(e) => updateField(field.id, 'type', e.target.value)}
                  className="w-full border-1 border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="number">Number</option>
                  <option value="textarea">Textarea</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="radio">Radio Buttons</option>
                  <option value="select">Select</option>
                  <option value="date">Date</option>
                  <option value="file">File Upload</option>
                </select>
              </div>

              {/* Field Label */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Field Label</label>
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) => updateField(field.id, 'label', e.target.value)}
                  className="w-full border-1 border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="New Field"
                />
              </div>
            </div>

            {/* Placeholder */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
              <input
                type="text"
                value={field.placeholder || ''}
                onChange={(e) => updateField(field.id, 'placeholder', e.target.value)}
                className="w-full border-1 border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter placeholder text"
              />
            </div>

            {/* Options for radio/select */}
            {(field.type === 'radio' || field.type === 'select') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Options (comma separated)</label>
                <input
                  type="text"
                  value={field.options || ''}
                  onChange={(e) => updateField(field.id, 'options', e.target.value)}
                  className="w-full border-1 border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Option 1, Option 2, Option 3"
                />
              </div>
            )}

            {/* Upload File Field */}
            {field.type === 'file' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
                <input
                  type="file"
                  className="w-full border-1 border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  accept={field.accept}
                  onChange={handleFileChange}
                />
                {field.fileName && (
                  <div className="mt-1 text-sm text-gray-600">Selected: {field.fileName}</div>
                )}
              </div>
            )}

            {/* Required Field Toggle */}
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={field.required || false}
                    onChange={(e) => updateField(field.id, 'required', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`block w-10 h-6 rounded-full ${field.required ? 'bg-black' : 'bg-gray-300'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${field.required ? 'transform translate-x-4' : ''}`}></div>
                </div>
                <span className="ml-3 text-sm font-medium text-gray-700">Required field</span>
              </label>
            </div>

            {/* Stepper step selection */}
            {formType === 'stepper' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Step</label>
                <select
                  value={field.step || 1}
                  onChange={(e) => updateField(field.id, 'step', parseInt(e.target.value))}
                  className="w-full border-1 border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                >
                  {[...Array(totalSteps)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      Step {i + 1}: {stepNames[i] || `Step ${i + 1}`}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {activeTab === 'validation' && (
          <div className="space-y-4">
            {/* Min Length for text fields */}
            {field.type === 'text' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Min Length</label>
                  <input
                    type="number"
                    value={field.validation?.minLength || ''}
                    onChange={(e) => handleValidationChange('minLength', parseInt(e.target.value) || '')}
                    className="w-full border-1 border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Min length"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Max Length</label>
                  <input
                    type="number"
                    value={field.validation?.maxLength || ''}
                    onChange={(e) => handleValidationChange('maxLength', parseInt(e.target.value) || '')}
                    className="w-full border-1 border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Max length"
                    min="0"
                  />
                </div>
              </div>
            )}

            {/* Min/Max Value for number fields */}
            {field.type === 'number' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Min Value</label>
                  <input
                    type="number"
                    value={field.validation?.min || ''}
                    onChange={(e) => handleValidationChange('min', parseInt(e.target.value) || '')}
                    className="w-full border-1 border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Min value"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Max Value</label>
                  <input
                    type="number"
                    value={field.validation?.max || ''}
                    onChange={(e) => handleValidationChange('max', parseInt(e.target.value) || '')}
                    className="w-full border-1 border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Max value"
                  />
                </div>
              </div>
            )}

            {/* Pattern (Regex) for text fields */}
            {(field.type === 'text' || field.type === 'email') && (
              <div>
                <label className="block text-sm font-medium mb-1">Pattern (Regex)</label>
                <input
                  type="text"
                  value={field.validation?.pattern || ''}
                  onChange={(e) => handleValidationChange('pattern', e.target.value)}
                  className="w-full border-1 border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Regular expression pattern"
                />
              </div>
            )}

            {/* Custom Error Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Custom Error Message</label>
              <input
                type="text"
                value={field.validation?.errorMessage || ''}
                onChange={(e) => handleValidationChange('errorMessage', e.target.value)}
                className="w-full border-1 border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Custom error message"
              />
            </div>

            {/* File validation for file upload */}
            {field.type === 'file' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Accepted File Types</label>
                  <input
                    type="text"
                    value={field.validation?.accept || ''}
                    onChange={(e) => handleValidationChange('accept', e.target.value)}
                    className="w-full border-1 border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="e.g., .jpg,.png,.pdf"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Max File Size (MB)</label>
                  <input
                    type="number"
                    value={field.validation?.maxSize || ''}
                    onChange={(e) => handleValidationChange('maxSize', parseInt(e.target.value) || '')}
                    className="w-full border-1 border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Max file size in MB"
                    min="1"
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Field type components for the draggable toolbox
// const FieldTypeItem = ({ type, label, icon, onDragStart }) => {
//   return (
//     <div
//       className="flex items-center gap-2 p-2 border-1 rounded-md bg-white mb-2 cursor-grab"
//       draggable
//       // onDragStart={(e) => {
//       //   e.dataTransfer.setData('fieldType', type);
//       //   if (onDragStart) onDragStart(type);
//       // }}
//       onDragStart={(e) => {
//         e.dataTransfer.setData('fieldType', type);
//         if (onDragStart) onDragStart(type);
//       }}
//       onTouchStart={() => {
//         // Store the type for mobile-based drop simulation
//         if (onDragStart) onDragStart(type);
//       }}
//     >
//       {icon}
//       <span>{label}</span>
//     </div>
//   );
// };

// components/FieldTypeItem.jsx
function FieldTypeItem({ type, label, icon, onDragStart }) {
  return (
    <div
      className="flex items-center gap-2 p-2 border-1 rounded-md bg-white mb-2 cursor-grab select-none"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('fieldType', type);
        if (onDragStart) onDragStart(type); // Save type to state
      }}
      onTouchStart={() => {
        if (onDragStart) onDragStart(type); // Touch drag start
      }}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from "../../utils/SnackbarProvider";

// Validation schema
const validationSchema = Yup.object({
  formTitle: Yup.string()
    .required('Form title is required')
    .min(3, 'Form title must be at least 3 characters')
    .max(100, 'Form title must be less than 100 characters'),

  formUrl: Yup.string()
    .required('Form URL is required')
    .matches(
      /^(?!.*--)(?!-)(?!.*-$)[a-z0-9-]+$/,
      'Form URL can only contain lowercase letters, numbers, and hyphens (no spaces or special characters)'
    )
    .min(3, 'Form URL must be at least 3 characters')
    .max(50, 'Form URL must be less than 50 characters'),

  formType: Yup.string()
    .required('Form type is required')
    .oneOf(['single', 'stepper'], 'Invalid form type'),

  fields: Yup.array()
    .of(
      Yup.object({
        id: Yup.number().required(),
        label: Yup.string()
          .required('Field label is required')
          .min(1, 'Field label cannot be empty'),
        type: Yup.string()
          .required('Field type is required')
          .oneOf(['text', 'email', 'number', 'textarea', 'checkbox', 'radio', 'select', 'date', 'file'], 'Invalid field type'),
        required: Yup.boolean(),
        step: Yup.number().when('$formType', {
          is: 'stepper',
          then: (schema) => schema.min(1, 'Step must be at least 1'),
          otherwise: (schema) => schema.nullable()
        }),
        options: Yup.string().when('type', {
          is: (type) => ['radio', 'select'].includes(type),
          then: (schema) => schema.required('Options are required for radio and select fields'),
          otherwise: (schema) => schema.nullable()
        }),
        accept: Yup.string().when('type', {
          is: 'file',
          then: (schema) => schema.nullable(),
          otherwise: (schema) => schema.nullable()
        }),
        maxSizeMB: Yup.number().when('type', {
          is: 'file',
          then: (schema) => schema.min(1, 'Max size must be at least 1MB').max(100, 'Max size cannot exceed 100MB'),
          otherwise: (schema) => schema.nullable()
        })
      })
    )
    .min(1, 'At least one field is required'),

  totalSteps: Yup.number().when('formType', {
    is: 'stepper',
    then: (schema) => schema.min(1, 'At least one step is required').max(10, 'Maximum 10 steps allowed'),
    otherwise: (schema) => schema.nullable()
  }),

  stepNames: Yup.array().when('formType', {
    is: 'stepper',
    then: (schema) => schema.of(
      Yup.string().required('Step name is required').min(1, 'Step name cannot be empty')
    ),
    otherwise: (schema) => schema.nullable()
  })
});

export default function FormBuilder() {
  const {
    formType,
    setFormType,
    formTitle,
    setFormTitle,
    formUrl,
    setFormUrl,
    fields,
    setFields,
    activeStep,
    setActiveStep,
    totalSteps,
    setTotalSteps,
    stepNames,
    setStepNames
  } = useFormContext();

  const { showSnackbar } = useSnackbar();
  // State for filtered fields in stepper mode
  const [currentStepFields, setCurrentStepFields] = useState([]);

  // Drag and drop state
  const [activeId, setActiveId] = useState(null);
  const [dragActiveFieldType, setDragActiveFieldType] = useState(null);

  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Formik setup
  const formik = useFormik({
    initialValues: {
      formTitle: formTitle || '',
      formUrl: formUrl || '',
      formType: formType || 'single',
      fields: fields || [],
      totalSteps: totalSteps || 1,
      stepNames: stepNames || ['Step 1'],
      activeStep: activeStep || 0
    },
    validationSchema: validationSchema,
    enableReinitialize: true, // This allows formik to reinitialize when initial values change
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await handleSave(values);
      } catch (error) {
        showSnackbar("Save error:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Sync formik values with context state
  useEffect(() => {
    formik.setValues({
      formTitle,
      formUrl,
      formType,
      fields,
      totalSteps,
      stepNames,
      activeStep
    });
  }, [formTitle, formUrl, formType, fields, totalSteps, stepNames, activeStep]);

  useEffect(() => {
    if (formType === 'stepper') {
      setFields(prevFields =>
        prevFields.map((field) => {
          if (field.step) {
            const index = field.step - 1; // assuming step is 1-based
            return {
              ...field,
              stepName: stepNames[index] || `Step ${field.step}`,
            };
          }
          return field;
        })
      );
    }
  }, [stepNames, formType]);

  const handleSave = async (values) => {
    // Validate using formik
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      formik.setTouched({
        formTitle: true,
        formUrl: true,
        formType: true,
        fields: true,
        totalSteps: true,
        stepNames: true
      });
      showSnackbar("Please fix validation errors before saving.", "error");
      return;
    }

    // Prepare the data to send
    // const normalizedFields = values.fields.map(({ required, validation = {}, stepName, ...rest }) => ({
    //   ...rest,
    //   validation: {
    //     required: required ?? false,
    //     ...validation,
    //   },
    //   stepName: stepName || `Step ${rest.step || 1}`,
    // }));

    const normalizedFields = fields.map((field) => {
      const { validation = {}, required, stepName, ...rest } = field;
      return {
        ...rest,
        validation: {
          ...validation, // Also keep in validation if needed
          required: required ?? false,
        },
        stepName: stepName || `Step ${field.step || 1}`,
      };
    });

    const dataToSend = {
      formTitle: values.formTitle,
      formType: values.formType,
      formUrl: values.formUrl,
      fields: normalizedFields,
      created_by: 1
    };


    try {
      const response = await submitform(dataToSend);

      if (response.statusCode == StatusCode.success) {
        const result = await response;
        showSnackbar(result.message, "success");
        // toast.success(result.message || "Form saved successfully!");
        resetFormAndState();
      } else {
        const errorData = await response;
        showSnackbar(errorData.message, "error");
        // toast.error(errorData.message || "Failed to save form.");
      }
    } catch (error) {
      showSnackbar(error.message, "error");
      // toast.error("An error occurred while saving the form.");
    }
  };

  // restet function 
  // Define the reset function
  const resetFormAndState = () => {
    // Reset Formik form to initial values
    formik.resetForm();

    // Reset your external states
    setFields([]);
    setFormTitle('');
    setFormUrl('');
    setFormType('single'); // or your default form type
    setActiveStep(0);
    setTotalSteps(1);
    setStepNames([]);
  };

  // Sync filtered fields when fields or activeStep change
  useEffect(() => {
    if (formType === 'stepper') {
      setCurrentStepFields(fields.filter((f) => !f.step || f.step === activeStep));
    } else {
      setCurrentStepFields(fields);
    }
  }, [fields, activeStep, formType]);

  const handleFormTypeChange = (value) => {
    if (value !== formType) {
      const shouldChange = window.confirm(
        'Changing form type will reset your current form. Are you sure you want to continue?'
      );
      if (shouldChange) {
        setFormType(value);
        setFields([]);
        formik.setFieldValue('formType', value);
        formik.setFieldValue('fields', []);
      }
    }
  };

  const updateField = (id, key, value) => {
    const updatedFields = fields.map((field) => {
      if (field.id === id) {
        if (key === null) {
          return value;
        }
        return { ...field, [key]: value };
      }
      return field;
    });
    setFields(updatedFields);
    formik.setFieldValue('fields', updatedFields);
  };

  const removeField = (id) => {
    const updatedFields = fields.filter((field) => field.id !== id);
    setFields(updatedFields);
    formik.setFieldValue('fields', updatedFields);
  };

  const handleStepNameChange = (index, value) => {
    const newStepNames = [...stepNames];
    newStepNames[index] = value;
    setStepNames(newStepNames);
    formik.setFieldValue('stepNames', newStepNames);
  };

  const createNewField = (type) => {
    const newField = {
      id: Date.now(),
      label: getDefaultLabelForType(type),
      type,
      required: false,
      validation: {}
    };
    if (type === 'radio' || type === 'select') {
      newField.options = 'Option 1, Option 2, Option 3';
    }
    if (formType === 'stepper') {
      newField.step = activeStep;
    }
    if (type === 'file') {
      newField.accept = '';
      newField.maxSizeMB = 10;
      newField.file = null;
      newField.fileName = '';
    }
    return newField;
  };

  const getDefaultLabelForType = (type) => {
    const labels = {
      text: 'Text Field',
      email: 'Email Address',
      number: 'Number Field',
      textarea: 'Long Text',
      checkbox: 'Checkbox Option',
      radio: 'Radio Group',
      select: 'Dropdown',
      date: 'Date',
      file: 'File Upload',
    };
    return labels[type] || 'New Field';
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setFields((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newFields = arrayMove(items, oldIndex, newIndex);
        formik.setFieldValue('fields', newFields);
        return newFields;
      });
    }
    setActiveId(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const fieldType = e.dataTransfer.getData('fieldType');
    if (fieldType) {
      const newField = createNewField(fieldType);
      const updatedFields = [...fields, newField];
      setFields(updatedFields);
      formik.setFieldValue('fields', updatedFields);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const getFieldsForCurrentStep = () => {
    if (formType !== 'stepper' || activeStep === 0) {
      return fields;
    }
    return fields.filter((f) => !f.step || f.step === activeStep);
  };

  return (
    <>
     <h1 className="text-3xl font-bold text-center mb-8">FORM BUILDER</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {/* Form Preview */}
          <div className="lg:w-sm bg-white rounded-xl border-1 p-4 shadow-sm">
            <h3 className="text-xl font-semibold mb-1">Form Preview</h3>
            <p className="text-xs text-gray-500 mb-4">
              This is a live preview of how your form will look.
            </p>
            <div className="field-types-toolbox">
              <FormPreview />
            </div>
          </div>

          {/* Main Form Builder Area */}
          <div className="bg-white rounded-xl border-1 p-6 shadow-sm flex-grow">
            <h2 className="text-xl font-semibold mb-1">Form Builder</h2>
            <p className="text-sm text-gray-500 mb-4">Configure your form structure and fields</p>

            {/* Form Type Selection */}
            <h3 className="text-sm font-medium mb-3">Select Form Type</h3>
            <div className="form-type-options grid sm:grid-cols-2 gap-4 mb-6">
              {/* Single Step */}
              <div>
                <input
                  type="radio"
                  id="single"
                  name="formType"
                  value="single"
                  checked={formik.values.formType === 'single'}
                  onChange={(e) => {
                    formik.handleChange(e);
                    handleFormTypeChange('single');
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="single"
                  className={`cursor-pointer border-1 rounded-lg p-4 flex gap-3 items-center ${formik.values.formType === 'single' ? 'border-black' : 'border-gray-300 hover:border-gray-500'
                    }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-base">Single Step Form</h4>
                    <p className="text-xs text-gray-500">All fields on one page</p>
                  </div>
                </label>
              </div>

              {/* Multi Step */}
              <div>
                <input
                  type="radio"
                  id="stepper"
                  name="formType"
                  value="stepper"
                  checked={formik.values.formType === 'stepper'}
                  onChange={(e) => {
                    formik.handleChange(e);
                    handleFormTypeChange('stepper');
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="stepper"
                  className={`cursor-pointer border-1 rounded-lg p-4 flex gap-3 items-center ${formik.values.formType === 'stepper' ? 'border-black' : 'border-gray-300 hover:border-gray-500'
                    }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-base">Multi-Step Form</h4>
                    <p className="text-xs text-gray-500">Fields organized in steps</p>
                  </div>
                </label>
              </div>
            </div>
            {formik.touched.formType && formik.errors.formType && (
              <div className="text-red-500 text-sm mb-4">{formik.errors.formType}</div>
            )}

            {/* Form Title */}
            <label className="block text-sm font-medium mb-1">
              Form Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="formTitle"
              value={formik.values.formTitle}
              onChange={(e) => {
                formik.handleChange(e);
                setFormTitle(e.target.value);
              }}
              onBlur={formik.handleBlur}
              className={`w-full border-1 px-3 py-2 rounded-md mb-2 ${formik.touched.formTitle && formik.errors.formTitle ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter form title"
            />
            {formik.touched.formTitle && formik.errors.formTitle && (
              <div className="text-red-500 text-sm mb-4">{formik.errors.formTitle}</div>
            )}

            {/* Form URL */}
            <label className="block text-sm font-medium mb-1">
              Form URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="formUrl"
              value={formik.values.formUrl}
              onChange={(e) => {
                const value = e.target.value.toLowerCase();
                formik.setFieldValue('formUrl', value);
                setFormUrl(value);
              }}
              onBlur={formik.handleBlur}
              className={`w-full border-1 px-3 py-2 rounded-md mb-2 ${formik.touched.formUrl && formik.errors.formUrl ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="enter-form-url"
            />
            {formik.touched.formUrl && formik.errors.formUrl && (
              <div className="text-red-500 text-sm mb-4">{formik.errors.formUrl}</div>
            )}

            {/* Step Configuration for Multi-Step Forms */}
            {formik.values.formType === 'stepper' && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Step Configuration</h3>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="p-1 border-1 rounded hover:bg-gray-50"
                      onClick={() => {
                        if (totalSteps > 1) {
                          const newTotalSteps = totalSteps - 1;
                          const newStepNames = stepNames.slice(0, -1);
                          setTotalSteps(newTotalSteps);
                          setStepNames(newStepNames);
                          formik.setFieldValue('totalSteps', newTotalSteps);
                          formik.setFieldValue('stepNames', newStepNames);

                          // Update fields' step if needed
                          setFields((prevFields) =>
                            prevFields.map((field) => {
                              if (field.step > newTotalSteps) {
                                return { ...field, step: newTotalSteps };
                              }
                              return field;
                            })
                          );

                          // Make sure activeStep is valid
                          if (activeStep > newTotalSteps) {
                            setActiveStep(newTotalSteps);
                          }
                        }
                      }}
                      disabled={totalSteps <= 1}
                    >
                      -
                    </button>
                    <span className="text-sm">{totalSteps} Steps</span>
                    <button
                      type="button"
                      className="p-1 border-1 rounded hover:bg-gray-50"
                      onClick={() => {
                        const newTotalSteps = totalSteps + 1;
                        const newStepNames = [...stepNames, `Step ${newTotalSteps}`];
                        setTotalSteps(newTotalSteps);
                        setStepNames(newStepNames);
                        formik.setFieldValue('totalSteps', newTotalSteps);
                        formik.setFieldValue('stepNames', newStepNames);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="border-1 rounded-md p-3 bg-gray-50">
                  {[...Array(totalSteps)].map((_, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium w-16">Step {index + 1}:</span>
                      <input
                        type="text"
                        value={stepNames[index] || ''}
                        onChange={(e) => handleStepNameChange(index, e.target.value)}
                        className="flex-1 border-1 rounded px-2 py-1 text-sm"
                        placeholder={`Step ${index + 1} Name`}
                      />
                    </div>
                  ))}
                </div>
                {formik.touched.stepNames && formik.errors.stepNames && (
                  <div className="text-red-500 text-sm mt-2">{formik.errors.stepNames}</div>
                )}
              </div>
            )}

            {/* Fields Header */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">
                Form Fields <span className="text-red-500">*</span>
              </h3>
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-1.5 bg-black text-white text-sm rounded-md"
                onClick={() => {
                  const newField = createNewField('text');
                  const updatedFields = [...fields, newField];
                  setFields(updatedFields);
                  formik.setFieldValue('fields', updatedFields);
                }}
              >
                <FaPlusCircle className="text-sm" />
                Add Field
              </button>
            </div>

            {/* Display field validation errors */}
            {formik.touched.fields && formik.errors.fields && typeof formik.errors.fields === 'string' && (
              <div className="text-red-500 text-sm mb-4">{formik.errors.fields}</div>
            )}

            {/* Preview Tabs for Multi-Step */}
            {formik.values.formType === 'stepper' && (
              <div className="mb-4">
                <div className="flex border-b">
                  <button
                    type="button"
                    className={`py-2 px-4 text-sm ${activeStep === 0
                        ? 'border-b-2 border-black font-medium'
                        : 'text-gray-500'
                      }`}
                    onClick={() => setActiveStep(0)}
                  >
                    All Fields
                  </button>
                  {[...Array(totalSteps)].map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`py-2 px-4 text-sm ${activeStep === index + 1
                          ? 'border-b-2 border-black font-medium'
                          : 'text-gray-500'
                        }`}
                      onClick={() => setActiveStep(index + 1)}
                    >
                      Step {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div
              className="border-1 rounded-md p-4 text-sm text-gray-700 min-h-[200px]"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onTouchEnd={() => {
                // Handle mobile drop
                if (dragActiveFieldType) {
                  const newField = createNewField(dragActiveFieldType);
                  const updatedFields = [...fields, newField];
                  setFields(updatedFields);
                  formik.setFieldValue('fields', updatedFields);
                  setDragActiveFieldType(null);
                }
              }}
            >
              {fields.length === 0 && (
                <div className="flex flex-col items-center justify-center h-32 text-gray-500 border-2 border-dashed rounded-lg">
                  <p>Drag and drop fields here or click "Add Field"</p>
                </div>
              )}

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={(event) => setActiveId(event.active.id)}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
              >
                <div className="touch-none">
                  <SortableContext
                    items={getFieldsForCurrentStep().map((f) => f.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {getFieldsForCurrentStep().map((field, idx) => (
                      <SortableField
                        key={field.id}
                        field={field}
                        index={idx}
                        updateField={updateField}
                        removeField={removeField}
                        formType={formType}
                        totalSteps={totalSteps}
                        stepNames={stepNames}
                        errors={formik.errors.fields && formik.errors.fields[idx]}
                        touched={formik.touched.fields && formik.touched.fields[idx]}
                      />
                    ))}
                  </SortableContext>
                </div>
              </DndContext>
            </div>

          </div>

          {/* Field Types Sidebar */}
          <div className="lg:w-64 bg-white rounded-xl border-1 p-4 shadow-sm">
            <h3 className="text-xl font-semibold mb-1">Field Types</h3>
            <p className="text-xs text-gray-500 mb-4">
              Drag and drop to add fields to your form
            </p>

            <div className="field-types-toolbox">
              <FieldTypeItem
                type="text"
                label="Text Input"
                icon={fieldTypeIcons.text}
                onDragStart={setDragActiveFieldType}
              />
              <FieldTypeItem
                type="email"
                label="Email"
                icon={fieldTypeIcons.email}
                onDragStart={setDragActiveFieldType}
              />
              <FieldTypeItem
                type="number"
                label="Number"
                icon={fieldTypeIcons.number}
                onDragStart={setDragActiveFieldType}
              />
              <FieldTypeItem
                type="textarea"
                label="Text Area"
                icon={fieldTypeIcons.textarea}
                onDragStart={setDragActiveFieldType}
              />
              <FieldTypeItem
                type="checkbox"
                label="Checkbox"
                icon={fieldTypeIcons.checkbox}
                onDragStart={setDragActiveFieldType}
              />
              <FieldTypeItem
                type="radio"
                label="Radio Group"
                icon={fieldTypeIcons.radio}
                onDragStart={setDragActiveFieldType}
              />
              <FieldTypeItem
                type="select"
                label="Dropdown"
                icon={fieldTypeIcons.select}
                onDragStart={setDragActiveFieldType}
              />
              <FieldTypeItem
                type="date"
                label="Date Picker"
                icon={fieldTypeIcons.date}
                onDragStart={setDragActiveFieldType}
              />
              <FieldTypeItem
                type="file"
                label="File Upload"
                icon={fileUploadIcon}
                onDragStart={setDragActiveFieldType}
              />
            </div>

            {/* Actions */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Form Actions</h3>
              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-full px-3 py-2 bg-black text-white text-sm rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {formik.isSubmitting ? 'Saving...' : 'Save Form'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}