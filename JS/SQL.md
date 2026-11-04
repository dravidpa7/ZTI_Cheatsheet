

1. A sample table with mock data.
2. A `CREATE TABLE` and `INSERT INTO` snippet.
3. SQL queries to execute and practice.
4. Expected results where useful.

We'll use SQLite-compatible SQL, so you can run everything in SQLite, DB Browser for SQLite, or an online SQL editor.

# 1. Sample database – mock data

First, run this setup script. It creates all the tables we'll use throughout the exercises.

## A. Create tables and insert mock data

RUN THIS FIRST

```
-- 1. MOVIES / SHOWS
CREATE TABLE shows (
    id INTEGER PRIMARY KEY,
    name TEXT,
    genre TEXT,
    year INTEGER,
    rating REAL
);

INSERT INTO shows VALUES
(1, 'Breaking Bad', 'Crime', 2008, 9.5),
(2, 'Dark', 'Sci-Fi', 2017, 8.7),
(3, 'Stranger Things', 'Sci-Fi', 2016, 8.6),
(4, 'Friends', 'Comedy', 1994, 8.9),
(5, 'The Office', 'Comedy', 2005, 9.0),
(6, 'Sherlock', 'Crime', 2010, 9.1),
(7, 'Game of Thrones', 'Fantasy', 2011, 9.2),
(8, 'Wednesday', 'Fantasy', 2022, 8.1),
(9, 'Money Heist', 'Crime', 2017, 8.2),
(10, 'Avatar', 'Sci-Fi', 2022, 7.8);


-- 2. PLAYLIST
CREATE TABLE playlist (
    id INTEGER PRIMARY KEY,
    title TEXT,
    artist TEXT,
    genre TEXT,
    duration INTEGER,
    plays INTEGER
);

INSERT INTO playlist VALUES
(1, 'Shape of You', 'Ed Sheeran', 'Pop', 240, 1000),
(2, 'Blinding Lights', 'The Weeknd', 'Pop', 200, 1500),
(3, 'Believer', 'Imagine Dragons', 'Rock', 204, 800),
(4, 'Perfect', 'Ed Sheeran', 'Pop', 263, 1200),
(5, 'Thunder', 'Imagine Dragons', 'Rock', 187, 900),
(6, 'Levitating', 'Dua Lipa', 'Pop', 203, 700),
(7, 'Numb', 'Linkin Park', 'Rock', 185, 1100),
(8, 'Stay', 'Justin Bieber', 'Pop', 141, 600);


-- 3. COMPANIES
CREATE TABLE companies (
    id INTEGER PRIMARY KEY,
    name TEXT,
    headquarters TEXT,
    year INTEGER,
    website TEXT
);

INSERT INTO companies VALUES
(1, 'Google', 'California', 1998, 'google.com'),
(2, 'Microsoft', 'Washington', 1975, 'microsoft.com'),
(3, 'Amazon', 'Washington', 1994, 'amazon.com'),
(4, 'Zoho', 'Chennai', 1996, 'zoho.com');


-- 4. GAMES
CREATE TABLE games (
    id INTEGER PRIMARY KEY,
    title TEXT,
    genre TEXT,
    developer TEXT,
    year INTEGER
);

INSERT INTO games VALUES
(1, 'Minecraft', 'Sandbox', 'Mojang', 2011),
(2, 'GTA V', 'Action', 'Rockstar', 2013),
(3, 'FIFA 24', 'Sports', 'EA', 2023),
(4, 'Valorant', 'Shooter', 'Riot', 2020),
(5, 'Minecraft Dungeons', 'Action', 'Mojang', 2020);


-- 5. PETS
CREATE TABLE pets (
    id INTEGER PRIMARY KEY,
    name TEXT,
    species TEXT,
    age INTEGER
);

INSERT INTO pets VALUES
(1, 'Mochi', 'Cat', 3),
(2, 'Bruno', 'Dog', 5),
(3, 'Cloud', 'Cat', 1),
(4, 'Rocky', 'Dog', 4),
(5, 'Kiwi', 'Bird', 2);


-- 6. BOOKS AND AUTHORS
CREATE TABLE authors (
    id INTEGER PRIMARY KEY,
    name TEXT
);

CREATE TABLE books (
    id INTEGER PRIMARY KEY,
    title TEXT,
    author_id INTEGER,
    FOREIGN KEY (author_id) REFERENCES authors(id)
);

INSERT INTO authors VALUES
(1, 'James Clear'),
(2, 'Robert Kiyosaki'),
(3, 'George Orwell'),
(4, 'Paulo Coelho');

INSERT INTO books VALUES
(1, 'Atomic Habits', 1),
(2, 'Rich Dad Poor Dad', 2),
(3, '1984', 3),
(4, 'The Alchemist', 4),
(5, 'Animal Farm', 3),
(6, 'Unknown Book', NULL);


-- 7. STUDENTS AND TEACHERS
CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT,
    department TEXT
);

CREATE TABLE teachers (
    id INTEGER PRIMARY KEY,
    name TEXT,
    department TEXT
);

INSERT INTO students VALUES
(1, 'Arun', 'CSE'),
(2, 'Bala', 'ECE'),
(3, 'Charan', 'IT'),
(4, 'Deepak', 'CSE');

INSERT INTO teachers VALUES
(1, 'Ravi', 'CSE'),
(2, 'Kumar', 'ECE'),
(3, 'Priya', 'IT'),
(4, 'Meena', 'MECH');


-- 8. E-COMMERCE DATABASE
CREATE TABLE customers (
    id INTEGER PRIMARY KEY,
    name TEXT,
    location TEXT,
    email TEXT
);

CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    price REAL,
    active INTEGER,
    inventory INTEGER
);

CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    order_date TEXT,
    customer_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    fulfilled INTEGER,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO customers VALUES
(1, 'Arun', 'Madurai', 'arun@gmail.com'),
(2, 'Bala', 'Chennai', 'bala@gmail.com'),
(3, 'Charan', 'Coimbatore', 'charan@gmail.com'),
(4, 'Deepak', 'Madurai', 'deepak@gmail.com');

INSERT INTO products VALUES
(1, 'Laptop', 55000, 1, 10),
(2, 'Mouse', 500, 1, 50),
(3, 'Keyboard', 1500, 1, 30),
(4, 'Monitor', 12000, 0, 5),
(5, 'Headphones', 2500, 1, 20);

INSERT INTO orders VALUES
(1, '2026-01-10', 1, 1, 1, 1),
(2, '2026-01-12', 2, 2, 2, 1),
(3, '2026-01-15', 1, 3, 1, 0),
(4, '2026-02-01', 3, 5, 1, 1),
(5, '2026-02-05', 4, 2, 3, 0),
(6, '2026-02-10', 2, 4, 1, 1);
```

Note: `active`, `fulfilled` use 1 for true and 0 for false. These are SQLite-friendly representations.

# 2. SQL concepts – practice snippets

## Chapter 1: SQL fundamentals

### 01. SELECT – Retrieve data

```
-- Get all columns
SELECT *
FROM shows;

-- Get only selected columns
SELECT name, genre
FROM shows;

-- Retrieve specific columns from products
SELECT name, price
FROM products;
```

### 02. DISTINCT – Unique values

```
-- Get unique genres
SELECT DISTINCT genre
FROM shows;

-- Get unique locations
SELECT DISTINCT location
FROM customers;

-- Get unique artists
SELECT DISTINCT artist
FROM playlist;
```

### 03. WHERE – Filter records

```
-- Find crime shows
SELECT *
FROM shows
WHERE genre = 'Crime';

-- Find products above 1000
SELECT *
FROM products
WHERE price > 1000;

-- Multiple conditions
SELECT *
FROM shows
WHERE genre = 'Comedy'
AND year > 2000;
```

### 04. LIKE – Pattern matching

```
-- Names starting with B
SELECT *
FROM shows
WHERE name LIKE 'B%';

-- Names ending with s
SELECT *
FROM shows
WHERE name LIKE '%s';

-- Names containing the word 'the'
SELECT *
FROM shows
WHERE name LIKE '%the%';

-- Customer names starting with A
SELECT *
FROM customers
WHERE name LIKE 'A%';
```

Remember:

| Pattern | Meaning               |
| ------- | --------------------- |
| `'A%'`  | Starts with A         |
| `'%A'`  | Ends with A           |
| `'%A%'` | Contains A            |
| `'_a%'` | Second character is a |

### 05. BETWEEN – Range filtering

```
-- Shows released between 2010 and 2020
SELECT *
FROM shows
WHERE year BETWEEN 2010 AND 2020;

-- Products priced between 500 and 5000
SELECT *
FROM products
WHERE price BETWEEN 500 AND 5000;

-- Songs with duration between 180 and 240
SELECT *
FROM playlist
WHERE duration BETWEEN 180 AND 240;
```

`BETWEEN` includes both boundary values.

### 06. ORDER BY – Sorting

```
-- Ascending order
SELECT *
FROM shows
ORDER BY year ASC;

-- Descending order
SELECT *
FROM shows
ORDER BY rating DESC;

-- Sort products by price
SELECT *
FROM products
ORDER BY price ASC;

-- Sort by multiple columns
SELECT *
FROM shows
ORDER BY genre ASC, year DESC;
```

## Chapter 2: Aggregate functions

### 07. COUNT() – Count rows

```
-- Total number of shows
SELECT COUNT(*)
FROM shows;

-- Total number of products
SELECT COUNT(*)
FROM products;

-- Count only active products
SELECT COUNT(*)
FROM products
WHERE active = 1;
```

### 08. MIN() – Minimum value

```
-- Lowest product price
SELECT MIN(price)
FROM products;

-- Shortest song duration
SELECT MIN(duration)
FROM playlist;
```

### 09. MAX() – Maximum value

```
-- Highest product price
SELECT MAX(price)
FROM products;

-- Highest-rated show
SELECT MAX(rating)
FROM shows;
```

### 10. SUM() – Total value

```
-- Total song plays
SELECT SUM(plays)
FROM playlist;

-- Total inventory
SELECT SUM(inventory)
FROM products;

-- Total ordered quantity
SELECT SUM(quantity)
FROM orders;
```

### 11. AVG() – Average value

```
-- Average show rating
SELECT AVG(rating)
FROM shows;

-- Average product price
SELECT AVG(price)
FROM products;

-- Average song duration
SELECT AVG(duration)
FROM playlist;
```

### 12. GROUP BY – Group records

```
-- Count shows by genre
SELECT genre, COUNT(*)
FROM shows
GROUP BY genre;

-- Average rating by genre
SELECT genre, AVG(rating)
FROM shows
GROUP BY genre;

-- Total plays by artist
SELECT artist, SUM(plays)
FROM playlist
GROUP BY artist;

-- Count orders by customer
SELECT customer_id, COUNT(*)
FROM orders
GROUP BY customer_id;
```

## Chapter 3: Database modification (CRUD)

### 13. CREATE TABLE – Create a new table

```
CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    salary REAL,
    department TEXT
);
```

### 14. INSERT INTO – Add records

```
INSERT INTO employees
(id, name, role, salary, department)
VALUES
(1, 'Arun', 'Developer', 35000, 'IT'),
(2, 'Bala', 'Tester', 30000, 'QA'),
(3, 'Charan', 'Designer', 32000, 'Design'),
(4, 'Deepak', 'Developer', 40000, 'IT');

-- Insert one more employee
INSERT INTO employees
(name, role, salary, department)
VALUES
('Kumar', 'Manager', 50000, 'HR');
```

### 15. ALTER TABLE – Modify table structure

```
-- Add a new column
ALTER TABLE employees
ADD COLUMN email TEXT;

-- Check the table
SELECT *
FROM employees;
```

### 16. UPDATE – Modify existing records

```
-- Update one employee
UPDATE employees
SET salary = 45000
WHERE id = 1;

-- Update multiple records
UPDATE employees
SET department = 'Engineering'
WHERE department = 'IT';

-- Update multiple columns
UPDATE employees
SET salary = 55000,
    role = 'Senior Developer'
WHERE id = 4;
```

### 17. DELETE FROM – Remove records

```
-- Delete a particular employee
DELETE FROM employees
WHERE id = 2;

-- Delete all employees in a department
DELETE FROM employees
WHERE department = 'HR';

-- View remaining records
SELECT *
FROM employees;
```



Important

&#x20;Always use `WHERE` when you intend to delete or update specific records. Without it, every row can be affected.



## Chapter 4: JOIN operations

For this chapter, use the `books` and `authors` tables created earlier.

### 18. JOIN / INNER JOIN – Matching records

```
SELECT
    books.title,
    authors.name AS author
FROM books
INNER JOIN authors
ON books.author_id = authors.id;
```

Expected result:

| title             | author          |
| ----------------- | --------------- |
| Atomic Habits     | James Clear     |
| Rich Dad Poor Dad | Robert Kiyosaki |
| 1984              | George Orwell   |
| The Alchemist     | Paulo Coelho    |
| Animal Farm       | George Orwell   |

### 19. LEFT JOIN – All records from left table

```
SELECT
    books.title,
    authors.name AS author
FROM books
LEFT JOIN authors
ON books.author_id = authors.id;
```

Expected result:

| title             | author          |
| ----------------- | --------------- |
| Atomic Habits     | James Clear     |
| Rich Dad Poor Dad | Robert Kiyosaki |
| 1984              | George Orwell   |
| The Alchemist     | Paulo Coelho    |
| Animal Farm       | George Orwell   |
| Unknown Book      | NULL            |

Difference:

- `INNER JOIN`: Only matching records.
- `LEFT JOIN`: All records from the left table, including unmatched records.

### 20. UNION – Combine results

```
-- Get names from both tables
SELECT name
FROM students

UNION

SELECT name
FROM teachers;
```

`UNION` removes duplicate records.

Try `UNION ALL` too:

```
SELECT name
FROM students

UNION ALL

SELECT name
FROM teachers;
```

`UNION ALL` keeps duplicates.

### 21. JOIN with three tables – E-commerce practice

Now use `customers`, `products`, and `orders`.

```
SELECT
    customers.name AS customer,
    products.name AS product,
    orders.quantity,
    products.price
FROM orders
INNER JOIN customers
    ON orders.customer_id = customers.id
INNER JOIN products
    ON orders.product_id = products.id;
```

Calculate total order value:

```
SELECT
    customers.name AS customer,
    products.name AS product,
    orders.quantity,
    products.price,
    orders.quantity * products.price AS total
FROM orders
INNER JOIN customers
    ON orders.customer_id = customers.id
INNER JOIN products
    ON orders.product_id = products.id;
```

# 3. Practice exercises – Try without looking at answers

Use the sample database above. These exercises help you understand how to combine concepts.

SQL practice checklist

0/15 completed

1\. Display all products.

Show answer

2\. Find all unique genres in shows.

Show answer

3\. Find shows released after 2015.

Show answer

4\. Find products costing less than 3000.

Show answer

5\. Find shows whose names start with S.

Show answer

6\. Find products priced between 1000 and 10000.

Show answer

7\. Sort shows by rating from highest to lowest.

Show answer

8\. Count the total number of customers.

Show answer

9\. Find the most expensive product.

Show answer

10\. Calculate the total inventory.

Show answer

11\. Calculate average show rating.

Show answer

12\. Count songs by genre.

Show answer

13\. Find customers and their orders.

Show answer

14\. Find all books including books without authors.

Show answer

15\. Display names from students and teachers without duplicates.

Show answer

Reset practice

# 4. SQLite – Run your practice database

Your PDF also includes SQLite installation, database creation, table creation, and CSV import (pages 13–15).&#x20;

SQL.pdf



If you're using SQLite CLI:

```
# Open SQLite
sqlite3 practice.db
```

Inside SQLite:

```
-- Display column headers
.headers on

-- Format output
.mode column

-- Show all tables
.tables

-- View table structure
.schema shows

-- Execute query
SELECT * FROM shows;

-- Exit
.quit
```

# 5. Recommended learning order

| Stage | Concepts                  | Practice target            |
| ----- | ------------------------- | -------------------------- |
| 1     | SELECT, DISTINCT          | Retrieve data              |
| 2     | WHERE, LIKE, BETWEEN      | Filter data                |
| 3     | ORDER BY                  | Sort data                  |
| 4     | COUNT, MIN, MAX, SUM, AVG | Calculate values           |
| 5     | GROUP BY                  | Group records              |
| 6     | CREATE, INSERT            | Create and populate tables |
| 7     | ALTER, UPDATE, DELETE     | Modify data                |
| 8     | INNER JOIN, LEFT JOIN     | Connect tables             |
| 9     | UNION                     | Combine results            |
