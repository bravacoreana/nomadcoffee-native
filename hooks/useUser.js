import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";

const USER_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      username
      name
      location
      avatar
      githubUsername
      isMe
      following
      followers
    }
  }
`;

export default function useUser(username) {
  const { data } = useQuery(USER_QUERY, {
    variables: {
      username,
    },
  });

  return { data };
}
