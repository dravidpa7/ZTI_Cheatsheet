Passing a function into another function is really about **handing over a piece of behavior** instead of a piece of data. Here's a mental model for it.

## The mental model: the pizza shop and the topping robot

Imagine you run a pizza shop. You have a `makePizza` machine that always does the same steps: make dough, add sauce, bake. But the **one step that changes** is what happens in the middle: add cheese, or add veggies, or add chicken.

Instead of building 10 different machines, you build **one machine** and give it a **instruction card** for the changing step.

```js
function makePizza(addTopping) {
  console.log("Make dough");
  console.log("Add sauce");
  addTopping();            // <-- run the card you were given
  console.log("Bake");
}

function addCheese()  { console.log("Add cheese"); }
function addChicken() { console.log("Add chicken"); }

makePizza(addCheese);
makePizza(addChicken);
```

`makePizza` doesn't know *what* the topping step does. It only knows **when** to run it. You decide the *what* from outside.

So: **the outer function controls WHEN. The function you pass in controls WHAT.**

## Passing a function vs calling a function in another place

This is where most confusion comes from. The difference is the **parentheses `()`**.

```js
makePizza(addCheese);     // passing the function (the card itself)
makePizza(addCheese());   // calling it right now, passing its RESULT
```

| Code | Meaning |
|---|---|
| `addCheese` | The instruction card (not executed) |
| `addCheese()` | Execute the card **now**, get the result |

**Mental model:** `addCheese` = a recipe written on paper. `addCheese()` = actually cooking it.

When you pass `addCheese`, you hand over the paper so someone else can cook it later, whenever *they* decide. When you write `addCheese()`, you cook it immediately, right there.

## Calling inside vs passing in: what's the actual difference?

**Option A: calling a fixed function inside**

```js
function makePizza() {
  console.log("Make dough");
  addCheese();             // hardcoded, always cheese
  console.log("Bake");
}
```

`makePizza` is locked to cheese. To change it, you must edit `makePizza`.

**Option B: passing the function in**

```js
function makePizza(addTopping) {
  addTopping();            // flexible
}
```

`makePizza` works with any topping, and you never touch its code again.

## Why JavaScript needs this: timing

Some things happen **later**: a click, a timer, a server response. You can't run the code now, so you say "when that happens, run this function":

```js
button.addEventListener("click", showMessage);   // run later, on click
setTimeout(sayHi, 2000);                         // run after 2 seconds
fetch(url).then(handleData);                     // run when data arrives
```

If you wrote `setTimeout(sayHi(), 2000)`, it would run `sayHi` **immediately** instead of after 2 seconds. That's the classic beginner bug.

This pattern is called a **callback**: "call me back when you're ready."

## Real example you'll use constantly

```js
const numbers = [1, 2, 3, 4];

const doubled = numbers.map(function (n) {
  return n * 2;
});
```

`map` knows **how to loop**. You tell it **what to do to each item** by passing a function. Same idea as the pizza machine: reusable process, swappable step.

## One-line summary

> Pass a function when you want **someone else to decide when to run it**. Call a function when you want it to run **right now**.
