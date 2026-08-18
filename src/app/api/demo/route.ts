import { pb } from "@/lib/pb";
import { resend } from "@/lib/resend";

import { serverEnv } from "@/config/env";

import { PB_COLLECTION } from "@/shared/constants";

import type { DemoFormValues } from "@/shared/types/api/demo";
import type { DemoRequestRecord } from "@/shared/types";

export async function POST(request: Request) {
  const { name, workEmail, companyName, industry, phoneNumber, message } =
    (await request.json()) as DemoFormValues;

  try {
    await pb.collection<DemoRequestRecord>(PB_COLLECTION.DEMO_REQUESTS).create({
      full_name: name,
      email: workEmail,
      company_name: companyName,
      industry: industry,
      phone_number: phoneNumber,
      message: message,
    });

    const { data, error } = await resend.emails.send({
      from: `Third Factor <${serverEnv.FROM_EMAIL!}>`,
      to: serverEnv.TO_EMAIL!,
      subject: "New Demo Request Submitted",
      html: `
        <h1>New Demo Request Submitted</h1>
        <p><strong>Full Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${workEmail}</p>
        <p><strong>Company Name:</strong> ${companyName}</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(
      {
        message: "Your demo request has been submitted successfully.",
        data: data,
      },
      { status: 201 },
    );
  } catch {
    return Response.json(
      {
        message: "Failed to submit the demo request.",
      },
      { status: 500 },
    );
  }
}
