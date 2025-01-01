const {Schema, model} = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        require: true
    },
    notes:{
        type: String,
        
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})

// sobreescibo el modelo para especificar lo que quiero retornar 

EventoSchema.method('toJSON', function(){
    
    // quitamos __v, _id, la idea es solo dejar id en vez de ese guion bajo
    const {__v, _id, ...object} = this.toObject();
    // creamos el objeto id
    object.id = _id;
    return object;
})


module.exports = model('Evento', EventoSchema);