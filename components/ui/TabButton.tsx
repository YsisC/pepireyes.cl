import React, { FC, useMemo, useState } from 'react';
import { motion } from "framer-motion";
import { Button } from '@mui/material';

const variants = {
  default: { width: 0 },
  active: { width: "calc(100% - 0.75rem)" },
};
interface Props {
    active: boolean;
    selectTab: (id:string) => void;
    children: string;

}

const TabButton : FC<Props> = ({ active, selectTab, children }) => {
  const buttonClasses = active ? 'boxActive' :  'primary';
  const handleClick = () => {
    selectTab(children); // Pass the children (ID) to selectTab
  };
  
  return (
    <Button className={` ${buttonClasses}`} sx={{bgcolor:'black', p: 2, border: '1px solid grey', textTransform:'uppercase', 
    color:'inherit'}} onClick={handleClick} >
      <p >
        {children}
      </p>
      <motion.div
        animate={active ? "active" : "default"}
        variants={variants}
        className="h-1 bg-primary-500 mt-2 mr-3"
      ></motion.div>
    </Button>
  );
};

export default TabButton;