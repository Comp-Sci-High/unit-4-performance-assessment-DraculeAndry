// 1) Use npm to install ejs in the terminal


// 2) create a views and a public folder



// 3) In your public folder create an index.html and add your code from the planning document 
// You can also add your CSS files here too if applicable 




// 4) Now in your views folder create your EJS file and add your HTML code from your planning document



const { name } = require('ejs')
const express = require('express')
const app = express()

app.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
})


// 5) Paste in your data array of objects from the planning documents here. 


const rabbitData = [
  { name: "Cloud Hops", description: "Leaping through cotton candy skies." },
  { name: "Sir Flops-A-Lot", description: "Glowing fur under moonlight." },
  { name: "Sir Thumper", description: "Cherry blossoms follow every hop." }
];

// 6) Add static file middleware here

app.use(express.static(__dirname + "/public"))


// 7) Set the view engine to ejs here

app.set('view engine', 'ejs')

// 8) Create a route handler to path / and send your index.html 
// run your server with node index.js to test it

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// 9) Create a route handler to your overview route from your planning document
// Pass in your data array

app.get("/overview", (req, res) => {
    res.render('rabbit.ejs')
})

// 10) Go to your EJS file and turn the HTML into EJS
// Test and run your server then submit if working (git add . git commit -m 'message' git push)


app.listen(3000, ()=> {
    console.log("Server Started")
})