import { DemoFormData } from "../schemas/demo.schema";

const API_URL = '/api/demo';

export async function submitDemoRequest(data: DemoFormData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message ?? "Failed to submit demo request");
  }

  return result;
}