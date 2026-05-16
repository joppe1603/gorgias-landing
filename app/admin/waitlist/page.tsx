import type { Metadata } from 'next'
import AdminWaitlist from './AdminWaitlist'

export const metadata: Metadata = {
  title: 'Admin — Wachtlijst | LUMÉ',
  robots: { index: false, follow: false },
}

export default function AdminWaitlistPage() {
  return <AdminWaitlist />
}
