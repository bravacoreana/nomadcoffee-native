import React, { useEffect } from "react";
import styled from "styled-components/native";
import { gql, useMutation } from "@apollo/client";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";

import AuthLayout from "../components/auth/AuthLayout";
import { SEE_PROFILE_QUERY } from "../queries";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile(
    $username: String
    $email: String
    $name: String
    $password: String
    $location: String
    $bio: String
    $avatar: Upload
    $githubUsername: String
  ) {
    editProfile(
      username: $username
      email: $email
      name: $name
      password: $password
      location: $location
      bio: $bio
      avatar: $avatar
      githubUsername: $githubUsername
    ) {
      ok
      error
    }
  }
`;

const Container = styled.View``;

const Column = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Title = styled.Text`
  color: white;
  width: 80px;
`;

const TextInput = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 18px 10px;
  margin-bottom: 8px;
  flex: 1;
  color: #fff;
  margin-bottom: ${(props) => (props.lastOne ? "15" : 8)}px;
`;

export default function EditProfile({ navigation, route }) {
  const {
    params: {
      QueryData: {
        seeProfile: { avatar, bio, id, isMe, location, name, email, username },
      },
    },
  } = route;

  const { register, handleSubmit, setValue, watch, getValues } = useForm({
    defaultValues: {
      name,
      email,
      username,
      avatar,
      bio,
      location,
    },
  });

  const updateProfile = async (cache, result) => {
    const {
      data: { editProfile },
    } = result;

    const {
      username: newUsername,
      email: newEmail,
      name: newName,
      bio: newBio,
      location: newLocation,
    } = getValues();

    if (editProfile.ok) {
      const userId = `User:${id}`;
      const fragment = gql`
        fragment EDIT on User {
          id
          username
          email
          name
          bio
          location
        }
      `;

      const result = await cache.readFragment({
        id: userId,
        fragment,
      });

      if (
        "username" in result &&
        "email" in result &&
        "name" in result &&
        "bio" in result &&
        "location" in result
      ) {
        cache.writeFragment({
          id: userId,
          fragment,
          data: {
            username: newUsername,
            email: newEmail,
            name: newName,
            bio: newBio,
            location: newLocation,
          },
        });
      }
      navigation.navigate("Profile");
    }
  };

  const onCompleted = (data) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok) {
      navigation.navigate("Profile");
    }
  };

  const [signUpMutation, { loading }] = useMutation(EDIT_PROFILE_MUTATION, {
    // onCompleted,
    variables: { id },
    update: updateProfile,
  });

  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const bioRef = useRef();
  const locationRef = useRef();

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
    register("username");
    register("email");
    register("name");
    register("password");
    register("bio");
    register("location");
  }, [register]);

  return (
    <AuthLayout>
      <Column>
        <Title>Username</Title>
        <TextInput
          value={watch("username")}
          returnKeyType="next"
          autoCapitalize="none"
          onSubmitEditing={() => onNext(emailRef)}
          placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
          onChangeText={(text) => setValue("username", text)}
        />
      </Column>
      <Column>
        <Title>Email</Title>
        <TextInput
          ref={emailRef}
          value={watch("email")}
          placeholder={email}
          keyboardType="email-address"
          returnKeyType="next"
          autoCapitalize="none"
          onSubmitEditing={() => onNext(nameRef)}
          placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
          onChangeText={(text) => setValue("email", text)}
        />
      </Column>
      <Column>
        <Title>Name</Title>
        <TextInput
          ref={nameRef}
          value={watch("name")}
          placeholder={name}
          returnKeyType="next"
          onSubmitEditing={() => onNext(passwordRef)}
          placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
          onChangeText={(text) => setValue("name", text)}
        />
      </Column>
      <Column>
        <Title>Password</Title>
        <TextInput
          ref={passwordRef}
          placeholder="Password"
          secureTextEntry
          returnKeyType="next"
          onSubmitEditing={() => onNext(bioRef)}
          placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
          onChangeText={(text) => setValue("password", text)}
        />
      </Column>
      <Column>
        <Title>Bio</Title>
        <TextInput
          ref={bioRef}
          value={watch("bio")}
          returnKeyType="next"
          placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
          onChangeText={(text) => setValue("bio", text)}
        />
      </Column>
      <Column>
        <Title>Location</Title>
        <TextInput
          ref={locationRef}
          value={watch("location")}
          returnKeyType="done"
          placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
          onChangeText={(text) => setValue("location", text)}
        />
      </Column>
      <AuthButton
        text="Done"
        disabled={false}
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
