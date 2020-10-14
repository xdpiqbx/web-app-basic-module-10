const express = require('express')
const app = express()
const products = require('./products.json')

const PORT = process.env.PORT || 4444

//Loads the handlebars module
const exphbs = require('express-handlebars');

app.set('view engine', 'hbs'); // устанавливаю шаблонизатор handlebars вместо стандартного pugjs

app.engine('hbs', exphbs({
    //layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs'
}));

app.use(express.static('public')) // так говорю что в папке public лежат все СТАТИЧНЫЕ публичные ресурсы

app.get('/', (request, response) => {
    // console.log("Callback for root /")
    // console.log(request.url)
    // response.send({name: 'mango'}) // тут просто приходит json
    // response.send("<h1>Hi this is root</h1>") // так не делают
    response.render('home', {title: "Home"})
    // response.render('home', {layout: 'main'}) // по умолчанию это делается так
})

app.get('/about', (request, response) => {
    // console.log("Callback for /about")
    // console.log(request.url)
    // response.send("<h1>Hi this is /about</h1>")
    response.render('about', {title: "About", cssFilename: "about"})
})

app.get('/products', (request, response) => {
    response.render('products', {products, title: "Products", cssFilename: "products"})
})

app.get('/product/:productId', (request, response) => { // двоеточие указывает что это динамический паарметр
    //console.log(request.params) // если вбить в адресую строку /product/asd в консоли получу { productId: 'asd' }
    // по этому
    const product = products.find(p => p.id === request.params.productId)
    response.render('product', {product, title: "Product", cssFilename: "product"})
})

app.listen(PORT, ()=>{
    console.log(`App server is running on port ${PORT}`)
}) // give him port number and callback

