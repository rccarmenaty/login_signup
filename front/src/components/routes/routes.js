import ProveedorList from "../../pages/proveedores/ProveedorList";
import Login from "../../pages/login/Login";
import ProveedorDetail from "../../pages/proveedores/ProveedorDetail";
import DashBoard from "../dashboard/DashBoard";
import Proveedor from "../../pages/proveedores/Proveedor";
import InsumoDetail from "../../pages/insumos/InsumoDetail";
import InsumoList from "../../pages/insumos/InsumoList";
import Insumo from "../../pages/insumos/Insumo";
import Register from "../../pages/register/Register";
import ProveedorCreate from "../../pages/proveedores/ProveedorCreate";
import InsumoCreate from "../../pages/insumos/InsumoCreate";

const proveedores = {
  path: "/proveedor",
  component: Proveedor,
  routes: [
    {
      path: "/proveedor/detail/:uuid",
      component: ProveedorDetail,
    },
    {
      path: "/proveedor/list",
      component: ProveedorList,
    },
    {
      path: "/proveedor/create",
      component: ProveedorCreate,
    },
  ],
};

const insumos = {
  path: "/insumo",
  component: Insumo,
  routes: [
    {
      path: "/insumo/detail/:uuid",
      component: InsumoDetail,
    },
    {
      path: "/insumo/list",
      component: InsumoList,
    },
    {
      path: "/insumo/create",
      component: InsumoCreate,
    },
  ],
};

const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/",
    component: DashBoard,
    routes: [
      {
        ...proveedores,
      },
      {
        ...insumos,
      },
    ],
  },
];

export default routes;
