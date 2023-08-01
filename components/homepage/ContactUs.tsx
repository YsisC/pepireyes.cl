import React, { useRef , FormEventHandler } from 'react'
import css from './ContactUs.module.css'
import { motion } from 'framer-motion'
import {  staggerChildren, textVariant } from '../../utils/motion'
import { TextareaAutosize } from '@mui/base';
import { EmailOutlined, WhatsApp, LocationCity } from '@mui/icons-material'
import { Button,  Typography } from "@mui/material";
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
          <a className="anchor" id='contactme'></a>
          <div className={` ${css.container}`}>
            <Typography variant="h2" component="h2" color={"GrayText"}>CONTAC<span>TANOS </span></Typography>
            <div className={css.informationdiv}>
              <form ref={form} onSubmit={sendEmail}>
                <input type="text" placeholder="Your Name" name='user_name' required />
                <input type="email" name='user_email' placeholder="Your Email Address" required />
                <textarea placeholder="Your Message" name='message' rows={10} required />
                <button type="submit" className='circular-btn-second'  > Send Message</button>
              </form>
              {/* Rest of the component */}
            </div>
          </div>
        </motion.section>
      );
    }