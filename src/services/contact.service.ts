import { ContactFormData } from "../schemas/contact.schema";


const API_URL = '/api/contact';

export async function submitDemoRequest(
  data: ContactFormData,
) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit request");
  }

  return response.json();
}