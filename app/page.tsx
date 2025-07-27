// app/page.tsx
"use client";

import PayloadForm from "@/components/PayloadForm";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">
        🔫 GEARZ Payload Smith 🔫
      </h1>
      <p className="text-gray-400 mb-6 text-center max-w-xl">
        An AI-powered payload generator for bounty hunters, red teamers, and cyber outlaws.  
        Ride into scope, drop a vuln, and let the Smith do its work.
      </p>
      <PayloadForm />
    </main>
  );
}
