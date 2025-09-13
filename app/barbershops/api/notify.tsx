// pages/api/notifyAdmin.js

import { sendEmail } from "../utils/sendEmail"; 


const notifyAdmin = async (req:any, res:any) => {
  if (req.method === 'POST') {
    const { service, date, user } = req.body;

    const adminEmail = 'marquesslucass97@gmail.com'; // Substitua pelo e-mail do administrador
    const subject = 'Novo Agendamento Realizado';
    const text = `Um novo agendamento foi realizado.\n\nServiço: ${service.name}\nData: ${date}\nUsuário: ${user.email}`;

    try {
      await sendEmail(adminEmail, subject, text);
      res.status(200).json({ message: 'Notificação enviada ao administrador.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao enviar notificação ao administrador.' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
};

export default notifyAdmin;
