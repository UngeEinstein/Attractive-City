import http from "../http-common";
import { BackendApi } from "shared";

const baseUrl = "api/user";

const createUser = async (
  userRequest: BackendApi.UserCreateUserRequest
): Promise<void> => {
  await http.post(baseUrl + "/register_user", userRequest);
};

const userService = {
  createUser,
};

export default userService;
