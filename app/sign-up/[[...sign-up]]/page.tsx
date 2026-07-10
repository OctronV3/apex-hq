import { SignUpCard } from "@/components/auth/sign-up-card";

export function generateStaticParams() {
  return [{ "sign-up": [] }];
}

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <SignUpCard />
    </div>
  );
}
