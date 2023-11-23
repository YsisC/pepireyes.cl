import React, { useRef , FormEventHandler, useState } from 'react'
import css from './ContactUs.module.css'
import { motion } from 'framer-motion'
import {  staggerChildren, textVariant } from '../../utils/motion'


import Link from '@/themeMUI/Link'
import { EmailOutlined, WhatsApp, LocationCity } from '@mui/icons-material'
import { Button,   Typography } from "@mui/material";
import emailjs from '@emailjs/browser';
import { pepireyesApi } from '@/axiosApi'

export default function ContacUs() {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Aquí puedes utilizar formData para enviar los datos al servidor
    // console.log(formData);

    // Ejemplo de cómo podrías hacer una llamada a la API
    pepireyesApi.post('/send', formData);

    // Limpiar el formulario después del envío
    setFormData({
      user_name: '',
      user_email: '',
      message: '',
    });
  };

    return (
        <motion.section
          variants={staggerChildren}
          initial='hidden'
          whileInView={"show"}
          viewport={{ once: false, amount: 0.25 }}
          className={`paddings ${css.wrapper} `}
        >
       
          <div className={` ${css.container}`}>
            <Typography variant="h2" component="h2" color={"GrayText"}>CONTAC<span>TANOS </span></Typography>
            <div className={css.informationdiv}>
            <form onSubmit={sendEmail}>
            <input type="text" placeholder="Tu nombre" name='user_name' value={formData.user_name} onChange={handleChange} required />
            <input type="email" name='user_email' placeholder="Tu correo electronico" value={formData.user_email} onChange={handleChange} required />
            <textarea placeholder="Tu mensaje" name='message' rows={10} value={formData.message} onChange={handleChange} required />
            <Button type="submit" color='secondary' sx={{  fontSize: 'medium'}}> Enviar mensaje</Button>
          </form>
              {/* Rest of the component */}
              <motion.div 
                    variants={textVariant(0.5)}
                    className={css.rigthSideElement}>
                        <div className={css.info}>
                            <div> <EmailOutlined /> </div>
                            <p>pepireyes.cl@gmail.com</p>
                        </div>
                        <div className={css.info}>
                            <div> <WhatsApp /> </div>
                            <p>+56-930739387</p>
                        </div>
                        <div className={css.info}>
                            <div> <LocationCity /> </div>
                            <p>Santiago de Chile</p>
                        </div>
                    </motion.div>
            </div>
          </div>
        </motion.section>
      );
    }