import { DashboardData } from "@/types/api";

const API_URL = 'https://api.bookiz.co.il/api/v1';
const API_TOKEN = 'LQgKxwDyjFnhCkRfayEXPpxFWpAWZpT0XsYu3VTSzhCDT8xqMI9TO3o2PmhKxsyM';

export async function fetchDashboardData() {
  try {
    const response = await fetch(`${API_URL}/data/app/`, {
      headers: {
        'accept': 'application/json',
        'X-CSRFToken': API_TOKEN
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }

    const data = await response.json();
    return data as DashboardData;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
}