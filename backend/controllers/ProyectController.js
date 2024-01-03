import Proyect from "../models/Proyects.js"
import Tasks from "../models/Task.js";


const GetProyects=async (req,res)=>{
    const proyects= await Proyect.find().where('owner').equals(req.usuario._id);
    return res.json(proyects);
}
const NewProyect=async (req,res)=>{
    const proyects= new Proyect(req.body);
    proyects.owner=req.usuario._id;
    try {
        const Proyect= await proyects.save();
        return res.json(Proyect);
    } catch (error) {
        return res.status(400).json("Hubo un error al momento de generar");
    }
}
const GetProyect=async(req,res)=>{
    const {id}= req.params;
    const proyects= await Proyect.findById(id);
    if(!proyects){
        return res.status(404).json({msg:"Proyecto no encontrado"})
    }
    if(proyects.owner.toString()!=req.usuario._id){
        return res.status(401).json({msg:"Accion no valida"})
    }

    const Task =await Tasks.find().where('Owner').equals(proyects._id)
    console.log(Task)
    return res.json({
        proyects,
        Task
    });
    
}
const UpdateProyect=async (req,res)=>{
    const {id}= req.params;
    const proyects= await Proyect.findById(id);
    if(!proyects){
        return res.status(404).json({msg:"Proyecto no encontrado"})
    }
    if(proyects.owner.toString()!=req.usuario._id){
        return res.status(401).json({msg:"Accion no valida"})
    }
    proyects.nombre=req.body.nombre || proyects.nombre
    proyects.description=req.body.description || proyects.description
    proyects.client=req.body.client || proyects.client
    await proyects.save()
    return res.json(proyects);

}
const DeleteProyect=async (req,res)=>{
    const {id}= req.params;
    const proyects= await Proyect.findById(id);
    if(!proyects){
        return res.status(404).json({msg:"Proyecto no encontrado"})
    }
    if(proyects.owner.toString()!=req.usuario._id){
        return res.status(401).json({msg:"Accion no valida"})
    }
    try {
        await proyects.deleteOne();
        return res.json({msg: "Proyecto eliminado"})
    } catch (error) {
        return res.status(400).json("Hubo un error al momento de generar");
    }
}
const AddColaboratorProyect=(req,res)=>{

}
const DeleteColaboratorProyect=(req,res)=>{

}
export {GetProyects,NewProyect,GetProyect,UpdateProyect,DeleteProyect,AddColaboratorProyect,DeleteColaboratorProyect}