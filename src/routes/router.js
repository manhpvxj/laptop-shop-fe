import AdminLayout from "../pages/layout/AdminLayout";
import CustomerLayout from "../pages/layout/CustomerLayout";
import {
  Login,
  HomePage,
  Page404,
  ListProducts,
  ProductDetailPage,
} from "../pages/index";

 
const publicRouter = [
    {
        path: "/admin/login", component: Login,
    },
    {
        path: "/admin", layout: AdminLayout,
    },
    {
        path: "/admin/products",component: ListProducts, layout: AdminLayout,
    },
    {
        path: "/admin/products/:id", layout: AdminLayout,
    },
    {
        path: "/admin/categories", layout: AdminLayout,
    },
    {
        path:"/admin/categories/:id", layout: AdminLayout,
    },
    {
        path: "/admin/invoices", layout: AdminLayout,
    },
    {
        path: "/admin/invoices/:id", layout: AdminLayout,
    },
    {
        path: "/admin/users", layout: AdminLayout,
    },
    {
        path: "/products/:id", component: ProductDetailPage, layout: CustomerLayout,
    },
    {
        path: "/cart",
    },
    {
        path: "/thankyou",
    },
    {
        path: "/", component: HomePage, layout: CustomerLayout,
    },
    {
        path: "*", component: Page404,
    },
];

const privateRouter = [];

export { publicRouter, privateRouter};