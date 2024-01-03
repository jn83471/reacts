import nodemailer from "nodemailer"

const RegisterEmail=async (datos)=>{
    const {email,nombre, token}=datos
    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
      //info email
    const info= await transport.sendMail({from:'Uptask - Admin',to:email,subject:"Confirm account",
    text:"Comprueba tu cuena en UpTask",
    html:`
    <p>Hola: ${nombre} tu cuenta esta lista comprueba la cuenta con este token:</p>
    <a href="${process.env.FRONTEND_URL}/confirmAccount/${token}">Confirmar cuenta</a>
    `});
}


const ForgetPasswordEmail=async (datos)=>{
  const {email,nombre, token}=datos
  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    //info email
  const info= await transport.sendMail({from:'Uptask - Admin',to:email,subject:"Confirm account",
  text:"Olivideste tu cuenta en UpTask",
  html:`
  <p>Hola: ${nombre} tu cuenta esta lista comprueba la cuenta con este token:</p>
  <a href="${process.env.FRONTEND_URL}/forget/${token}">Confirmar cuenta</a>
  `});
}


export {RegisterEmail,ForgetPasswordEmail}