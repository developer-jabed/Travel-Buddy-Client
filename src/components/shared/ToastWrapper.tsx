"use client";

import { Suspense } from "react";
import LoginSuccessToast from "./LoginSuccessToast";
import LogoutSuccessToast from "./LogoutSuccessToast";

export default function ToastWrapper() {
  return (
    <Suspense fallback={null}>
      <LoginSuccessToast />
      <LogoutSuccessToast />
    </Suspense>
  );
}
