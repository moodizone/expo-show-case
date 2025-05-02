import AsyncStorage from "@react-native-async-storage/async-storage";

export const BASE_URL = "http://192.168.8.102:3006/api";
// export const BASE_URL = "http://localhost:3006/api";

export class APIError extends Error {
  response: Response;

  constructor(r: Response) {
    super(r.statusText);
    this.response = r;
  }
}

export async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const { headers, ...rest } = options;
  const newHeaders = new Headers(headers);
  newHeaders.set("Content-Type", "application/json");
  const token = await AsyncStorage.getItem("token");
  let newURL = `${BASE_URL}/${url}`;

  if (url.startsWith("/")) {
    newURL = `${BASE_URL}${url}`;
  }

  if (token) {
    newHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(newURL, {
    headers: newHeaders,
    ...rest,
  });
  const result = await response.clone().json();

  if (response.ok) {
    return result as T;
  } else {
    throw new APIError(response);
  }
}
