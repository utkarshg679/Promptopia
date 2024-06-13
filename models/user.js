import {Schema , model, models} from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required'],
    },
    username: {
        type: String,
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
        required: [true, 'Username is required'],
    },
    image: {
        type:String
    }
})

// in express we would have just creasted the new user model that doesnt care if there is already present a model name User as the server is always running
// so we would have typed const User = model("User", userSchema) 
// But in next we can put a check if there is already a model present by the same name , this ensures the code reusability of the existing model as the connection is established everytime we have to access the DB , hence we checked!!!!!

export const User = models.User || model("User", userSchema);
