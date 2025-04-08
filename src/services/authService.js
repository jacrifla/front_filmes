import { BASE_API_URL } from "../utils/constants";
import { saveUserData } from "../utils/storage";

const ENDPOINT = `${BASE_API_URL}/usuarios`;

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${ENDPOINT}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha: password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const { data } = await response.json();

    saveUserData(data.token, data.user);

    return data;
  } catch (error) {
    console.error('Erro no login:', error.message);
    throw error;
  }
}
