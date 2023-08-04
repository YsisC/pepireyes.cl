import React, { useRef , FormEventHandler } from 'react'
import css from './ContactUs.module.css'
import { motion } from 'framer-motion'
import {  staggerChildren, textVariant } from '../../utils/motion'


import Link from '@/src/Link'
import { EmailOutlined, WhatsApp, LocationCity } from '@mui/icons-material'
import { Button,   Typography } from "@mui/material";
import emailjs from '@emailjs/browser';

export default function ContacUs() {

    const form = useRef<HTMLFormElement>(null);

    const sendEmail: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // // service_lho7c0d
        // emailjs.sendForm('service_lho7c0d', 'template_ozg6bnh', form.current, 'YlzgSN1UZ1WmJXYvs')
        //     .then((result) => {
        //         console.log(result.text);
        //     }, (error) => {
        //         console.log(error.text);
        //     });
        // e.target.reset()
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
              <form ref={form} onSubmit={sendEmail}>
                <input type="text" placeholder="Tu nombre" name='user_name' required />
                <input type="email" name='user_email' placeholder="Tu correo electronico" required />
                <textarea placeholder="Tu mensaje" name='message' rows={10} required />
                <Button type="submit" className='circular-btn-second'  > Enviar mensaje</Button>
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