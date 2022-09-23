const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            require
        },
        wallet:{
            type:String,
            require
        },
        discordId:{
            type:String,

        },
        telegramId:{
            type:String,
        }
    }
)

module.exports = mongoose.model('userdata',UserSchema)