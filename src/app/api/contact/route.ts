import { pb } from "@/lib/pb";
import { resend } from "@/lib/resend";

import { serverEnv } from "@/config/env";

import { PB_COLLECTION } from "@/shared/constants";

import type { ContactFormValues } from "@/shared/types/api/contact";
import type { ContactMessageRecord } from "@/shared/types";

export async function POST(request: Request) {
  const {
    name,
    workEmail,
    companyName,
    industry,
    phoneNumber,
    referralSource,
  } = (await request.json()) as ContactFormValues;

  try {
    await pb
      .collection<ContactMessageRecord>(PB_COLLECTION.CONTACT_MESSAGES)
      .create({
        full_name: name,
        email: workEmail,
        company_name: companyName,
        industry: industry,
        phone_number: phoneNumber,
        referral_source: referralSource,
      });

    const { data, error } = await resend.emails.send({
      from: `Third Factor <${serverEnv.FROM_EMAIL!}>`,
      to: serverEnv.TO_EMAIL!,
      subject: "New Contact Message Submitted",
      html: `
        <h1>New Contact Message Submitted</h1>
        <p><strong>Full Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${workEmail}</p>
        <p><strong>Company Name:</strong> ${companyName}</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Referral Source:</strong> ${referralSource}</p>
      `,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(
      {
        message: "Your message has been submitted successfully.",
        data: data,
      },
      { status: 201 },
    );
  } catch {
    return Response.json(
      {
        message: "Failed to submit the contact message.",
      },
      { status: 500 },
    );
  }
}
