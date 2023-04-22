import { get, post } from "./api/serviceClient";
import { LoginResponse } from "./dto/login.dto";
import { SignupResponse } from "./dto/signup.dto";

export const login = async (
  url: string,
  { arg }: { arg: { email: string; password: string } }
) => {
  try {
    const response: { data: LoginResponse; status: number } = await post(
      url,
      arg
    );

    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);

    return {
      ...response,
      message: "Login successful",
    };
  } catch (error) {
    throw error;
  }
};

export const signup = async (
  url: string,
  { arg }: { arg: { email: string; name: string; password: string } }
) => {
  try {
    const response: { data: SignupResponse; status: number } = await post(
      url,
      arg
    );

    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);

    return {
      ...response,
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
