# Contact API

Submits a contact/enquiry message. On success, the message is saved to PocketBase (`contact_messages` collection) and a notification email is sent to the internal team via Resend.

## Endpoint

```
POST /api/contact
```

## Request

**Headers**

| Header       | Value              |
| ------------ | ------------------ |
| Content-Type | `application/json` |

**Body**

| Field           | Type     | Required | Description                              |
| --------------- | -------- | -------- | ----------------------------------------- |
| `name`          | `string` | Yes      | Full name of the person submitting        |
| `workEmail`     | `string` | Yes      | Work email address                         |
| `companyName`   | `string` | Yes      | Company name                               |
| `industry`      | `string` | Yes      | Industry the company belongs to            |
| `phoneNumber`   | `string` | Yes      | Contact phone number                       |
| `referralSource`| `string` | Yes      | How the person heard about Third Factor    |

```json
{
  "name": "Jane Doe",
  "workEmail": "jane@acme.com",
  "companyName": "Acme Inc.",
  "industry": "Fintech",
  "phoneNumber": "+1 555 123 4567",
  "referralSource": "LinkedIn"
}
```

## Responses

**201 Created**

```json
{
  "message": "Your message has been submitted successfully.",
  "data": { }
}
```

`data` is the Resend email send response.

**500 Internal Server Error** — email sending failed

```json
{
  "error": { }
}
```

**500 Internal Server Error** — record creation / unexpected failure

```json
{
  "message": "Failed to submit the contact message."
}
```

## Frontend Example

```ts
async function submitContactForm(payload: {
  name: string;
  workEmail: string;
  companyName: string;
  industry: string;
  phoneNumber: string;
  referralSource: string;
}) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message ?? "Failed to submit the contact message.");
  }

  return result;
}
```

## Notes

- All fields are required; the route does not currently validate the payload beyond destructuring it, so malformed/missing fields should be validated on the client before submitting.
- `referralSource` is specific to the contact form (not present on the demo request form).
