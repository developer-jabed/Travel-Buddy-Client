"use client";

import { loginUser } from "@/services/auth/loginUser";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const fillUserLogin = () => {
    setEmail("user@gmail.com");
    setPassword("jabed1780");
  };

  const fillAdminLogin = () => {
    setEmail("jabed1780@gmail.com");
    setPassword("jabed1780");
  };

  return (
    <form action={formAction} className="space-y-4">

      {/* Quick Login (compact) */}
      <div className="flex flex-col gap-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="w-full"
          onClick={fillUserLogin}
        >
          Login As User
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          className="w-full"
          onClick={fillAdminLogin}
        >
          Login As Admin
        </Button>
      </div>

      {redirect && <input type="hidden" name="redirect" value={redirect} />}

      <FieldGroup>
        <div className="grid gap-3">
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputFieldError field="email" state={state} />
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputFieldError field="password" state={state} />
          </Field>
        </div>

        <Field className="mt-4">
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Logging in..." : "Login"}
          </Button>

          <FieldDescription className="text-center mt-2">
            <a href="/register" className="text-blue-600 hover:underline">
              Create account
            </a>{" "}
            ·{" "}
            <a href="/forget-password" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
