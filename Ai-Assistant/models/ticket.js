import moongoose from 'mongoose';

const TicketSchema  = new moongoose.Schema({
    title: {type: String},
    description: {type : String},
    status: {type: String, default: "TODO"},
    createdBy: {type: moongoose.Schema.Types.ObjectId, ref: 'User'},
    assignedTo: {type: moongoose.Schema.Types.ObjectId, ref: 'User', default: null},
    priority: String,
    deadline: Date,
    helpfulNotes: String,
    relatedSkills: [String],
    createdAt: {type: Date , default: Date.now},

},{timestamps: true});


export default moongoose.model('Ticket', TicketSchema);
// This code defines a Mongoose schema for a User model with timestamps enabled.