const express =  require("express");
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const request = require("request")
const https = require("https")
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("./Public"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
});

// c3e2141137

// 480e148f46f0ac43e843dfe17a98245f-us13

app.post("/",function(req,res){
    const firstName = req.body.firstname;
    const secondName = req.body.secondname;
    const mail = req.body.email;

    const data = {
        members: [
            {
                email_address: mail,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: secondName
                }

            }
        ]
    }

    const jsonData = JSON.stringify(data)
    const url = "https://us13.api.mailchimp.com/3.0/lists/c3e2141137"

    const options={
        method:"POST",
        auth:"emmj0:480e148f46f0ac43e843dfe17a98245f-us13"
    }

    const request = https.request(url,options,function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

})

app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT,function(){
    console.log('Server Started on Port ' + process.env.PORT)
});