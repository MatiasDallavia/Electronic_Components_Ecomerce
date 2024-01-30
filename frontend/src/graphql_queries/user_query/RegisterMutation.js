
const REGISTER_USER = `
  mutation registerUser($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
      user {
        id
      }
    }
  }
`;

export { REGISTER_USER };