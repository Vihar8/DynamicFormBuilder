import React, { Suspense } from "react";
import FormResponsePage from "./[id]/page.jsx"; // this is your client component

export default function PublishedFormPage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <FormResponsePage />
    </Suspense>
  );
}
