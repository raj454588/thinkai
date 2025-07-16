
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { VerifyEmailForm } from '@/components/VerifyEmailForm';

function VerifyEmailPageContents() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email');

  if (!email) {
    // Redirect to sign-up if no email is provided in the URL
    if (typeof window !== 'undefined') {
      router.push('/sign-up');
    }
    return null; // Render nothing while redirecting
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary font-headline">Verify Your Email</h1>
          <p className="text-muted-foreground">
            We sent a 6-digit code to <span className="font-semibold text-primary">{email}</span>. Please enter it below.
          </p>
        </div>
        <VerifyEmailForm email={email} />
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyEmailPageContents />
        </Suspense>
    )
}
