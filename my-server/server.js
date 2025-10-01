const express = require("express");
const path = require("path");
const ejs = require("ejs");

const app = express();
const PORT = 3000;

// Статика и CSS
app.use(express.static(path.join(__dirname, "public")));

// --- PUG ---
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views/pug"));

// Данные пользователей
const users = [
  { id: 1, name: "Роман", age: 17 },
  { id: 2, name: "Анна", age: 20 },
  { id: 3, name: "Игорь", age: 25 },
];

// Маршруты PUG
app.get("/users", (req, res) => {
  res.render("users", { users });
});

app.get("/users/:userId", (req, res) => {
  const user = users.find(u => u.id === +req.params.userId);
  if (!user) return res.status(404).send("User not found");
  res.render("user", { user });
});

// --- EJS ---
app.engine("ejs", ejs.__express);
app.set("views", path.join(__dirname, "views/ejs"));

// Данные статей
const articles = [
  { id: 1, title: "Первая статья", content: "Текст первой статьи" },
  { id: 2, title: "Вторая статья", content: "Текст второй статьи" },
];

// Маршруты EJS
app.get("/articles", (req, res) => {
  res.render("articles", { articles });
});

app.get("/articles/:articleId", (req, res) => {
  const article = articles.find(a => a.id === +req.params.articleId);
  if (!article) return res.status(404).send("Article not found");
  res.render("article", { article });
});

app.get("/", (req, res) => {
  res.send(`
    <h1>Главная страница</h1>
    <ul>
      <li><a href="/users">Список пользователей (PUG)</a></li>
      <li><a href="/articles">Список статей (EJS)</a></li>
    </ul>
  `);
});

app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));
