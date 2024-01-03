import Tasks from "../models/Task.js";
import Proyect from "../models/Proyects.js"

const GetTasks=async(req,res)=>{
    const {id}=req.params;
    const Task=await Tasks.findById(id).populate('Owner');

    if(Task.Owner.owner.toString()!==req.usuario._id.toString()){
        return res.status(403).json({msg:"Accion no valida"});
    }
    return res.json(Task);

}
const NewTasks=async (req,res)=>{
    const {Owner} = req.body;

    const CheckProject=await Proyect.findById(Owner);
    if(!CheckProject){
        return res.status(404).json({msg:"No se ha encontrado el proyecto"});
    }
    console.log(req.usuario)
    if(CheckProject.owner.toString()!==req.usuario._id.toString()){
        return res.status(401).json({msg:"Accion no valida"});
    }

    const Task= new Tasks(req.body);
    try {
        const TaskL= await Task.save();
        return res.json(TaskL);
    } catch (error) {
        return res.status(400).json("Hubo un error al momento de generar");
    }
}
const DeleteTask=async(req,res)=>{
    const {id}=req.params;
    const Task=await Tasks.findById(id).populate('Owner');

    if(Task.Owner.owner.toString()!==req.usuario._id.toString()){
        return res.status(403).json({msg:"Accion no valida"});
    }
    try {
        await Task.deleteOne();
        return res.json({msg:"Tarea eliminada"});
    } catch (error) {
        return res.status(400).json("Hubo un error al momento de eliminar");
    }
}
const UpdateTask=async (req,res)=>{
    const {id}=req.params;
    const Task=await Tasks.findById(id).populate('Owner');

    if(Task.Owner.owner.toString()!==req.usuario._id.toString()){
        return res.status(403).json({msg:"Accion no valida"});
    }

    Task.nombre=req.body.nombre || Task.nombre
    Task.description=req.body.description || Task.description
    Task.Priority=req.body.Priority || Task.Priority
    Task.Delivery=req.body.Delivery || Task.Delivery
    try {
        const TaskStorage=await Task.save();
        return res.json(TaskStorage);
    } catch (error) {
        return res.status(400).json("Hubo un error al momento de generar");
    }

}
const UpdateStatus=(req,res)=>{
    
}

export {GetTasks,NewTasks,DeleteTask,UpdateTask,UpdateStatus}