const mongoose = require('mongoose');





const dbConnection = async() =>{
    try {
        mongoose.connect(process.env.DB_CNN),{
            useNewUrlParser: true,
            useUnifiedtopoly: true,
            useCreateIndex: true
        };

        console.log("bd online");
    } catch (error) {
        console.log(error)
        throw new Error("error al conectar con bd");
    }
}


module.exports = {
    dbConnection
}