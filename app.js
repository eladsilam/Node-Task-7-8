const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const users = require("./users.json");
const products = require("./products.js")
console.log(typeof(products))
console.log(users);
app.get("/",(req,res)=>
{
    res.send(
        `<h1>Main Page</h1>`
    )
})
app.get("/users/:id", (req, res) => {
  const desiredId = Number(req.params.id);
  const user = users.find((el) => el.id === desiredId);

  // Meaning there is a user answering those params
  if (user) {
    res.send(
      `
      <!DOCTYPE html>
      <html>
      <head>
        <title>User Details</title>
      </head>
      <body>
        <h1>User Details</h1>
        <p>ID:${user.id}</p>
        <p>Name : ${user.name}</p>
        <p>Age : ${user.age}</p>
      </body>
      </html>
      `
    );
  } 
  else {
    res.status(404).json({
      message: `Users with ID ${desiredId} Not Found!`,
    });
  }
});

app.get("/products/:price", (req, res) => {
  const minPrice = Number(req.params.price);
  const relevantProducts = products.filter((el) => el.price > minPrice);
  console.log("what")

  // Meaning there is a user answering those params
  if (relevantProducts.length>0) {
    res.json(
        {
            message: `The products that their price is higher than ${minPrice}`,
            products : {relevantProducts}
        }

    );
  } else {
    res.status(404).json({
      message: `Products that expensive than ${minPrice} not found..`,
    });
  }
});


app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/filter/", (req, res) => {
  const { minAge, maxAge } = req.query;
  const filteredUsersByAge = users.filter(
    (el) => el.age < maxAge && el.age > minAge
  );
  if (filteredUsersByAge.length > 0) {
    res.json({
      message: `The relevant users which between ${minAge} and ${maxAge} are:`,
      users: filteredUsersByAge,
    });
  } else {
    res.status(404).json({
      message: `Users that older than ${minAge} and younger than ${maxAge} not found..`,
    });
  }
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const filteredUser = users.filter((el) => el.id === id);

  if (filteredUser.length > 0) {
    res.json({
      message: `User Number ${id} Details: `,
      user: filteredUser,
    });
  } else {
    res.status(404).json({
      message: `User with ID ${id} not found...`,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});