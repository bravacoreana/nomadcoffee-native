import { gql, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import AuthButton from "../components/auth/AuthButton";
import { TextInput } from "../components/auth/AuthCommon";
import AuthLayout from "../components/auth/AuthLayout";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $name: String!
    $password: String!
    $avatar: String
    $location: String
    $githubUsername: String
  ) {
    createAccount(
      username: $username
      email: $email
      name: $name
      password: $password
      avatar: $avatar
      location: $location
      githubUsername: $githubUsername
    ) {
      ok
      error
    }
  }
`;

export default function SignUp({ navigation }) {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const onCompleted = (data) => {
    const {
      createAccount: { ok },
    } = data;
    const { username, password } = getValues();
    if (ok) {
      navigation.navigate("LogIn", { username, password });
    }
    ㅗㄷ;
  };

  const [signUpMutation, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();

  const onValid = (data) => {
    if (!loading) {
      signUpMutation({
        variables: {
          ...data,
        },
      });
    }
  };
  useEffect(() => {
    register("username", { required: true });
    register("email", { required: true });
    register("name", { required: true });
    register("password", { required: true });
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        placeholder="* Username"
        returnKeyType="next"
        autoCapitalize="none"
        // onSubmitEditing={() => onNext(emailRef)}
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        ref={emailRef}
        placeholder="* Email"
        keyboardType="email-address"
        returnKeyType="next"
        autoCapitalize="none"
        // onSubmitEditing={() => onNext(passwordRef)}
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        onChangeText={(text) => setValue("email", text)}
      />
      <TextInput
        ref={nameRef}
        placeholder="* Name"
        returnKeyType="next"
        // onSubmitEditing={() => onNext(usernameRef)}
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        onChangeText={(text) => setValue("name", text)}
      />
      <TextInput
        ref={passwordRef}
        placeholder="* Password"
        secureTextEntry
        returnKeyType="done"
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        text="Create Account"
        disabled={false}
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
