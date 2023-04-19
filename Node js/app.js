const http = require('http');
const controllRoute=require('./newStack')


const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const main=async ()=>{
    try {
    await mongoose.connect('')     
    } catch (error) {
        console.log(error);
    }
}
main()

const server = http.createServer((req, res) => {
    controllRoute(req,res)
    // res.statusCode=200
    // res.write(JSON.stringify({app:"Express app"}))
    // res.end()
})


server.listen(8081, () => {
    console.log('listening on 8081');
    console.log(JSON.stringify({name:"app"}));
    console.log(JSON.parse('{"name":"app"}'));
})
