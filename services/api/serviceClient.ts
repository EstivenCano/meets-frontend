import { ServerError } from "../dto/server-error.dto";
import { ServiceError } from "../../model/ServiceError";
import { getTokens } from "@/utils/getTokens";
import { setTokens } from "@/utils/setTokens";
import { removeTokens } from "@/utils/removeTokens";
import { parseJwt } from "@/utils/parseJwt";

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

  const tokens = getTokens();

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
    await verifyTokens();

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
    await verifyTokens();

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
    await verifyTokens();

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
    await verifyTokens();

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

export async function verifyTokens() {
  const { accessToken, refreshToken } = getTokens();

  if (accessToken && refreshToken) {
    const token = parseJwt(accessToken as string);
    const exp = token.exp;
    const now = Date.now() / 1000;
    if (exp < now) {
      //Refresh token
      try {
        if (!refreshToken) {
          throw new Error("No refresh token found");
        }

        const response = await fetch(baseUrl + "/auth/refresh", {
          method: "GET",
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Refresh token is invalid");
        }

        const { access_token: newAccess, refresh_token: newRefresh } =
          await response.json();

        if (!newAccess || !newRefresh) {
          throw new Error("No tokens found");
        }

        setTokens(newAccess, newRefresh);
      } catch (error) {
        await removeTokens();
        throw error;
      }
    }
  }
}
