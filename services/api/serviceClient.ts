import { ServerError } from "../dto/server-error.dto";
import { ServiceError } from "../../model/ServiceError";
import { getTokens } from "@/utils/getTokens";
import { parseJwt } from "@/utils/parseJwt";
import { refreshToken } from "../auth.service";
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

const getHeaders = async (headers?: Headers) => {
  const headersObject = {
    ...defaultHeaders,
    ...(headers || []),
  };

  const tokens = await getTokens();

  if (tokens.accessToken) {
    return {
      Authorization: `Bearer ${tokens.accessToken}`,
      ...headersObject,
    };
  }

  return headersObject;
};

export async function get(
  url: string,
  headers?: Headers,
  options?: RequestOptions
) {
  try {
    const request = async () => {
      return await fetch(baseUrl + url, {
        method: "GET",
        headers: await getHeaders(headers),
        ...options,
      });
    };

    const response = await handleRequest(request);

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
    const request = async () => {
      return await fetch(baseUrl + url, {
        method: "POST",
        headers: await getHeaders(headers),
        body: JSON.stringify(body),
        ...options,
      });
    };

    const response = await handleRequest(request);

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
      headers: await getHeaders(headers),
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
      headers: await getHeaders(headers),
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

let refreshing = false;
const handleRequest = async (
  request: () => Promise<Response>
): Promise<Response> => {
  async function stopRequest() {
    if (refreshing) {
      await setTimeout(stopRequest, 1000);
    }
    return Promise.resolve();
  }

  await stopRequest();

  const tokens = await getTokens();

  if (tokens.accessToken) {
    const token = parseJwt(tokens.accessToken);
    const exp = token.exp;
    const now = Date.now() / 1000;
    if (exp < now && isOnClient() && !refreshing) {
      refreshing = true;
      await refreshToken("/auth/refresh");
      refreshing = false;
    }
  }

  try {
    const response = await request();

    return response;
  } catch (error) {
    const serverError = error as ServerError;

    return Promise.reject(serverError);
  }
};
