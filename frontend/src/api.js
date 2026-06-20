// API client for communication with PathForge AI Recommendation API

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Fetch career recommendations based on user skills.
 * @param {string[]} skills - Array of skills to send to the engine.
 * @returns {Promise<{top_match: object, alternative_matches: object[]}>}
 */
export async function fetchRecommendations(skills) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ skills }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.detail || `Server returned status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API integration request failed:', error);
    // Propagate error to let App.jsx handle UI states
    throw new Error(error.message || 'Could not connect to the PathForge AI server.');
  }
}
