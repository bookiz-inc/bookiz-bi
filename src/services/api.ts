import { DashboardData } from "@/types/api";

const API_URL = 'https://api.bookiz.co.il/api/v1';
const API_TOKEN = 'QLnUHOjzuTdB4KEx1DAGSrTRgjUGPSWuM4Z8j8XCSfyIEQNcbhE7YEXRkrtbCYhz';

export async function fetchDashboardData() {
  try {
    const response = await fetch(`${API_URL}/data/analytics/dashboard`, {
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