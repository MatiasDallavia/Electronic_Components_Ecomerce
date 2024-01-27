



const getJWT = () => {

  const HOST = process.env.REACT_APP_HOST;
  const PORT = process.env.REACT_APP_DJANGO_PORT;

  const uri = `${HOST}:${PORT}/graphql`

    const REFRESH_TOKEN = `
    mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
        token
        payload
        refreshToken
        refreshExpiresIn
    }
    }
    `;

    const token = localStorage.getItem("tokenExpiration");
    const refreshToken = localStorage.getItem("refreshToken")
    const refreshExpiresIn = localStorage.getItem("refreshExpiresIn");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    const currentTime = new Date().getTime() / 1000;

    if (currentTime >= refreshExpiresIn )
        console.log("se paso")

    if (currentTime >= tokenExpiration){
        console.log("se expiro")


        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Puedes incluir cualquier encabezado adicional necesario, como tokens de autenticación si es necesario
            },
            body: JSON.stringify({
                query: REFRESH_TOKEN,
              variables: { refreshToken: refreshToken },
            }),
          };


        fetch(uri, requestOptions)
        .then(response => response.json())
        .then(data => {
          // Manejar la respuesta de la solicitud aquí
          console.log(data);
          saveTokens(data.refreshToken)
          return(data.refreshToken.token)
        })
        .catch(error => {
          // Manejar errores de la solicitud aquí
          console.error('Error:', error);
        });   


    }    
    return token
}


const saveTokens = (tokenResponse) => {
    console.log(tokenResponse)
    localStorage.setItem('token', tokenResponse.token);
    localStorage.setItem('refreshToken', tokenResponse.refreshToken);
    localStorage.setItem('token', tokenResponse.token);
    localStorage.setItem('origIat', tokenResponse.payload.origIat);
    localStorage.setItem('tokenExpiration', tokenResponse.payload.exp);
    localStorage.setItem('refreshExpiresIn', tokenResponse.refreshExpiresIn);
    localStorage.setItem('username', tokenResponse.payload.username);
  }



export {getJWT, saveTokens}