import { lazy } from "react";

const Beranda = lazy(() => import("../page/beranda/Root"));

const MasterRepository = lazy(()=> import("../page/master-repository/Root"));

const MasterKategori = lazy(()=> import("../page/master-kategori/Root"));

const routeList = [
  {
    path: "/",
    element: <Beranda />,
  },
  

{
  path: "/master_repository",
  element: <MasterRepository />,
},
{
  path: "/master_kategori",
  element: <MasterKategori />,
},
];

export default routeList;
