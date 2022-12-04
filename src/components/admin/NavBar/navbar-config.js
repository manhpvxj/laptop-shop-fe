

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
    path: '/admin',
    icon: <MdOutlineProductionQuantityLimits/>,
    children: [
      {
        title: 'List products',
        path: 'products',
      },
      {
        title: 'Add product',
        path: 'create',
      }
    ]
  },
  {
    title: 'Categories',
    path: '/admin/categories',
    icon: <MdCategory/>,
    children: [
      {
        title: 'List categories',
        path: '',
      },
      {
        title: 'Add category',
        path: '',
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
