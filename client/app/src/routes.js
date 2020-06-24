// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import Spa from '@material-ui/icons/Spa';
import Book from '@material-ui/icons/Book';
import DashboardPage from 'views/Dashboard/Dashboard.js';
import Farmer from 'views/Farmer/Farmer';
import Product from 'views/Product/Product';
import Season from 'views/Season/Season';
import UserProfile from 'views/FarmerProfile/Profile';
import Certificate from './views/Certificate/Certificate';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage,
    layout: ''
  },
  {
    path: '/farmer',
    name: 'Farmer',
    icon: Person,
    component: Farmer,
    layout: '/admin'
  },
  {
    path: '/product',
    name: 'Product',
    icon: Spa,
    component: Product,
    layout: '/admin'
  }
  // {
  //   path: '/user',
  //   name: 'User Profile',
  //   icon: Person,
  //   component: UserProfile,
  //   layout: '/farmer'
  // },
  // {
  //   path: '/typography',
  //   name: 'Typography',
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: '/admin'
  // },
  // {
  //   path: '/icons',
  //   name: 'Icons',
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: '/admin'
  // },
  // {
  //   path: '/maps',
  //   name: 'Maps',
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: '/admin'
  // },
  // {
  //   path: '/notifications',
  //   name: 'Notifications',
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: '/admin'
  // }
];
const farmerRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage,
    layout: ''
  },
  {
    path: '/season',
    name: 'Season',
    icon: Spa,
    component: Season,
    layout: '/farmer'
  },
  {
    path: '/certificate',
    name: 'Certificate',
    icon: Book,
    component: Certificate,
    layout: '/farmer'
  },
  {
    path: '/profile',
    name: 'Profile',
    icon: Person,
    component: UserProfile,
    layout: ''
  }
];
const systemRoutes = [dashboardRoutes, farmerRoutes];

export default systemRoutes;
