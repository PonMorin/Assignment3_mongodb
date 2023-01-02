const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const dbConfig = require('./public/config/mongodb.config.js')
const Customer = require('./public/models/customer.js')

const cors = require('cors')
const customer = require('./public/models/customer.js')
const app = express();


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url)
    .then(() =>{
        Customer.deleteMany({}, (err) => {
    if(err){
        process.exit();
        }
        console.log('Remove Collection of Customer')
        initCustomer();
        });
    }).catch(err=>{
        console.log('Cannot Connect to MongoDB')
        process.exit();
    })

app.use(cors())
require('./public/routes/customer.route.js')(app);

const server = app.listen(3000, ()=>{
    let port = server.address().port
    console.log('Run at http://localhost:%s', port)
})

function initCustomer(){
    let data = [
        {
            CustomerId: 1001,
            FullName: "Krisada",
            Address: "Nonthaburi"
        },
        {
            CustomerId: 1002,
            FullName: "Pon",
            Address: "Phatumtani"
        },
        {
            CustomerId: 1003,
            FullName: "Chon",
            Address: "Bangkok"
        }
    ]

    for(let i = 0; i < data.length; i++){
        const c = new Customer(data[i]);
        c.save()
    }
    console.log("สร้าง Customer สำเร็จแล้ว")
}