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

const character = {
    name: "Sir Thumper",
    title: "Divine Meadow Guardian",
    rank: "SSS Tier",
    imageUrl: "https://a-z-animals.com/media/2022/05/Keep-rabbits-out-of-your-garden-header.jpg",
    lore: "Forged beneath the aurora skies, Sir Thumper commands the cosmic carrots and protects the Meadow from shadowed fox spirits. His paws echo through dimensions, bending petals and starlight to his will.",
    abilities: [
        { icon: "✨", name: "Starfall Hop", description: "Leaps into the sky and crashes down in radiant stardust.", power: 95 },
        { icon: "🌸", name: "Sakura Shield", description: "Summons a rotating blossom barrier of pure light.", power: 88 },
        { icon: "🥕", name: "Cosmic Carrot Beam", description: "Fires a concentrated beam of aurora energy.", power: 99 },
        { icon: "🌙", name: "Moonstep Mirage", description: "Creates illusionary copies across the meadow.", power: 90 }
    ]
};

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