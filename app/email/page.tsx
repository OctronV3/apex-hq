import { EmailClient } from "@/components/email/email-client";

export default function EmailPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Email</h2>
        <p className="text-[#888888]">Send, receive, and manage communications.</p>
      </div>
      <EmailClient />
    </div>
  );
}
