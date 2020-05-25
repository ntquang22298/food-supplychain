// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import Spa from '@material-ui/icons/Spa';
// import BubbleChart from '@material-ui/icons/BubbleChart';
// import LocationOn from '@material-ui/icons/LocationOn';
// import Notifications from '@material-ui/icons/Notifications';
// core components/views for Admin layout
import DashboardPage from 'views/Dashboard/Dashboard.js';
// import UserProfile from 'views/UserProfile/UserProfile.js';
// import Typography from 'views/Typography/Typography.js';
// import Icons from 'views/Icons/Icons.js';
// import Maps from 'views/Maps/Maps.js';
// import NotificationsPage from 'views/Notifications/Notifications.js';
import Farmer from 'views/Farmer/Farmer';
import Product from 'views/Product/Product';
import Season from 'views/Season/Season';
import UserProfile from 'views/FarmerProfile/Profile';

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
    path: '/profile',
    name: 'Profile',
    icon: Person,
    component: UserProfile,
    layout: ''
  }
];
const systemRoutes = [dashboardRoutes, farmerRoutes];

export default systemRoutes;
