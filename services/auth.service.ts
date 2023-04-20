import { post } from "./api/serviceClient";
import { LoginResponse } from "./dto/login-response.dto";

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
