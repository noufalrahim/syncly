import { ReactNode } from 'react';

export interface MenuItemsData {
  title: string;
  url: string;
  icon: ReactNode;
  children?: MenuItemsData[];
}
