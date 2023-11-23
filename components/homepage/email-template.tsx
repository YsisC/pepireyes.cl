import * as React from 'react';

interface EmailTemplateProps {
  user_name: string;
  user_email:string ;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  user_name,
  user_email 
  , message 
}) => (
  <div>
    <h1>Hola, mi nombre es {user_name}!</h1>
    <h3>Mi correo es: {user_email} </h3>
    <h3>Mensaje: {message}</h3> 
  </div>
);