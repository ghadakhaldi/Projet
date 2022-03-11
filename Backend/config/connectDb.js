const mongoose=require ("mongoose")
const connectDB = async () => {
    try {
        //console.log(process.env);
        await mongoose.connect("mongodb+srv://ghadakh123:ghadakh123@cluster0.lzpre.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
        console.log("db successfuly connect");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB

