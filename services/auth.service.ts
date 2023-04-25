import { getTokens } from "@/utils/getTokens";
import { setTokens } from "@/utils/setTokens";
import { get, post } from "./api/serviceClient";
import { LoginRequest, LoginResponse } from "./dto/login.dto";
import { SignupRequest, SignupResponse } from "./dto/signup.dto";
import { removeTokens } from "@/utils/removeTokens";
import { getUser } from "./user.service";

export const login = async (url: string, { arg }: { arg: LoginRequest }) => {
  try {
    const response: { data: LoginResponse; status: number } = await post(
      url,
      arg
    );

    setTokens(response.data.access_token, response.data.refresh_token);

    const user = await getUser("/users/current-user")
      .then((response) => response)
      .catch((error) => {
        throw error;
      });

    return {
      ...response,
      user,
      message: "Login successful",
    };
  } catch (error) {
    throw error;
  }
};

export const signup = async (url: string, { arg }: { arg: SignupRequest }) => {
  try {
    const response: { data: SignupResponse; status: number } = await post(
      url,
      arg
    );

    setTokens(response.data.access_token, response.data.refresh_token);

    const user = await getUser("/users/current-user")
      .then((response) => response)
      .catch((error) => {
        throw error;
      });

    return {
      ...response,
      user,
      message: "Signup successful",
    };
  } catch (error) {
    throw error;
  }
};

export const requestResetPassword = async (
  url: string,
  { arg }: { arg: { email: string } }
) => {
  try {
    const response = await post(url, arg);

    if (response) {
      return {
        ...response,
        message: "Request successful",
      };
    }
  } catch (error) {
    throw error;
  }
};

export const verifyResetToken = async (
  token: string = "",
  userId: string = ""
) => {
  try {
    const response = await get(
      `/auth/verify-reset-token/${token}/${userId}`,
      {},
      {
        cache: "no-cache",
      }
    ).catch((error) => {
      throw error;
    });
    if (response.data) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const resetPassword = async (
  url: string,
  { arg }: { arg: { password: string; token: string; userId: string } }
) => {
  try {
    const response = await post(url, arg);

    if (response) {
      return {
        ...response,
        message: "Reset successful",
      };
    }
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async (url: string) => {
  const tokens = await getTokens();

  try {
    if (!tokens.refreshToken) {
      throw new Error("No refresh token found");
    }

    const response = await get(url, {
      Authorization: `Bearer ${tokens.refreshToken}`,
    })
      .then((res) => {
        setTokens(res.data.access_token, res.data.refresh_token);
        return res;
      })
      .catch((error) => {
        throw error;
      });

    return {
      ...response,
      message: "Refresh successful",
    };
  } catch (error) {
    throw error;
  }
};

export const logout = async (url: string) => {
  try {
    const response = await post(url, {});

    removeTokens();

    return {
      ...response,
      message: "Logout successful",
    };
  } catch (error) {
    throw error;
  }
};
