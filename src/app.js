const express = require("express");
const bodyparser = require("body-parser");
const coneciton = require("./databse/Conection.js"); 
const categoriesController = require("./controller/categories/CategoriesController");
const articlesController = require("./controller/articles/ArticlesController");
const homeController = require("./controller/home/HomeController");
const usersController = require("./controller/User/usersController");



const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
const PORT = 5555;

app.use("/",categoriesController);
app.use("/",articlesController);
app.use("/",homeController);
app.use("/",usersController);

app.use
 

/*
app.get("/:slug", (req, res) => {
  var slug = req.params.slug;
  Articles.findOne({
    where: {
      slug: slug
    }
  }).then(article => {
    if (article != undefined) {
      res.render("articles", { article: article });
    } else {
      res.redirect("/");
    }
  });

  
  
});*/

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
coneciton.authenticate().then(() => {
  console.log("Conected to database");
}).catch((error) => {
  console.log("Error to connect to database: ", error);
});

