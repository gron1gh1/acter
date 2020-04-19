import React from 'react';
import { Layout_1, Layout_2, Layout_3, Layout_4, LoginItem, ButtonItem, MenuItem } from './ItemComponent';
import {IMenuState} from './Interface';
export const ItemList: IMenuState = { // Sidebar Menu ItemList
    MAINVIEW: {
        layout_1: <Layout_1 />,
        layout_2: <Layout_2 />,
        layout_3: <Layout_3 />,
        layout_4: <Layout_4 />,
    },
    COMPONENT: {
        login: <LoginItem />,
        menu: <ButtonItem />,
        button: <MenuItem />,

    }
};