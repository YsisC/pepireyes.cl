import React, { FC, useMemo, useState } from 'react';
import { motion } from "framer-motion";
import { Button } from '@mui/material';

const variants = {
  default: { width:0 },
  active: { width: "calc(100% - 2.75rem)" },
};
interface Props {
    active: boolean;
    selectTab: (id:string) => void;
    children: string;

}

const TabButton : FC<Props> = ({ active, selectTab, children }) => {
  const buttonClasses = active ? 'box boxActive' :  'box';
  const handleClick = () => {
    selectTab(children); // Pass the children (ID) to selectTab
  };
  
  return (
    <button className={` ${buttonClasses}`}  
    onClick={handleClick} >
      <p >
        {children}
      </p>
      <motion.div
        animate={active ? "active" : "default"}
        variants={variants}
        className="h-1 bg-primary-500 mt-2 mr-3"
      ></motion.div>
    </button>
  );
};

export default TabButton;