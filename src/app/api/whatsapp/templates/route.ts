import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiToken = process.env.WATI_API_TOKEN;
    const tenantId = process.env.WATI_TENANT_ID;

    if (!apiToken || !tenantId) {
      return NextResponse.json(
        { error: 'API configuration is missing' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://live-mt-server.wati.io/${tenantId}/api/v1/getMessageTemplates`,
      {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'accept': '*/*'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch templates from WATI');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('WhatsApp templates error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch WhatsApp templates' },
      { status: 500 }
    );
  }
} 