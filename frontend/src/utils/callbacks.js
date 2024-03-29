const handleInputChange = (setQueryVariables, inputName, value) => {

    if (!isNaN(value) && inputName !== "model"){
        value = Number(value)
    }
    if (value === "ALL" || value === 0){
      value = null
  }

    setQueryVariables((prevQueryVariables) => ({
        ...prevQueryVariables,
        inputs: {
        ...prevQueryVariables.inputs,
        [inputName]: value
        }
    }));
  };

  const handleNestedFieldChange = (setQueryVariables, inputName, transistorTypefield) => (e) => {

    
    let value = e.target.value;

    if (!isNaN(value)){
        value = Number(value)
    }
    if (value === "ALL" || value === 0){
      value = null
    }

    setQueryVariables((prevQueryVariables) => ({
      inputs: {
        ...prevQueryVariables.inputs,
        [inputName]: {
          ...prevQueryVariables.inputs[inputName],
          [transistorTypefield]: value
        }
      }
    }));
  };


function parseComponentAttributeText(text) {
    const result = text.replace(/([A-Z])/g, ' $1');
    
    return result.charAt(0).toUpperCase() + result.slice(1);
  }  
  
  

const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });    
  };  



  export {handleInputChange, handleNestedFieldChange, parseComponentAttributeText, handlePageChange}