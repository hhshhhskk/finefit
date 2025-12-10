import type { LoginFormValues } from "@/pages/admin/components/LoginForm";
import { getRoleValue } from "@/utils/role";
import axios from "axios";

const loginUrl = `${import.meta.env.VITE_API_BASE_URL}/user/auth/login`;

export const loginApi = async (loginData: LoginFormValues) => {
  try {
    const res = await axios.post(loginUrl, loginData);
    const accessToken = res.headers["access"];

    const userRoleName = res.data.data.role;
    const roleValue = getRoleValue(userRoleName);

    sessionStorage.setItem("roleName", userRoleName);
    sessionStorage.setItem("roleValue", String(roleValue));

    sessionStorage.setItem("token", accessToken);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
