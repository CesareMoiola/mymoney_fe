import endPoint from "./endpoint";

const signUp = function(firstName, lastName, email, password){
    const url = endPoint + "/signup";
    let isSignUp = false;

    var data = {
        id: null,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password   
    }

    console.log("Email: " + data.email);

    var request = new XMLHttpRequest();
    request.open('POST', url, false);  // `false` makes the request synchronous
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));

    if (request.status === 200) {
        isSignUp = true;
        console.log("Sign up completed");        
    }
    else{
        console.log("Sign up failed");
    }

    return isSignUp;
}

const signIn = function( email, password){
    const url = endPoint + "/signin";

    let isSignIn = false;

    var data = {
        username: email,
        password: password   
    }

    var request = new XMLHttpRequest();
    request.open('POST', url, false);  // `false` makes the request synchronous
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));

    if (request.status === 200) {
        isSignIn = true;
        console.log("Sign in completed");        
    }
    else{
        console.log("Sign in failed");
    }

    return isSignIn;
}

//Get all user's accounts
const getAccounts = function( email, date ){
    const url = endPoint + "/get_accounts";
    let data = {'email': email, 'date': date};
    let accounts = [];
    
    var request = new XMLHttpRequest();
    request.open('POST', url, false);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));

    if (request.status === 200 && request.responseText !== "") {
        accounts = JSON.parse(request.responseText);
    }

    return accounts;
}

//Update account's amount
const updateAmount = function( email, accountId, amount, date){
    const url = endPoint + "/set_amount";
    let data = {'email': email, 'accountId': accountId, 'amount': amount, "date": date};
    
    var request = new XMLHttpRequest();
    request.open('POST', url, false);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));

    if (request.status === 200) {
        return true;
    }

    return false;
}

//Update account name
const updateAccountName = function( email, id, name){
    const url = endPoint + "/update_account_name";
    let data = {'email': email, 'accountId': id, 'name': name};
    
    var request = new XMLHttpRequest();
    request.open('POST', url, false);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));

    if (request.status === 200) {
        return true;
    }

    return false;
}

//Create a new account
const createNewAccount = function(email, accountName, amount, date){
    const url = endPoint + "/create_new_account";
    let data = {'email': email, 'name': accountName, 'amount': amount, 'date': date};
    
    var request = new XMLHttpRequest();
    request.open('POST', url, false);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));

    if (request.status === 200) {
        return true;
    }

    return false;
}

//Delete an account
const deleteAccount = function(email, accountId){
    const url = endPoint + "/delete_account";
    let data = {'email': email, 'accountId': accountId};
    
    var request = new XMLHttpRequest();
    request.open('POST', url, false);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));

    if (request.status === 200) {
        return true;
    }

    return false;
}

//Save new transaction
const saveTransaction = function(email, date, transactionType, account, accountTo, amount){
    const url = endPoint + "/save_transaction";
    let data = {'email': email, 'date': date, 'transaction_type': transactionType, 'account': account, 'account_to': accountTo, 'amount': amount};
    console.dir(data);
    
    var request = new XMLHttpRequest();
    request.open('POST', url, false);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));

    if (request.status === 200) {
        return true;
    }

    return false;
}

//Get all user's accounts
const getRecurrences = function( email ){
    const url = endPoint + "/get_recurrences";
    let data = {'email': email};
    let recurrences = [];
    
    var request = new XMLHttpRequest();
    request.open('POST', url, false);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));

    if (request.status === 200 && request.responseText !== "") {
        recurrences = JSON.parse(request.responseText);
    }

    return recurrences;
}

const saveRecurrence = function (email, type, name, amount){
    const url = endPoint + "/save_recurrence";
    let data = {'email': email, 'type': type, 'name': name, 'amount': amount};
    
    var request = new XMLHttpRequest();
    request.open('POST', url, false);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));

    if (request.status === 200) return true;
    
    return false;
}

const editRecurrence = function (email, id, type, name, amount){
    const url = endPoint + "/edit_recurrence";
    let data = {'email': email, 'id': id, 'type': type, 'name': name, 'amount': amount};
    
    var request = new XMLHttpRequest();
    request.open('POST', url, false);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));

    if (request.status === 200) return true;

    return false;
}

const deleteRecurrence = function (email, id){
    const url = endPoint + "/delete_recurrence";
    let data = {'email': email, 'id': id};
    
    var request = new XMLHttpRequest();
    request.open('POST', url, false);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));

    if (request.status === 200) return true;

    return false;
}

const checkRecurrence = function(email, id, isChecked){
    const url = endPoint + "/check_recurrence";
    let data = {'email': email, 'id': id, 'isChecked': isChecked};
    
    var request = new XMLHttpRequest();
    request.open('POST', url, false);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));

    if (request.status === 200) return true;

    return false;
}

export{
    signUp,
    signIn,
    getAccounts,
    updateAmount,
    updateAccountName,
    createNewAccount,
    deleteAccount,
    saveTransaction,
    getRecurrences,
    saveRecurrence,
    deleteRecurrence,
    editRecurrence,
    checkRecurrence
};