// 'use client';
// import React from 'react';
// import { useFormContext } from './FormContext';

// export default function FormExport() {
//   const { formTitle, formType, fields } = useFormContext();

//   const exportData = {
//     formTitle,
//     formType,
//     fields,
//   };

//   return (
//     <div className="max-w-6xl mx-auto bg-white border rounded-md p-6">
//       <h2 className="text-xl font-semibold mb-4">Export Form JSON</h2>
//       <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto max-h-[400px]">
//         {JSON.stringify(exportData, null, 2)}
//       </pre>
//     </div>
//   );
// }

'use client';
import React from 'react';
import { useFormContext } from '../components/FormContext';

export default function FormExport() {
  const { formTitle, formType, fields } = useFormContext();

  const normalizedFields = fields.map(({ required, validation = {}, ...rest }) => ({
    ...rest,
    validation: {
      required: required ?? false,
      ...validation, 
    },
  }));

  const exportData = {
    formTitle,
    formType,
    fields: normalizedFields,
  };

  return (
    <div className="max-w-3xl mx-auto bg-white border rounded-md p-6">
      <h2 className="text-xl font-semibold mb-4">Export Form JSON</h2>
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto max-h-[400px]">
        {JSON.stringify(exportData, null, 2)}
      </pre>
    </div>
  );
}
