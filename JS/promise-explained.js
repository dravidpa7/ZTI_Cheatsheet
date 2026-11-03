// // Call back Hell : Multiple callback functions are in a nested form like Function inside a function
// // Inverstion of  Control : Function inside another function we loose control over our code
// // Promises

// const card = ["Shoe","Bag","Hat"]

// // this process are async aperations we dont know about how much time it take

// createOrder(card) // return order id

// proccedToPayment(orderId) // Handle Payments

// createOrder(card, function(orderId){
//     proccedToPayment(orderId);
// })

// const promise = createOrder(card) // return empty object {data : undefined} -> data : order Details

// // once object filled with values it get executed

// promise.then(function(orderId){
//     proccedToPayment(orderId); 
// })

// const GITHUB_API = "https://api.github.com/users/dravidpa7"

// const user = fetch(GITHUB_API);

// console.log(user);

// user.then(function(data){
//     console.log(data);
// })

// const card = ["Shoe","Bag","Hat"]

// createOrder(card, function(){
//     proccedToPayment(orderId,function(){
//         orderSummary(DataTransfer, function(){
//             updateWalletbalance();
//         });
//     });
// });

// const promise = createOrder(card);

// promise.then(function(orderId){
//     proccedToPayment(orderId);
// })
// // Both are same when creating Promise
// // when channing promise need to return a data to next chain
// createOrder(card).promise
//     .then(function(orderId){
//         return proccedToPayment(orderId);
//     })
//     .then(function(DataTransfer){
//         return orderSummary(DataTransfer);
//     })
//     .then(function(){
//         return updateWalletbalance();
//     })

const cars = ["BMW","Bens","Ford"];

//create order
const promise = createOrder(cars);
console.log(promise)

promise
    .then(function(orderId){
        console.log(orderId);
        return orderId;
    })
    .catch(function(error){
        console.log(error.message); // It shows all kinds of error
    })
    .then(function(orderId){
        return proceedToPayment(orderId);  
        // we can return a data or promise itself
        // console.log(orderId);
        // return proceedToPayment();  this is also a way to do that
    })
    .then(function(dataPaymentInfo){
        console.log(dataPaymentInfo);
    })
    // It is faliure part when the promise get rejected
    // .catch(function(error){
    //     console.log(error.message); // It shows all kinds of error
    // }) // It check all then and If one fail all process get failed
    .finally(()=>console.log("executed 1"));

function createOrder(cars){
    const pr = new Promise(function(resolve, reject){
        const validateCars = false
        if(!validateCars){
            const error = new Error("cars List is empty");
            reject(error);
        }
        else{
            const orderId = '122451'
            setTimeout(function(){
                resolve(orderId);
            },1000)
        }

    })
    return pr
}

function proceedToPayment(orderId){
    return new Promise(function(resolve, reject){
        resolve("Payment successfull",orderId)
    })
}
