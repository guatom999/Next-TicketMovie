import { jwtDecode } from "jwt-decode";

export const decode = (token: string) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.log("error is ", error);
    return null;
  }
};
