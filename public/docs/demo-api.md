# Demo Request API

Submits a demo request. On success, the request is saved to PocketBase (`demo_requests` collection) and a notification email is sent to the internal team via Resend.

## Endpoint

```
POST /api/demo
```

## Request

**Headers**

| Header       | Value              |
| ------------ | ------------------ |
| Content-Type | `application/json` |

**Body**

| Field         | Type     | Required | Description                          |
| ------------- | -------- | -------- | ------------------------------------- |
| `name`        | `string` | Yes      | Full name of the person requesting    |
| `workEmail`   | `string` | Yes      | Work email address                     |
| `companyName` | `string` | Yes      | Company name                           |
| `industry`    | `string` | Yes      | Industry the company belongs to        |
| `phoneNumber` | `string` | Yes      | Contact phone number                   |
| `message`     | `string` | Yes      | Additional message / context for the demo request |

```json
{
  "name": "Jane Doe",
  "workEmail": "jane@acme.com",
  "companyName": "Acme Inc.",
  "industry": "Fintech",
  "phoneNumber": "+1 555 123 4567",
  "message": "We'd like to see how the platform handles bulk onboarding."
}
```

## Responses

**201 Created**

```json
{
  "message": "Your demo request has been submitted successfully.",
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
  "message": "Failed to submit the demo request."
}
```

## Frontend Example

```ts
async function submitDemoRequest(payload: {
  name: string;
  workEmail: string;
  companyName: string;
  industry: string;
  phoneNumber: string;
  message: string;
}) {
  const res = await fetch("/api/demo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message ?? "Failed to submit the demo request.");
  }

  return result;
}
```

## Notes

- All fields are required; the route does not currently validate the payload beyond destructuring it, so malformed/missing fields should be validated on the client before submitting.
- `message` is specific to the demo request form (not present on the contact form, which uses `referralSource` instead).
