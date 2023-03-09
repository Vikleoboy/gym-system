// component
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import TextsmsIcon from '@mui/icons-material/Textsms';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },

  {
    title: 'Add User',
    path: '/dashboard/addUser',
    icon: <PersonAddIcon />,
  },
  // {
  //   title: 'DataBase',
  //   path: '/dashboard/Database',
  //   icon: icon('ic_disabled'),
  // },

  {
    title: 'Plans and Products',
    path: '/dashboard/editor',
    icon: <Inventory2Icon />,
  },

  {
    title: 'Text',
    path: '/dashboard/text',
    icon: <TextsmsIcon />,
  },
];

export default navConfig;
