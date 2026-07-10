import { SignInCard } from "@/components/auth/sign-in-card";

export function generateStaticParams() {
  return [{ "sign-in": [] }];
}

export default function SignInPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <SignInCard />
    </div>
  );
}
