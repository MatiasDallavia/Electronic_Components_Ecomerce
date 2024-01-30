

const LOGIN_USER = `
mutation TokenAuth($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      payload
      refreshToken
      refreshExpiresIn
    }
  }
`;

export { LOGIN_USER };