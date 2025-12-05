"use client";

import { useState } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { IInputErrorState } from "@/lib/getInputFieldError";
import { useRouter } from "next/navigation";
import { registerAndLoginTraveler } from "@/services/auth/registerTraveler";

type Gender = "Male" | "Female" | "Other";
type TravelStyle = "BUDGET" | "LUXURY" | "ADVENTURE" | "SOLO" | "BACKPACKING" | "FAMILY" | "FRIENDS" | "HONEYMOON";

export default function RegisterTravelerForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    age: "",
    gender: "Male" as Gender,
    travelStyle: "BUDGET" as TravelStyle,
    interests: "",
    languages: "",
    city: "",
    country: "",
  });

  const [errors, setErrors] = useState<IInputErrorState>({
    success: true,
    errors: [],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Remove error for this field if it exists
    setErrors(prev => ({
      ...prev,
      errors: prev.errors.filter(err => err.field !== field),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const travelerPayload = {
      password: formData.password,
      traveler: {
        name: formData.name,
        email: formData.email,
        bio: formData.bio,
        age: formData.age ? Number(formData.age) : undefined,
        gender: formData.gender,
        travelStyle: formData.travelStyle,
        interests: formData.interests
          ? formData.interests.split(",").map(i => i.trim())
          : [],
        languages: formData.languages
          ? formData.languages.split(",").map(l => l.trim())
          : [],
        city: formData.city,
        country: formData.country,
      },
    };

    try {
      const result = await registerAndLoginTraveler(travelerPayload);

      const travelerName = result.traveler?.name || "Traveler";

      toast.success(`Traveler ${travelerName} registered successfully!`);

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        bio: "",
        age: "",
        gender: "Male",
        travelStyle: "BUDGET",
        interests: "",
        languages: "",
        city: "",
        country: "",
      });

      setErrors({ success: true, errors: [] });
      router.push("/dashboard");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Register & Login Error:", err);
      toast.error(err.message || "Failed to register traveler");

      // Set validation errors if backend returned them
      if (err?.validationErrors && Array.isArray(err.validationErrors)) {
        setErrors({ success: false, errors: err.validationErrors });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 bg-white rounded-xl shadow">
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input value={formData.name} onChange={e => handleChange("name", e.target.value)} placeholder="Full Name" />
        <InputFieldError field="name" state={errors} />
      </Field>

      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input type="email" value={formData.email} onChange={e => handleChange("email", e.target.value)} placeholder="Email" />
        <InputFieldError field="email" state={errors} />
      </Field>

      <Field>
        <FieldLabel>Password</FieldLabel>
        <Input type="password" value={formData.password} onChange={e => handleChange("password", e.target.value)} placeholder="Password" />
        <InputFieldError field="password" state={errors} />
      </Field>

      <Field>
        <FieldLabel>Bio</FieldLabel>
        <Input value={formData.bio} onChange={e => handleChange("bio", e.target.value)} placeholder="Short bio" />
      </Field>

      <Field>
        <FieldLabel>Age</FieldLabel>
        <Input type="number" value={formData.age} onChange={e => handleChange("age", e.target.value)} placeholder="Age" />
      </Field>

      <FieldGroup>
        <Field>
          <FieldLabel>Gender</FieldLabel>
          <select
            value={formData.gender}
            onChange={e => handleChange("gender", e.target.value)}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </Field>

        <Field>
          <FieldLabel>Travel Style</FieldLabel>
          <select
            value={formData.travelStyle}
            onChange={e => handleChange("travelStyle", e.target.value)}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="BUDGET">BUDGET</option>
            <option value="LUXURY">LUXURY</option>
            <option value="ADVENTURE">ADVENTURE</option>
            <option value="SOLO">SOLO</option>
            <option value="BACKPACKING">BACKPACKING</option>
            <option value="FAMILY">FAMILY</option>
            <option value="FRIENDS">FRIENDS</option>
            <option value="HONEYMOON">HONEYMOON</option>
          </select>
        </Field>
      </FieldGroup>

      <Field>
        <FieldLabel>Interests</FieldLabel>
        <Input value={formData.interests} onChange={e => handleChange("interests", e.target.value)} placeholder="Comma separated interests" />
      </Field>

      <Field>
        <FieldLabel>Languages</FieldLabel>
        <Input value={formData.languages} onChange={e => handleChange("languages", e.target.value)} placeholder="Comma separated languages" />
      </Field>

      <FieldGroup>
        <Field>
          <FieldLabel>City</FieldLabel>
          <Input value={formData.city} onChange={e => handleChange("city", e.target.value)} placeholder="City" />
        </Field>

        <Field>
          <FieldLabel>Country</FieldLabel>
          <Input value={formData.country} onChange={e => handleChange("country", e.target.value)} placeholder="Country" />
        </Field>
      </FieldGroup>

      <Button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register Traveler"}
      </Button>
    </form>
  );
}
