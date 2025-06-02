import moongoose from 'mongoose';

const UserSchems  = new moongoose.Schema({
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true},
    role:{type: String, enum: ['user', 'admin', 'moderator'], default: 'user'},
    skills: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

},{timestamps: true});


export default moongoose.model('User', UserSchems);
// This code defines a Mongoose schema for a User model with timestamps enabled.