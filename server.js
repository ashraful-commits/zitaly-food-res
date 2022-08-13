import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import path, { dirname } from "path"
import url, { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url))
// dotenv config 
dotenv.config();

// environment const 
const port = process.env.PORT || 400;

// init express 
const app = express();

app.use('/public', express.static('public'));

// json contact 
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public/index.html'))
})
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname,'public/index.html'))
})

// menu 
app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname,'public/menu.html'))
})
// location 
app.get('/location', (req, res) => {
    res.sendFile(path.join(__dirname,'public/location.html'))
})
// blog 
app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname,'public/archive.html'))
})
// reservation 

app.get('/reservation', (req, res) => {
    res.sendFile(path.join(__dirname,'public/reservation.html'))
})
// staff 
app.get('/staff', (req, res) => {
    res.sendFile(path.join(__dirname,'public/staff.html'))
})

// news 
app.get('/news', (req, res) => {
    res.sendFile(path.join(__dirname,'public/news.html'))
})

// gallary 
app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname,'public/gallery.html'))
})
app.post('/contact', (req, res) => {
    res.status(200).json(req.body)
})



// sever creating 
app.listen(port,() => {
    console.log(`server is running ${port}`.bgYellow);
})