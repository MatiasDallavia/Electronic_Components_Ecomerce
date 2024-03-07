const loginURL = `http://localhost:8080/login`



const getJWT = async () => {

  const uri = `http://localhost:8000/graphql`

  const REFRESH_TOKEN = `
    mutation RefreshTokesn($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
        token
        payload
        refreshToken
        refreshExpiresIn
    }
    }
    `;

    let token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken")
    const refreshExpiresIn = localStorage.getItem("refreshExpiresIn");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    const currentTime = new Date().getTime() / 1000;

    if (currentTime >= refreshExpiresIn){
      window.open(loginURL, "_self")
    }
        

    if (currentTime >= tokenExpiration){
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: REFRESH_TOKEN,
              variables: { refreshToken: refreshToken },
            }),
          };


        await fetch(uri, requestOptions)
        .then(response => response.json())
        .then(data => {
          saveTokens(data.data.refreshToken)
          token = data.data.refreshToken.token
        })
        .catch(error => {
          console.error('Error:', error);
        });   


    }    

    return token
}


const saveTokens = (tokenResponse) => {
    localStorage.setItem('token', tokenResponse.token);
    localStorage.setItem('refreshToken', tokenResponse.refreshToken);
    localStorage.setItem('token', tokenResponse.token);
    localStorage.setItem('origIat', tokenResponse.payload.origIat);
    localStorage.setItem('tokenExpiration', tokenResponse.payload.exp);
    localStorage.setItem('refreshExpiresIn', tokenResponse.refreshExpiresIn);
    localStorage.setItem('username', tokenResponse.payload.username);
  }


const isUserLogin = () => {
  const refreshExpiresIn = localStorage.getItem("refreshExpiresIn");
  const currentTime = new Date().getTime() / 1000;

  if (currentTime >= refreshExpiresIn )
      return false
  return true  

}  



export {getJWT, saveTokens, isUserLogin}