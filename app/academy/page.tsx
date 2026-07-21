import { Suspense } from 'react';
import AcademyClient from './AcademyClient';

export default function AcademyPage() {
  return (
    <Suspense fallback={<div>Loading Academy...</div>}>
      <AcademyClient />
    </Suspense>
  );
}
