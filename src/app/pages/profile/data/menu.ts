import { MainRoute, RootRoute } from '@constants';
import { MenuItem } from '@typings';

export const PROFILE_MENU_MOBILE_ITEMS: Partial<MenuItem>[] = [
  {
    key: 'modules.privileges',
    prefixIcon: 'o:star',
    link: `/main/${MainRoute.PRIVILEGES}`,
  },
  {
    key: 'modules.workplace',
    prefixIcon: 'o:briefcase',
    link: `/${RootRoute.MAIN}/${MainRoute.WORKPLACE}`,
  },
  {
    key: 'modules.diploma',
    prefixIcon: 'o:teacher',
    link: `/${RootRoute.MAIN}/${MainRoute.DIPLOMAS}`,
  },
  {
    key: 'page.documents',
    prefixIcon: 'o:document',
    link: `/${RootRoute.MAIN}/${MainRoute.DOCUMENTS}`,
  },
  {
    key: 'prop.logout',
    prefixIcon: 'o:logout',
    danger: true,
  },
];
