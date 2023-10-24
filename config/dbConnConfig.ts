import mongoose from "mongoose";

const DBConnect = async (user: string | undefined, password: string | undefined, dbName: string | undefined) => {
    try{
        await mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.txdgoxx.mongodb.net/${dbName}?retryWrites=true&w=majority`);
    }catch(err){
        console.log(err)
    }
}

export default DBConnect;