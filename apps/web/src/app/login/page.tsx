import { redirect } from 'next/navigation';

// Per the PR requirements, the main Sign In button should navigate to the Client Sign-In Page
// This page serves as a redirect to the client login by default
export default function LoginPage() {
  redirect('/login/client');
}
