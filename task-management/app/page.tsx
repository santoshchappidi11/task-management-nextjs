'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page
    router.push('/login');
  }, [router]);

  return null; // or you can return a loading spinner, etc.
}
