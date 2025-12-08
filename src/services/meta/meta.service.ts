/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export async function getDashboardMeta(queryString: string = "") {
  try {
    const res = await serverFetch.get(`/meta${queryString}`);

    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
