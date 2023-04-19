import { ServiceError } from "../model/serviceError";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Called-From": "Meets-Frontend",
  Credentials: "include",
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const getHeaders = (headers?: Headers) => {
  const headersObject = {
    ...defaultHeaders,
    ...(headers || []),
  };

  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return {
      ...headersObject,
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return headersObject;
};

export async function get(url: string, headers?: Headers) {
  try {
    const response = await fetch(baseUrl + url, {
      method: "GET",
      headers: getHeaders(headers),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new ServiceError(error);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function post(url: string, body: any, headers?: Headers) {
  try {
    const response = await fetch(baseUrl + url, {
      method: "POST",
      headers: getHeaders(headers),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new ServiceError(error);
    }

    return response.json();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function put(url: string, body: any, headers?: Headers) {
  try {
    const response = await fetch(baseUrl + url, {
      method: "PUT",
      headers: getHeaders(headers),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new ServiceError(error);
    }

    return response.json();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function deleteRequest(url: string, headers?: Headers) {
  try {
    const response = await fetch(baseUrl + url, {
      method: "DELETE",
      headers: getHeaders(headers),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new ServiceError(error);
    }

    return response.json();
  } catch (error) {
    return Promise.reject(error);
  }
}
