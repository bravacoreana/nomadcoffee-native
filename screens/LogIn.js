import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { logUserIn } from "../apollo";
import { TextInput } from "../components/auth/AuthCommon";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import styled from "styled-components/native";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Button = styled.Button``;

export default function LogIn({ navigation, route }) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      username: route?.params?.username,
      password: route?.params?.password,
    },
  });
  const passwordRef = useRef();

  const onCompleted = async (data) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      await logUserIn(token);
      navigation.navigate("Home");
    }
  };

  const [logInMutation, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onNext = (arg) => {
    arg?.current?.focus();
  };

  const onValid = (data) => {
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    register("username", { required: true });
    register("password", { required: true });
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        value={watch("username")}
        placeholder="Username"
        returnKeyType="next"
        autoCapitalize="none"
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        value={watch("password")}
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        text="Log In"
        loading={loading}
        disabled={!watch("username") || !watch("password")}
        onPress={handleSubmit(onValid)}
      />
      <Button title="sign up" onPress={() => navigation.navigate("SignUp")} />
    </AuthLayout>
  );
}
