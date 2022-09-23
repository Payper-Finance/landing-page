const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const UserSchema = require('./models/UserData')
const cors = require('cors');
const dotenv = require('dotenv')

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true,useUnifiedTopology: true})
.then((result)=>{console.log("connected to db")}).catch((err)=>{console.log(err)});
app.use(cors({origin:'*'}));
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(8000,()=>{
    console.log('Started in 8000 PORT')
})

app.post('/post',async(req,res)=>{
console.log(req.body.email)
console.log(req.body.wallet)

    const emailexist = await UserSchema.exists({email:req.body.email});
    const walletexist = await UserSchema.exists({wallet:req.body.wallet});
console.log(emailexist)
console.log(walletexist)
    if(!emailexist && !walletexist ){
        var userdata = {
            email:req.body.email,
            wallet:req.body.wallet,
            discordId:req.body.discordId,
            telegramId:req.body.telegramId
        }
    
        UserSchema.create(userdata)
        res.send("OK")

    }
    else{
        res.send("user Exist")
    }
 
})