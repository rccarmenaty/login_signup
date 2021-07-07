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
import ProveedorEdit from "../../pages/proveedores/ProveedorEdit";
import InsumoEdit from "../../pages/insumos/InsumoEdit";
import CosechaCreate from "../../pages/cosechas/CosechaCreate";
import CosechaDetail from "../../pages/cosechas/CosechaDetail";
import CosechaEdit from "../../pages/cosechas/CosechaEdit";
import CosechaList from "../../pages/cosechas/CosechaList";

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
    {
      path: "/proveedor/edit/:uuid",
      component: ProveedorEdit,
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
    {
      path: "/insumo/edit/:uuid",
      component: InsumoEdit,
    },
  ],
};
const cosecha = {
  path: "/cosecha",
  component: Insumo,
  routes: [
    {
      path: "/cosecha/detail/:uuid",
      component: CosechaDetail,
    },
    {
      path: "/cosecha/list",
      component: CosechaList,
    },
    {
      path: "/cosecha/create",
      component: CosechaCreate,
    },
    {
      path: "/cosecha/edit/:uuid",
      component: CosechaEdit,
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
      {
        ...cosecha,
      },
    ],
  },
];

export default routes;
