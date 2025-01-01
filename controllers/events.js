const {response} = require('express');
const Evento = require('../models/Evento')


const getEventos = async (req, res=  response)=>{

    // trae los eventos, ademas añede el objeto usuario los campos name y email
    const eventos = await Evento.find().populate('user','name email');


    res.json({
        ok: true,
        msg: eventos,
       
    })
};

const crearEvento = async (req, res=  response)=>{

    const evento = new Evento( req.body);
    try {
        
        evento.user = req.uid;
        const eventoGuardado = await evento.save();
        return res.json({
            ok: true,
            evento: eventoGuardado,
           
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json(
            {
                ok: false,
                msg: "Error al guardar"
            }
        )
    }

    res.json({
        ok: true,
        msg: 'crearEvento',
       
    })
};


const actualizarEvento = async (req, res=  response)=>{

    const eventoId = req.params.id;
    const uid = req.uid;
    try {
        
        const evento = await Evento.findById(eventoId);
        if(!evento){
            return res.status(404).json(
            {
                ok: false,
                msg: "No existe ese evento"
            });
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json(
                {
                    ok: false,
                    msg: "No puede editar ese evento"
                });
        }
        

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});

        return res.json({
            ok: true,
            evento: eventoActualizado,
           
        })

    } catch (error) {
        console.error(error)
        return  res.status(500).json(
            {
                ok: false,
                msg: "Error al guardar"
            }
        )
    }
    
  
};

const eliminarEvento = async (req, res=  response)=>{
    const eventoId = req.params.id;
    const uid = req.uid;
    try {
        
        const evento = await Evento.findById(eventoId);
        if(!evento){
            return res.status(404).json(
            {
                ok: false,
                msg: "No existe ese evento"
            });
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json(
                {
                    ok: false,
                    msg: "No puede eliminar ese evento"
                });
        }
        

     

        await Evento.findByIdAndDelete(eventoId);

        return res.json({
            ok: true
        
           
        })

    } catch (error) {
        console.error(error)
        return  res.status(500).json(
            {
                ok: false,
                msg: "Error al guardar"
            }
        )
    }
};
module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}