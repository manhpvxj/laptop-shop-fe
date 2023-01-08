import AdminLayout from "../pages/layout/AdminLayout";
import CustomerLayout from "../pages/layout/CustomerLayout";
import {
  Login,
  HomePage,
  Page404,
  ListProducts,
  ProductDetailPage,
  CheckoutCart,
  CreateProductPage,
  InvoicesPage,
  EditProductPage,
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
        path: "admin/products/create", component: CreateProductPage, layout: AdminLayout,
    },
    {
        path: "/admin/products/:id", component: EditProductPage, layout: AdminLayout,
    },
    {
        path: "/admin/categories", layout: AdminLayout,
    },
    {
        path:"/admin/categories/:id", layout: AdminLayout,
    },
    {
        path: "/admin/invoices", component: InvoicesPage, layout: AdminLayout,
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
        path: "/cart", component: CheckoutCart,
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