import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'נוגה - תוכנית השותפים שלי',
  description: 'הצטרפו לתוכנית השותפים של נוגה ובואו נבנה יחד קהילה חזקה ומצליחה של בעלי עסקים',
  openGraph: {
    title: 'נוגה - תוכנית השותפים שלי',
    description: 'הצטרפו לתוכנית השותפים של נוגה ובואו נבנה יחד קהילה חזקה ומצליחה של בעלי עסקים',
    images: ['/images/noga.jpg'],
  },
};

export default function NovaAffiliateSignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 