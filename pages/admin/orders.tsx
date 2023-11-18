import { useState, useEffect } from "react";
import { ConfirmationNumberOutlined } from "@mui/icons-material";
import { Button, Chip, Grid } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import useSWR from "swr";

import { AdminLayout } from "../../components/layouts";
import { IOrder, IUser } from "../../interfaces";
import { pepireyesApi } from "@/axiosApi";
import { useRouter } from "next/router";
import Link from '../../themeMUI/Link';


const OrdersPage = () => {


  const { data, error } = useSWR<IOrder[]>("/api/admin/orders");
  const [orders, setOrders] = useState<IOrder[]>([]);
  const status: string[] = ["Preparando", "En camino", "Delivery"];
const router = useRouter()
  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  if (!data && !error) return <></>;

  const handleStatus = async (id: string) => {

    const item = orders.filter((order) => order._id === id)[0];

    const currentStatus = item.status;
    if (currentStatus === undefined) {
        console.error("El estado actual de la orden es indefinido");
        return;
      }
    try {
        if(currentStatus < 3){
            const res = await pepireyesApi.put(`/orders/${id}`, {
                status: currentStatus + 1,
              });
              setOrders([
                res.data,
                ...orders.filter((order) => order._id !== id),
              ])
            //   router.reload()
        }
 

    } catch (error) {
      console.log(error);
      alert("No se pudo actualizar el status de la orden");
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "Orden ID", width: 250 },
    { field: "name", headerName: "Nombre Completo", width: 250 },
    { field: "total", headerName: "Total", width: 200 },
    {
      field: "isPaid",
      headerName: "Pagada",
      width: 150,
      renderCell: ({ row }: GridRenderCellParams<any, any>) => {
        return row.isPaid ? (
          <Chip variant="outlined" label="Pagada" color="success" />
        ) : (
          <Chip variant="outlined" label="Pendiente" color="error" />
        );
      },
    },
    {
      field: "status",
      headerName: "Estado",
      width: 180,
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: ({ row }: GridRenderCellParams<any, any, any, any>) => {
     
        return (
            (row.action < 3 && row.isPaid) ? (
              <Button color="secondary" onClick={() => handleStatus(row.id)}>
                Siguiente
              </Button>
            ) : (
              (row.action === 3 && row.isPaid) ? (
                <Chip variant="outlined" label="Orden lista" color="success" />
              ) : (
                <Chip variant="outlined" label="Pendiente" color="error" />
              )
            )
          );
          
     
      },
    },
    {
      field: 'check',
      headerName: 'Ver orden',
      renderCell: ({ row }: GridRenderCellParams<any>) => {
          return (
              <Link color='secondary' href={ `/admin/orders/${ row.id }` } target="_blank" rel="noreferrer" >
                  Ver orden
              </Link>
          )
      }
  },
  ];

  const rows = data!.map((order) => (
    {
    id: order._id,
    name: order.user ? (order.user as IUser).name: "sin nombre" ,
    total: order.total,
    isPaid: order.isPaid,
    status: order.status ? status[order.status]: 'Preparando',
    action: order.status,
    check: order._id
    
  }));
  const rowsa = data!.map((order) => {
    console.log(order)
  });
console.log(rowsa)
  return (
    <AdminLayout
      title={"Ordenes"}
      subTitle={"Mantenimiento de ordenes"}
      icon={<ConfirmationNumberOutlined />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSizeOptions={[10, 25, 50, 100]} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default OrdersPage;
