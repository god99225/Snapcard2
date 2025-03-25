const API_BASE_URL = 'https://demo3.wms.net.in/api';

export const autoAuthenticate = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/Authentication/Authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        UserName: 'admin', // Use the predefined username
        Password: '',      // Use the predefined password (if any)
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate');
    }

    const data = await response.json();
    localStorage.setItem('authToken', data.token); // Store the token for later use
    return data.token;
  } catch (error) {
    console.error('Error during initial authentication:', error);
    throw error;
  }
};
