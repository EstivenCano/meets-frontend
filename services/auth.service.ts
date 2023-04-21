import { post } from "./api/serviceClient";
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
