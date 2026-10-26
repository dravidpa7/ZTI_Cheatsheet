# DOM Manipulation Cheat Sheet

> **DOM** = the webpage turned into objects that JavaScript can read and change.
> Think of HTML as the blueprint, and the DOM as the live building you can rearrange.

Every example below has **HTML** and **JavaScript**. Copy both into one `.html` file and open it in your browser.

---

## Quick Reference

| What you want to do | Code |
|---|---|
| Select by id | `document.getElementById("id")` |
| Select first match | `document.querySelector(".class")` |
| Select all matches | `document.querySelectorAll(".class")` |
| Change text | `el.textContent = "Hello"` |
| Change HTML inside | `el.innerHTML = "<b>Hi</b>"` |
| Change style | `el.style.color = "red"` |
| Add / remove / toggle class | `el.classList.add("x")` / `.remove("x")` / `.toggle("x")` |
| Get / set attribute | `el.getAttribute("src")` / `el.setAttribute("src", "a.png")` |
| Read input value | `input.value` |
| Create element | `document.createElement("li")` |
| Add element to page | `parent.appendChild(el)` |
| Remove element | `el.remove()` |
| Listen for event | `el.addEventListener("click", function)` |

---

## 1. Selecting Elements

**Scenario:** Get elements from the page so you can work with them.

```html
<h1 id="title">My Website</h1>
<p class="note">First note</p>
<p class="note">Second note</p>
```

```js
const title = document.getElementById("title");       // one element by id
const firstNote = document.querySelector(".note");    // first match
const allNotes = document.querySelectorAll(".note"); // all matches

console.log(title.textContent); // "My Website"
console.log(allNotes.length);   // 2
```

**Tip:** `querySelector` works with any CSS selector (`.class`, `#id`, `tag`). Use it most of the time.

---

## 2. Change Text

**Scenario:** Show a welcome message after the user logs in.

```html
<h2 id="welcome">Welcome, Guest</h2>
```

```js
const welcome = document.getElementById("welcome");
welcome.textContent = "Welcome, Dravid!";
```

---

## 3. Change HTML Content

**Scenario:** Show a product with a bold price.

```html
<div id="product"></div>
```

```js
const product = document.getElementById("product");
product.innerHTML = "<h3>Headphones</h3><p>Price: <b>₹1,999</b></p>";
```

**Tip:** Use `textContent` for plain text. Use `innerHTML` only when you need HTML tags, and never put raw user input inside it (it can be unsafe).

---

## 4. Change CSS Styles

**Scenario:** Highlight an input in red when there is an error.

```html
<input type="text" id="username" placeholder="Username">
<button id="checkBtn">Check</button>
```

```js
const username = document.getElementById("username");
const checkBtn = document.getElementById("checkBtn");

checkBtn.addEventListener("click", function () {
  if (username.value === "") {
    username.style.border = "2px solid red";
  } else {
    username.style.border = "2px solid green";
  }
});
```

---

## 5. Add / Remove / Toggle CSS Classes (Dark Mode)

**Scenario:** A dark mode button on a website.

```html
<style>
  .dark { background: #111; color: white; }
</style>

<button id="themeBtn">Toggle Dark Mode</button>
<p>Hello, this page can switch themes!</p>
```

```js
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");
});
```

**Tip:** Using classes is cleaner than setting many `style` values in JavaScript.

---

## 6. Click Event (Counter)

**Scenario:** A "Like" button that counts likes.

```html
<button id="likeBtn">👍 Like</button>
<span id="count">0</span>
```

```js
const likeBtn = document.getElementById("likeBtn");
const count = document.getElementById("count");
let likes = 0;

likeBtn.addEventListener("click", function () {
  likes++;
  count.textContent = likes;
});
```

---

## 7. Read Input Value

**Scenario:** A form that greets the user by name.

```html
<input type="text" id="nameInput" placeholder="Enter your name">
<button id="greetBtn">Greet Me</button>
<p id="greeting"></p>
```

```js
const nameInput = document.getElementById("nameInput");
const greetBtn = document.getElementById("greetBtn");
const greeting = document.getElementById("greeting");

greetBtn.addEventListener("click", function () {
  const name = nameInput.value;
  greeting.textContent = "Hello, " + name + "!";
});
```

---

## 8. Create and Add Elements (To-Do List)

**Scenario:** Add a new task to a to-do list.

```html
<input type="text" id="taskInput" placeholder="New task">
<button id="addBtn">Add</button>
<ul id="taskList"></ul>
```

```js
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", function () {
  if (taskInput.value === "") return;      // ignore empty input

  const li = document.createElement("li"); // 1. create
  li.textContent = taskInput.value;        // 2. fill
  taskList.appendChild(li);                // 3. add to page

  taskInput.value = "";                    // clear the input
});
```

**Remember the 3 steps:** create, fill, add.

---

## 9. Remove Elements (Delete Button)

**Scenario:** Delete an item from a cart.

```html
<ul id="cart">
  <li>Shoes <button class="deleteBtn">Delete</button></li>
  <li>Shirt <button class="deleteBtn">Delete</button></li>
  <li>Cap <button class="deleteBtn">Delete</button></li>
</ul>
```

```js
const deleteButtons = document.querySelectorAll(".deleteBtn");

deleteButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    button.parentElement.remove(); // removes the whole <li>
  });
});
```

---

## 10. Change Attributes (Image Gallery)

**Scenario:** Click a small thumbnail to change the big image.

```html
<img id="mainImage" src="photo1.jpg" width="300">
<br>
<img class="thumb" src="photo1.jpg" width="60">
<img class="thumb" src="photo2.jpg" width="60">
<img class="thumb" src="photo3.jpg" width="60">
```

```js
const mainImage = document.getElementById("mainImage");
const thumbs = document.querySelectorAll(".thumb");

thumbs.forEach(function (thumb) {
  thumb.addEventListener("click", function () {
    mainImage.setAttribute("src", thumb.getAttribute("src"));
  });
});
```

---

## 11. Show and Hide (FAQ Section)

**Scenario:** Click a question to show or hide the answer.

```html
<style>
  .hidden { display: none; }
</style>

<h3 id="question">What is the DOM? (click me)</h3>
<p id="answer" class="hidden">The DOM is how JavaScript sees your webpage.</p>
```

```js
const question = document.getElementById("question");
const answer = document.getElementById("answer");

question.addEventListener("click", function () {
  answer.classList.toggle("hidden");
});
```

---

## 12. Simple Form Validation (Password Check)

**Scenario:** Make sure the password is at least 6 characters.

```html
<form id="signupForm">
  <input type="password" id="password" placeholder="Password">
  <button type="submit">Sign Up</button>
  <p id="message"></p>
</form>
```

```js
const form = document.getElementById("signupForm");
const password = document.getElementById("password");
const message = document.getElementById("message");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  if (password.value.length < 6) {
    message.textContent = "Password must be at least 6 characters.";
    message.style.color = "red";
  } else {
    message.textContent = "Account created!";
    message.style.color = "green";
  }
});
```

---

## 13. Disable a Button (Terms Checkbox)

**Scenario:** The "Continue" button works only after the user accepts the terms.

```html
<label>
  <input type="checkbox" id="terms"> I accept the terms
</label>
<button id="continueBtn" disabled>Continue</button>
```

```js
const terms = document.getElementById("terms");
const continueBtn = document.getElementById("continueBtn");

terms.addEventListener("change", function () {
  continueBtn.disabled = !terms.checked;
});
```

---

## 14. Loop Through Many Elements (Tabs)

**Scenario:** Click a tab to highlight it and deselect the others.

```html
<style>
  .tab { padding: 8px 16px; cursor: pointer; }
  .active { background: royalblue; color: white; }
</style>

<span class="tab active">Home</span>
<span class="tab">About</span>
<span class="tab">Contact</span>
```

```js
const tabs = document.querySelectorAll(".tab");

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    tabs.forEach(function (t) {
      t.classList.remove("active");
    });
    tab.classList.add("active");
  });
});
```

---

## Common Beginner Mistakes

1. **Script runs before the HTML loads.** Put your `<script>` tag at the **bottom of `<body>`**, or use `defer`:
   ```html
   <script src="app.js" defer></script>
   ```
2. **Typo in the id or class.** If you get `null`, check your spelling. `querySelector` needs `.` for classes and `#` for ids.
3. **Forgetting `.value` on inputs.** Use `input.value`, not `input.textContent`.
4. **`querySelectorAll` returns a list.** You must loop (`forEach`) to use each element.
5. **Calling the function instead of passing it.** Write `addEventListener("click", myFunc)`, not `myFunc()`.

---

## Learning Order

1. Select elements
2. Change text and styles
3. Handle click events
4. Read input values
5. Create and remove elements

Practice by building a small to-do list, you will use almost everything above. 
