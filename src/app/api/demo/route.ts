import { NextResponse } from "next/server";

// TODO: connect a delivery channel (Resend, SendGrid, CRM webhook, etc.).
// For now the validated request is only logged on the server, so no email is sent.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Name and a valid email are required." }, { status: 422 });
  }
  if (name.length > 200 || email.length > 200 || phone.length > 50 || message.length > 5000) {
    return NextResponse.json({ error: "Input too long." }, { status: 422 });
  }

  console.log("[demo-request]", { name, email, phone, message });
  return NextResponse.json({ ok: true });
}
