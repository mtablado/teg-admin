import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Inicio',
    icon: 'nb-home',
    link: '/pages/home',
    home: true,
  },
  {
    title: 'Administración',
    icon: 'nb-keypad',
    link: '/pages/admin',
    children: [
      {
        title: 'Camioneros',
        link: '/pages/admin/drivers',
      },
//      {
//        title: 'Usuarios',
//        link: '/pages/ui-features/grid',
//      },
    ],
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
