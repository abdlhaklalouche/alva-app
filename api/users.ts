import axios from "@/lib/axios";
import CurrentUser from "@/types/CurrentUser";
import { useMutation } from "@tanstack/react-query";

type SigninBody = {
  email: string;
  password: string;
};

export const usersKeys = {
  signin: "signin",
  signout: "signout",
  check: "check",
  update_account: "users-account",
};

// Fetch user
export const useGetUser = async ({ token }: { token: string }) => {
  try {
    const { data } = await axios.post(
      "/users/check",
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return data.data as CurrentUser;
  } catch (error) {
    return undefined;
  }
};

export const useUsersActions = () => {
  //Check
  const { mutate: check, isPending: isChecking } = useMutation({
    mutationKey: [usersKeys.check],
    mutationFn: async (token: string) => {
      const response = await axios.post(
        `/users/check`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
  });

  //Signin
  const { mutate: signin, isPending: isSigningIn } = useMutation({
    mutationKey: [usersKeys.signin],
    mutationFn: async (data: SigninBody) => {
      const response = await axios.post(`/users/login`, data);

      return response.data;
    },
  });

  //Signout
  const { mutate: signout, isPending: isSigningOut } = useMutation({
    mutationKey: [usersKeys.signout],
    mutationFn: async (data: any) => {
      const response = await axios.post(`/users/logout`);

      return response.data;
    },
  });

  //Update Account
  const { mutate: updateAccount, isPending: isUpdatingAccount } = useMutation({
    mutationKey: [usersKeys.update_account],
    mutationFn: async (data: any) => {
      const response = await axios.patch(`/users/account`, data);

      return response.data;
    },
  });

  return {
    signin,
    signout,
    check,
    updateAccount,
    isSigningIn,
    isSigningOut,
    isChecking,
    isUpdatingAccount,
  };
};
