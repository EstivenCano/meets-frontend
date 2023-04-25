export type SignupResponse = {
  access_token: string;
  refresh_token: string;
};

export type SignupRequest = {
  email: string;
  name: string;
  password: string;
};
