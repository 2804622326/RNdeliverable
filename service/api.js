import { BASE_URL } from '../config';

export async function fetchEnergyStats(mode, userId) {
  const url = mode === 'home'
    ? `${BASE_URL}/api/users/${userId}/summary`
    : `${BASE_URL}/api/users/community-summary`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch');
  const data = await res.json();
  return {
    used: data.monthlyEnergy,
    earned: data.totalPoints,
  };
}