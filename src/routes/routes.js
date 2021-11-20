import Layout from "../components/layout/Layout";
import Clients from "../pages/Clients";
import Products from "./../pages/Products";
import Orders from "./../pages/Orders";
import NewClient from "../pages/NewClient";
import UpdateClient from "../pages/UpdateClient";
import NewProduct from './../pages/NewProduct';
import UpdateProduct from './../pages/UpdateProduct';
import NewOrder from './../pages/NewOrder';
import TopClients from './../pages/TopClients';
import TopSellers from './../pages/TopSellers';

export const routes = [
  {
    path: "/",
    layout: Layout,
    component: Clients,
    exact: true,
  },
  {
    path: "/clients",
    layout: Layout,
    component: Clients,
    exact: true,
  },
  {
    path: "/products",
    layout: Layout,
    component: Products,
    exact: true,
  },
  {
    path: "/newclient",
    layout: Layout,
    component: NewClient,
    exact: true,
  },
  {
    path: "/orders",
    layout: Layout,
    component: Orders,
    exact: true,
  },
  {
    path: "/updateclient/:id",
    layout: Layout,
    component: UpdateClient,
    exact: true,
  },
  {
    path: "/newproduct",
    layout: Layout,
    component: NewProduct,
    exact: true,
  },
  {
    path: "/updateproduct/:id",
    layout: Layout,
    component: UpdateProduct,
    exact: true,
  },
  {
    path: "/neworder",
    layout: Layout,
    component: NewOrder,
    exact: true,
  },
  {
    path: "/topclients",
    layout: Layout,
    component: TopClients,
    exact: true,
  },
  {
    path: "/topsellers",
    layout: Layout,
    component: TopSellers,
    exact: true,
  },
];
