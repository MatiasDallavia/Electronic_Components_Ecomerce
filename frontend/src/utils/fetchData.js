
async function fetchData(SCHEMA, variables, JWT=null) {

    const PORT = process.env.REACT_APP_DJANGO_PORT;
  
    const apiUrl = `http://localhost:${PORT}/graphql`
  
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
        throw new Error('An error occurred while doing the query');
      }
  
      const data = await response.json();
      return data.data
  
    } catch (error) {
      console.error('There was a problem with the query operation:', error);
  
    }
  }


export {fetchData}  