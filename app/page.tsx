import { headers } from 'next/headers';
import { getTenantFromHost } from '../lib/getTenantFromHost';

export default async function HomePage() {
  // In Next 16, headers() returns a Promise, so we await it
  const headersList = await headers();
  const host = headersList.get('host');
  const tenant = getTenantFromHost(host);

  // No subdomain → root domain (mytokenrewards.app)
  if (!tenant) {
    return (
      <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>MyToken Rewards</h1>
        <p>This is the main site (no specific school selected).</p>
      </main>
    );
  }

  // Has subdomain → tenant portal
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>{tenant} Portal</h1>
      <p>Welcome to the portal for {tenant}.</p>
    </main>
  );
}
