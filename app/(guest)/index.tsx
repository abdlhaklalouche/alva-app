import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as schema from "yup";
import FormTextField from "../components/form/textfield";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { router, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { useUsersActions } from "~/api/users";
import LoadingButton from "../components/other/loadingbutton";
import Toast from "react-native-toast-message";
import { storeToken } from "~/utils/auth";

export default function LoginScreen() {
  const { signin, isSigningIn } = useUsersActions();

  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(
      schema.object().shape({
        email: schema.string().email().required(),
        password: schema.string().required(),
      })
    ),
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    if (isSigningIn) return;

    signin(data, {
      onSuccess: async (data) => {
        Toast.show({
          type: "success",
          text1: data.message,
        });

        await storeToken(data.data.token);

        // @ts-ignore
        router.replace("(auth)");
      },
      onError: (error: any) => {
        console.log(JSON.stringify(error));
        Toast.show({
          type: "error",
          text1: error?.response?.data?.message ?? error.message,
        });
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4">
        <Stack.Screen
          name="(guest)"
          options={{
            title: "Login",
            headerShown: false,
            headerShadowVisible: false,
          }}
        />
        <View className="flex-1 justify-center items-center bg-gray-100">
          <FormProvider {...methods}>
            <View className="p-4">
              <View className="mb-8 text-center flex flex-col items-center justify-center">
                <Image
                  source={{
                    uri: "https://media.licdn.com/dms/image/v2/D4D0BAQH0W52x_yZx9w/company-logo_200_200/company-logo_200_200/0/1723030167117/alvaas_logo?e=2147483647&v=beta&t=EFUCQ6psCaCOJhopYe3IvViR7lgbO2YlPILvSB7HDio",
                  }}
                  className="w-24 h-24 mb-8 rounded-full"
                />
                <Text className="text-4xl font-bold">Login</Text>
                <Text className="text-md text-gray-600">
                  Login to start using Alva
                </Text>
              </View>
              <View className="mb-4">
                <FormTextField
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  inputMode="email"
                  className="w-full"
                />
              </View>
              <View className="mb-4">
                <FormTextField
                  name="password"
                  label="Password"
                  secureTextEntry
                  placeholder="Enter password"
                  className="w-full"
                />
              </View>
              <LoadingButton
                loading={isSigningIn}
                onPress={handleSubmit(onSubmit)}
              >
                <Text>Login</Text>
              </LoadingButton>
            </View>
          </FormProvider>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
