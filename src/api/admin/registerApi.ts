import axios from "axios";

const registerUrl = `${import.meta.env.VITE_API_BASE_URL}/user/auth/register`;

export const registerApi = async (registerData: any) => {
  try {
    const res = await axios.post(registerUrl, registerData);
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
