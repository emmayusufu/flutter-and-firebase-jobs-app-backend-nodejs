const mongoose = require("mongoose")

class Database {
    constructor() {
        this.DB_URI = process.env.MONGO_URI;
        this.DB_OPTIONS = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }
    }

    async connectToDB(){
        await mongoose.connect(this.DB_URI,this.DB_OPTIONS);
    }

}

module.exports = Database