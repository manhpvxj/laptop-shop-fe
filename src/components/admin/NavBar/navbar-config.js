

// component
import { TbDashboard, TbUser, TbReceipt } from "react-icons/tb";
import { MdOutlineProductionQuantityLimits, MdCategory } from "react-icons/md"
// ----------------------------------------------------------------------


const navConfig = [
  {
    title: 'Dashboard',
    path: '/admin',
    icon: <TbDashboard/>,
  },
  {
    title: 'Products',
    icon: <MdOutlineProductionQuantityLimits/>,
    children: [
      {
        title: 'List products',
        path: '/admin/products',
      },
      {
        title: 'Add product',
        path: '/admin/products/create',
      }
    ]
  },
  {
    title: 'Categories',
    path: '',
    icon: <MdCategory/>,
    children: [
      {
        title: 'List categories',
        path: '/admin/categories',
      },
      {
        title: 'Add category',
        path: '/admin/categories/create',
      }
    ]
  },
  {
    title: 'Invoices',
    path: '/admin/invoices',
    icon: <TbReceipt/>,
  },  
  {
    title: 'User',
    path: '/admin',
    icon: <TbUser/>,
    children: [
      {
        title: 'List users',
        path: '',
      },
      {
        title: 'Register',
        path:'register',
      }
    ]
  },
];

export default navConfig;
