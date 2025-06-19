'use client';
import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export function FormProvider({ children }) {
  const [formType, setFormType] = useState('single');
  const [formTitle, setFormTitle] = useState('My Form');
  const [formUrl, setFormUrl] = useState('');
  const [fields, setFields] = useState([]);
  const [activeStep, setActiveStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(2);
  const [stepNames, setStepNames] = useState(['Personal Info', 'Contact Details']);


  return (
    <FormContext.Provider
      value={{
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
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  return useContext(FormContext);
}
