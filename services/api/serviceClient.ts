import { ServerError } from "../dto/server-error.dto";
import { ServiceError } from "../model/serviceError";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Called-From": "Meets-Frontend",
  Credentials: "include",
};

type Headers = Record<string, string>;
type RequestOpions = Omit<RequestInit, "headers">;

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

function isOnClient() {
  return typeof window != "undefined" && window.document;
}

const getHeaders = (headers?: Headers) => {
  const headersObject = {
    ...defaultHeaders,
    ...(headers || []),
  };

  if (isOnClient()) {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      return {
        ...headersObject,
        Authorization: `Bearer ${accessToken}`,
      };
    }
  }

  return headersObject;
};

export async function get(
  url: string,
  headers?: Headers,
  options?: RequestOpions
) {
  try {
    const response = await fetch(baseUrl + url, {
      method: "GET",
      headers: getHeaders(headers),
      ...options,
    });

    if (!response.ok) {
      const error: ServerError = await response.json();
      throw new ServiceError(error.error, error.statusCode, error.message);
    }

    return {
      data: await response.json(),
      status: response.status,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function post(
  url: string,
  body: any,
  headers?: Headers,
  options?: RequestOpions
) {
  try {
    const response = await fetch(baseUrl + url, {
      method: "POST",
      headers: getHeaders(headers),
      body: JSON.stringify(body),
      ...options,
    });

    if (!response.ok) {
      const error: ServerError = await response.json();
      throw new ServiceError(error.error, error.statusCode, error.message);
    }

    return {
      data: await response.json(),
      status: response.status,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function put(
  url: string,
  body: any,
  headers?: Headers,
  options?: RequestOpions
) {
  try {
    const response = await fetch(baseUrl + url, {
      method: "PUT",
      headers: getHeaders(headers),
      body: JSON.stringify(body),
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new ServiceError(error.error, error.statusCode, error.message);
    }

    return {
      data: await response.json(),
      status: response.status,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function deleteRequest(
  url: string,
  headers?: Headers,
  options?: RequestOpions
) {
  try {
    const response = await fetch(baseUrl + url, {
      method: "DELETE",
      headers: getHeaders(headers),
      ...options,
    });
    if (!response.ok) {
      const error = await response.json();
      throw new ServiceError(error.error, error.statusCode, error.message);
    }

    return {
      data: await response.json(),
      status: response.status,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}
