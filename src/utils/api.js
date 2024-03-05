import { BASE_URL } from "../config";

function fetchApi(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  return fetch(url, options);
}

export const getKanbanDetails = async (URL) => {
  try {
    const response = await fetchApi(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
