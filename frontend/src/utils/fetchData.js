
async function fetchData(SCHEMA, variables, JWT=null) {

    const HOST = process.env.REACT_APP_HOST;
    const PORT = process.env.REACT_APP_DJANGO_PORT;
  
    const apiUrl = `${HOST}:${PORT}/graphql`
  
    if (JWT){
      JWT = "JWT " + JWT
    }
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': JWT,
        },
        body: JSON.stringify({
          query: SCHEMA,
          variables: variables,
        }),
      });
  
      if (!response.ok) {
        console.log("!!!!!!!!!")
        throw new Error('An error occurred while doing the query');
      }
  
      const data = await response.json();
      console.log("FIN. ", data)
      return data.data
  
    } catch (error) {
      console.error('There was a problem with the query operation:', error);
  
    }
  }


export {fetchData}  