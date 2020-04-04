import './antd.css';
import './styles.css';
import React, { Fragment, useState, createContext } from 'react';

import {ItemAnimation,Layout_1,Layout_2,Layout_3,Layout_4,LoginItem,MenuItem,ButtonItem} from './AntdItem';
import Main from './Main';
export const AppContext = createContext();

export default function App() {
  const [layout, SetLayout] = useState(false);
  const [Components, AddComponent] = useState({layout:[],content:[<MenuItem/>]});
  const [open, SetOpen] = useState();
  const [MenuItems, AddMenuItem] = useState([
    <ItemAnimation>
      <Layout_1 item />
    </ItemAnimation>,

    <ItemAnimation>
      <Layout_2 item/>
    </ItemAnimation>,

    <ItemAnimation>
      <Layout_3 item/>
    </ItemAnimation>,

     <ItemAnimation>
     <Layout_4 item/>
   </ItemAnimation>,
  ]);
  const [Items, AddItem] = useState([
    <ItemAnimation>
      <LoginItem />
    </ItemAnimation>,

    <ItemAnimation>
      <MenuItem/>
    </ItemAnimation>,

    <ItemAnimation>
      <ButtonItem/>
    </ItemAnimation>,

  ]);
  const data = {
    layout, SetLayout,
    Components, AddComponent,
    MenuItems, AddMenuItem,
    open, SetOpen,
    Items, AddItem,
  }

  return (
    <AppContext.Provider value={data}>
      <Fragment>
        <Main />
      </Fragment>
    </AppContext.Provider>
  )
}