// services/traveler/registerAndLogin.ts
import { serverFetch } from "@/lib/server-fetch";
import { createTravelerValidationSchema } from "@/zod/traveler.validation";

export interface CreateTravelerPayload {
  password: string;
  traveler: {
    name: string;
    email: string;
    bio?: string;
    age?: number;
    gender?: "Male" | "Female" | "Other";
    travelStyle?: "BUDGET" | "LUXURY" | "ADVENTURE" | "SOLO" | "BACKPACKING" | "FAMILY" | "FRIENDS" | "HONEYMOON";
    interests?: string[];
    languages?: string[];
    city?: string;
    country?: string;
    profilePhoto?: string;
  };
}

export const registerAndLoginTraveler = async (payload: CreateTravelerPayload) => {
  // 1️⃣ Validate payload
  createTravelerValidationSchema.parse(payload);

  try {
    // 2️⃣ Prepare FormData for registration
    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));

    const createResponse = await serverFetch.post("/users/create-traveler", {
      body: formData,
      // Do NOT set Content-Type here; serverFetch should handle FormData automatically
    });

    const createResult = await createResponse.json();

    if (!createResult.success) {
      throw new Error(createResult.message || "Traveler registration failed");
    }

    // 3️⃣ Auto-login
    const loginResponse = await serverFetch.post("/auth/login", {
      body: JSON.stringify({
        email: payload.traveler.email,
        password: payload.password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const loginResult = await loginResponse.json();

    if (!loginResult.success) {
      throw new Error(loginResult.message || "Login failed after registration");
    }

    return {
      traveler: createResult.data,
      login: loginResult.data, // accessToken, refreshToken, user info
    };
  } catch (err) {
    console.error("Register & Login Error:", err);
    throw err;
  }
};
