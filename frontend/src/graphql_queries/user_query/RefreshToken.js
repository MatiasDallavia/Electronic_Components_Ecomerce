import { gql } from '@apollo/client';


const REFRESH_TOKEN = gql`
    mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
        token
        payload
        refreshToken
        refreshExpiresIn
    }
    }
`;

export { REFRESH_TOKEN };