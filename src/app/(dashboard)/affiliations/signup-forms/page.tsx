'use client';

import { useState } from 'react';
import { Copy, ExternalLink, Check } from 'lucide-react';
import Image from 'next/image';

interface SignupFormCard {
  title: string;
  description: string;
  link: string;
  image: string;
  imageAlt: string;
}

const signupForms: SignupFormCard[] = [
  {
    title: 'Bookiz Affiliate Program',
    description: 'The official Bookiz affiliate program signup form for all partners.',
    link: '/affiliate-signup',
    image: '/images/bookiz-logo.png',
    imageAlt: 'Bookiz Logo'
  },
  {
    title: "Noga's Affiliate Program",
    description: 'Special affiliate program signup form for Noga\'s partners.',
    link: '/affiliate-signup/noga',
    image: '/images/noga.jpg',
    imageAlt: 'Noga Profile Picture'
  }
];

export default function SignupFormsPage() {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Affiliate Signup Forms</h1>
        <p className="text-gray-600 mt-2">Manage and access all affiliate signup forms from one place.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {signupForms.map((form) => (
          <div
            key={form.title}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-video relative bg-gray-100">
              <Image
                src={form.image}
                alt={form.imageAlt}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{form.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{form.description}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => copyToClipboard(form.link)}
                  className="flex-1 flex text-primary-600 items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  {copiedLink === form.link ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-green-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>

                <a
                  href={form.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Open</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
