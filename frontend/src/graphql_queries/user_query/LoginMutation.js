import { gql } from '@apollo/client';


const LOGIN_USER = gql`
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