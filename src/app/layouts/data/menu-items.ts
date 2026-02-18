import { MenuItem } from '@typings';
import { MainRoute } from '@constants';
import { EkadrType } from '@api/models/ekadr';

export const MAIN_LAYOUT_NAVIGATION_ITEMS: Partial<MenuItem>[] = [
  {
    key: 'modules.profile',
    prefixIcon: 'user',
    link: MainRoute.PROFILE,
  },
  {
    key: 'modules.diploma',
    prefixIcon: 'o:teacher',
    link: MainRoute.DIPLOMAS,
  },
  {
    key: 'modules.privileges',
    prefixIcon: 'o:star',
    link: MainRoute.PRIVILEGES,
  },
  {
    key: 'page.work',
    prefixIcon: 'o:briefcase',
    link: MainRoute.WORKPLACE,
  },
  {
    key: 'page.toy',
    prefixIcon: 'o:cup',
    link: MainRoute.TEACHER_OF_YEAR,
  },
  {
    key: 'page.appeal',
    prefixIcon: 'o:direct',
    link: MainRoute.APPEAL,
  },
  {
    key: 'page.documents',
    prefixIcon: 'o:document',
    link: MainRoute.DOCUMENTS,
  },
  {
    key: 'prop.logout',
    prefixIcon: 'o:logout',
    danger: true,
  },
];

export const MAIN_LAYOUT_BOTTOM_MENU_ITEMS: Partial<MenuItem & {isMain: boolean}>[] = [
  {
    key: 'modules.applications',
    prefixIcon: 'o:slider',
    link: '/main/applications',
  },
  {
    key: 'modules.appeals',
    prefixIcon: 'o:direct',
    link: '/main/appeal',
  },
  {
    key: '',
    prefixIcon: 'o:cup',
    link: '/main/toy',
    isMain: true
  },
  {
    key: 'modules.certificates',
    prefixIcon: 'o:book',
    link: '/main/certificates',
  },
  {
    key: 'modules.profile',
    prefixIcon: 'user',
    link: '/main/profile',
  },
];

export const DOCUMENT_LAYOUT_ITEMS: Partial<MenuItem>[] = [
  {
    key: 'document.tab.commands',
    link: '/main/documents/commands',
    value: EkadrType.COMMAND,
  },
  {
    key: 'document.tab.contracts',
    link: '/main/documents/contracts',
    value: EkadrType.CONTRACT,
  },
  {
    key: 'document.tab.applications',
    link: '/main/documents/applications',
    value: EkadrType.APPLICATION,
  },
];
