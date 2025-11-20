import { httpClient } from "../http/http-client";

export interface UpdateProfileData {
  name?: string;
  email?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const profileApi = {
  getProfile: async () => {
    const response = await httpClient.get("/profile");
    return response.data;
  },

  updateProfile: async (data: UpdateProfileData) => {
    const response = await httpClient.put("/profile", data);
    return response.data;
  },

  changePassword: async (data: ChangePasswordData) => {
    const response = await httpClient.post("/profile/change-password", data);
    return response.data;
  },
};
