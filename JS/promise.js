/* =====================================================================
   CALLBACKS -> CALLBACK HELL -> PROMISES   (explained for beginners)
   =====================================================================

   BIG IDEA
   Some work takes time (server call, payment, timer). JavaScript does NOT
   wait for it. It moves on to the next line and comes back when the work
   is done. This is called ASYNCHRONOUS code.

   Real life example: ordering food at a restaurant.
   - You place the order (takes time).
   - You don't stand frozen at the counter. You sit down and do other things.
   - When the food is ready, they call your name.

   The big question is: "How do we run something AFTER the slow work finishes?"
   Answer 1: Callbacks (old way)
   Answer 2: Promises  (better way)
   ===================================================================== */


/* ---------------------------------------------------------------------
   FAKE SLOW FUNCTIONS (used by every example below)
   We build these first so the examples can run.
   --------------------------------------------------------------------- */

// ----- Version A: callback style -----
// "callback" = a function you hand over, to be run when the work is done.
function createOrderWithCallback(cart, callback) {
  console.log("Creating order...");
  setTimeout(function () {            // setTimeout fakes a slow server (1 second)
    const orderId = "122451";
    callback(orderId);                // work is done -> "call me back" with the result
  }, 1000);
}

function proceedToPaymentWithCallback(orderId, callback) {
  setTimeout(function () {
    callback("Payment successful for order " + orderId);
  }, 1000);
}

function orderSummaryWithCallback(paymentInfo, callback) {
  setTimeout(function () {
    callback("Summary: " + paymentInfo);
  }, 1000);
}

function updateWalletWithCallback(callback) {
  setTimeout(function () {
    callback("Wallet updated");
  }, 1000);
}


// ----- Version B: promise style -----
// A Promise is like a TOKEN you get at a restaurant.
// It is not the food yet. It is a promise that food WILL come (or that
// the kitchen will tell you it failed).
//
// A promise is always in one of 3 states:
//   pending   -> still working (waiting for food)
//   fulfilled -> success       (food arrived)   -> resolve(value)
//   rejected  -> failed        (kitchen is out) -> reject(error)
function createOrder(cart) {
  return new Promise(function (resolve, reject) {

    // Failure path: an empty cart is not a valid order
    if (cart.length === 0) {
      reject(new Error("Cart is empty"));   // tell the caller: it failed
      return;                               // stop here
    }

    // Success path: pretend the server takes 1 second
    setTimeout(function () {
      const orderId = "122451";
      resolve(orderId);                     // tell the caller: success, here is the result
    }, 1000);
  });
}

function proceedToPayment(orderId) {
  return new Promise(function (resolve) {
    // resolve() accepts ONE value only, so we join the info into one string
    resolve("Payment successful for order " + orderId);
  });
}

function orderSummary(paymentInfo) {
  return new Promise(function (resolve) {
    resolve("Summary: " + paymentInfo);
  });
}

function updateWalletBalance() {
  return new Promise(function (resolve) {
    resolve("Wallet updated");
  });
}


/* =====================================================================
   PART 1: CALLBACK HELL
   Each step needs the result of the step before it, so we keep
   putting functions inside functions. The code drifts to the right
   in a shape called the "pyramid of doom".
   ===================================================================== */
function demoCallbackHell() {
  const cart = ["Shoe", "Bag", "Hat"];

  createOrderWithCallback(cart, function (orderId) {
    proceedToPaymentWithCallback(orderId, function (paymentInfo) {
      orderSummaryWithCallback(paymentInfo, function (summary) {
        updateWalletWithCallback(function (walletMessage) {
          console.log(summary);
          console.log(walletMessage);
        });
      });
    });
  });

  // PROBLEM 1: Hard to read. 4 steps = 4 levels deep. Imagine 10 steps.
  // PROBLEM 2: INVERSION OF CONTROL.
  //   We hand OUR function to someone else's function (createOrder...).
  //   Now THEY decide whether to call it, when to call it, or even
  //   call it twice (so the customer gets charged twice!).
  //   We lost control over our own code. That is "inversion of control".
}


/* =====================================================================
   PART 2: PROMISES (the fix)
   Instead of handing our function to them, THEY hand us a promise.
   We attach our function to it using .then(). We stay in control.
   ===================================================================== */
function demoPromiseBasic() {
  const cart = ["Shoe", "Bag", "Hat"];

  // createOrder returns a Promise object right away (not the orderId yet).
  // Think of it as an empty box: { data: undefined }.
  // After 1 second the box gets filled with the real order id.
  const promise = createOrder(cart);

  console.log(promise);   // prints: Promise { <pending> }  (box is still empty)

  // .then() means: "when the box is filled, run this function".
  promise.then(function (orderId) {
    console.log("Got order id:", orderId);
    proceedToPayment(orderId);
  });

  // A promise can only be filled ONCE. It cannot call our function twice,
  // so we get our control back. No more inversion of control.
}


/* =====================================================================
   PART 3: A REAL EXAMPLE WITH fetch()
   fetch() is a built-in function that returns a promise.
   ===================================================================== */
function demoFetch() {
  const GITHUB_API = "https://api.github.com/users/dravidpa7";

  const user = fetch(GITHUB_API);

  console.log(user);      // Promise { <pending> }  <- data has not arrived yet

  user.then(function (response) {
    console.log(response); // runs later, after the server replies
  });
}


/* =====================================================================
   PART 4: PROMISE CHAINING (fixes the pyramid)
   Compare with Part 1. Same 4 steps, but now the code goes DOWN,
   not to the right. Much easier to read.

   GOLDEN RULE: always `return` inside .then()
   The returned value is passed to the next .then().
   If you forget `return`, the next step gets `undefined`.
   ===================================================================== */
function demoChaining() {
  const cart = ["Shoe", "Bag", "Hat"];

  createOrder(cart)
    .then(function (orderId) {
      return proceedToPayment(orderId);     // returns a promise -> next .then waits for it
    })
    .then(function (paymentInfo) {
      return orderSummary(paymentInfo);
    })
    .then(function (summary) {
      console.log(summary);
      return updateWalletBalance();
    })
    .then(function (walletMessage) {
      console.log(walletMessage);
    });
}


/* =====================================================================
   PART 5: ERROR HANDLING with .catch() and .finally()
   ===================================================================== */
function demoErrorHandling(cart) {
  createOrder(cart)
    .then(function (orderId) {
      console.log("Order id:", orderId);
      return orderId;                         // pass it to the next step
    })
    .then(function (orderId) {
      return proceedToPayment(orderId);
    })
    .then(function (paymentInfo) {
      console.log(paymentInfo);
    })

    // .catch() is the FAILURE handler.
    // If ANY step above fails, JavaScript SKIPS the remaining .then() steps
    // and jumps straight to the nearest .catch() below.
    // So one catch at the END protects the whole chain.
    .catch(function (error) {
      console.log("Something went wrong:", error.message);
    })

    // .finally() runs ALWAYS, success or failure.
    // Good for cleanup, like hiding a loading spinner.
    .finally(function () {
      console.log("Finished (this always runs)");
    });

  // TIP: if you put .catch() in the MIDDLE of a chain, it handles the error
  // and the chain CONTINUES with the next .then() (receiving undefined).
  // That is usually not what you want, so put .catch() at the END.
}


/* =====================================================================
   RUN ONE DEMO AT A TIME
   Remove the // in front of ONE line, then run: node promises-explained.js
   (Running all at once mixes up the console output.)
   ===================================================================== */

// demoCallbackHell();
// demoPromiseBasic();
// demoFetch();                         // needs Node 18+ or a browser
// demoChaining();
// demoErrorHandling(["BMW", "Benz"]);  // success case
// demoErrorHandling([]);               // failure case: empty cart


/* =====================================================================
   SUMMARY (one-minute revision)
   - Async code: slow work runs in the background, JS does not wait.
   - Callback: pass a function, "call me when done".
   - Callback hell: functions nested inside functions (pyramid shape).
   - Inversion of control: we give our function away, so we lose control.
   - Promise: an object that represents a future result (pending/fulfilled/rejected).
   - .then()    -> run when it succeeds
   - .catch()   -> run when it fails
   - .finally() -> run either way
   - Chaining: return a value in each .then() to feed the next one.
   ===================================================================== */
