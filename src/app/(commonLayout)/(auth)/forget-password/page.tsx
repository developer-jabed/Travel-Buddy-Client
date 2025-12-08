
import { Suspense } from "react";
export const dynamic = "force-dynamic";


export default function ForgetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <h1>hello</h1>
    </Suspense>
  );
}
