import React from 'react';
import Image from 'next/image';
import styles from '../../../styles/Order.module.css';


interface Props {
    statusClass: (index: number) => string | undefined;
  }
  const OrderStatus: React.FC<Props> = ({ statusClass }) => {
    const statusOrder = [
        {
          image: "/img/paid.png",
          title: "Pagado",
          image2: "/img/checked.png",
        },
        {
          image: "/img/bake.png",
          title: "Preparado",
          image2: "/img/checked.png",
        },
        {
          image: "/img/bike.png",
          title: "En camino",
          image2: "/img/checked.png",
        },
        {
          image: "/img/delivered.png",
          title: "Delivered",
          image2: "/img/checked.png",
        },
      ];
      return (
        <div className={styles.row}>
          {statusOrder.map((item, index) => (
            <div className={statusClass(index)} key={index}>
              <div className={styles.icon}>
                <Image src={item.image} width={30} height={30} alt="" />
              </div>
              <span>{item.title}</span>
              <div className={styles.checkedIcon}>
                <Image
                  className={styles.checkedIcon}
                  src={item.image2}
                  width={20}
                  height={20}
                  alt={item.image2}
                />
              </div>
            </div>
          ))}
        </div>
      );
    };
    

export default OrderStatus