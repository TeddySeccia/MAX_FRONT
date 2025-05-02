const VITE_API_URL = import.meta.env.VITE_API_URL;



export async function fetchCurrentUser() {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No token");
  
    const res = await fetch(`${import.meta.env.VITE_API_URL}/checkToken`, {
      credentials: "include",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Token invalide");
  
    const { user: { userId } } = await res.json();
    const userRes = await fetch(
      `${import.meta.env.VITE_API_URL}/getUser/${userId}`,
      { credentials: "include", headers: { Authorization: `Bearer ${token}` } }
    );
    if (!userRes.ok) throw new Error("Impossible de récupérer l’utilisateur");
  
    return userRes.json();
  }
  
/**
 * @param {{ email: string, password: string }} param0
 * @returns {Promise<Object>} l'utilisateur connecté
 * @throws {Error} si la connexion échoue
 */
export async function loginUser({ email, password }) {
  const response = await fetch(`${VITE_API_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    // On tente de récupérer le message d'erreur renvoyé
    let errorMessage = 'Erreur de connexion';
    try {
      const errorData = await response.json();
      if (errorData?.message) errorMessage = errorData.message;
    } catch {
      // ignore JSON parsing errors
    }
    throw new Error(errorMessage);
  }

  const data = await response.json();
  const { accessToken, user } = data;

  // Stockage du token pour les requêtes futures
  localStorage.setItem('accessToken', accessToken);

  return user;
}

