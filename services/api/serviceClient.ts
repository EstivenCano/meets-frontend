import { ServerError } from "../dto/server-error.dto";
import { ServiceError } from "../../model/ServiceError";
import { isOnClient } from "@/utils/isOnClient";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Called-From": "Meets-Frontend",
  Credentials: "include",
};

type Headers = Record<string, string>;
type RequestOptions = Omit<RequestInit, "headers">;

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const getHeaders = (headers?: Headers) => {
  const headersObject = {
    ...defaultHeaders,
    ...(headers || []),
  };

  if (isOnClient()) {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      return {
        Authorization: `Bearer ${accessToken}`,
        ...headersObject,
      };
    }
  }

  return headersObject;
};

export async function get(
  url: string,
  headers?: Headers,
  options?: RequestOptions
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
  options?: RequestOptions
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
  options?: RequestOptions
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

export async function remove(
  url: string,
  body: any,
  headers?: Headers,
  options?: RequestOptions
) {
  try {
    const response = await fetch(baseUrl + url, {
      method: "DELETE",
      body: JSON.stringify(body),
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
