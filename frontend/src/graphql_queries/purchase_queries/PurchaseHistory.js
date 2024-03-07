const GET_USER_PURCHASES = `
    query user_purchased_items {
        userPurchasedItems {
            purchaseDate
            quantity
            componentNode{
                __typename
                ... on BJTType {
                    model
                    price
                    mountingTechnology
                    package
                    componentType
                }
                ... on MOSFETType {
                    model
                    price
                    mountingTechnology
                    package
                    componentType
                }
                ... on IGBTType {
                    model
                    price
                    mountingTechnology
                    package
                    componentType
                }
                ... on ResistorType {
                    resistance
                    power
                    price
                    mountingTechnology
                    package
                    componentType
                }
                ... on CapacitorType {
                    capacitance
                    price
                    mountingTechnology
                    package
                    componentType
                }
                ... on InductorType {
                    inductance
                    price
                    mountingTechnology
                    package
                    componentType
                }
                ... on DiodeType {
                    model
                    price
                    mountingTechnology
                    package
                    componentType
                }
            }
        }
        }`;
  
export {GET_USER_PURCHASES}    