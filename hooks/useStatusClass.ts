// components/useProducts.tsx

import { IOrder,  } from '../interfaces';
import styles from "../styles/Order.module.css";


export const useStatusClass = (order: IOrder) => {
    const status: number | undefined = order.status;
    const statusClass = (index: number) => {
      if (status === undefined) return;
      if (index - status < 1) return styles.done;
      if (index - status === 1) return styles.inProgress;
      if (index - status > 1) return styles.undone;
    };
  return {
   status,
   statusClass
  };
};
