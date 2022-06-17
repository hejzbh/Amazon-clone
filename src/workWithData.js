

export const getUsers = async () => {
        try {
            const getAllUsers = await fetch(`https://62a39d0a21232ff9b22317bc.mockapi.io/users`);
            const users = await getAllUsers.json();
        
            return  users;
        }catch(err){
            alert(err);
        }
}

export const checkMultipleAccounts = async (newUser) => {
    try {
        const allUsers = await getUsers();
        const userExistInDatabase = allUsers.some(user=>user.email===newUser.email);

        return userExistInDatabase;

    } catch(err){
        throw err;
    }
}

export const postNewUser = async (newUser) => {
    try {
        const sendNewUserToAPI = fetch(`https://62a39d0a21232ff9b22317bc.mockapi.io/users`, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(newUser),
        });


        if(sendNewUserToAPI.ok===false) throw new Error('Cant sent data');
        
    }catch(err){
        throw(err);
    }
}



export const sendNewProductToAPI = async (userID, product) => {
    try {
        const newProductSending = await fetch(`https://62a39d0a21232ff9b22317bc.mockapi.io/users/${userID}/inCart`, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({product})
        });

        

    }catch(err){
        alert(err);
    }
}

const productApiID = async (userID, productID) => {
    try {
        const getAllFromCart = await getInCart(userID);
        const apiID = getAllFromCart.find(mainAPIobject=>mainAPIobject.product.id===productID).id;

        return apiID;
    } catch(err)
    {
        alert(err);
    }
}

export const deleteProductFromAPI = async (userID, productID) => {


    try {
        

        const apiProductID = await productApiID(userID, productID);
     

        const productDeleting = await fetch(`https://62a39d0a21232ff9b22317bc.mockapi.io/users/${userID}/inCart/${apiProductID}`, {
            method:'DELETE',
        });

    }
    catch(err){
        alert(err);
    }
}

export const updateProdctFromCart = async (userID, product) => {
        try {
            const apiProductID = await productApiID(userID, product.id);

            const updateProduct = await fetch(`https://62a39d0a21232ff9b22317bc.mockapi.io/users/${userID}/inCart/${apiProductID}`, {
                method:'PUT',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({product})
            });
        } catch(err){
            alert(err);
        }
}



export const getInCart = async (userID) => {
    const getInCartProducts = await fetch(`https://62a39d0a21232ff9b22317bc.mockapi.io/users/${userID}/inCart`);
    const inCart = await getInCartProducts.json();

    return  inCart;
};
