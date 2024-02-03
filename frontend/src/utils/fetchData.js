

async function fetchData(SCHEMA, variables, JWT=null) {

    const apiUrl = `http://localhost:8000/graphql`
  
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