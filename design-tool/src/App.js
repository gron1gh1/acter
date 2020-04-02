import './antd.css';
import './styles.css';
import React, { Fragment, useState, createContext } from 'react';

import {Layout_item,Layout_1,Layout_2,Layout_3,Layout_4} from './AntdItem';
import Main from './Main';
export const AppContext = createContext();

export default function App() {
  const [layout, SetLayout] = useState(false);
  const [Components, AddComponent] = useState([]);
  const [open, SetOpen] = useState();
  const [MenuItems, AddMenuItem] = useState([
    <Layout_item>
      <Layout_1 item />
    </Layout_item>,

    <Layout_item>
      <Layout_2 item/>
    </Layout_item>,

    <Layout_item>
      <Layout_3 item/>
    </Layout_item>,

     <Layout_item>
     <Layout_4 item/>
   </Layout_item>,
  ]);
  const data = {
    layout, SetLayout, Components, AddComponent, MenuItems, AddMenuItem,open, SetOpen
  }

  return (
    <AppContext.Provider value={data}>
      <Fragment>
        <Main />
      </Fragment>
    </AppContext.Provider>
  )
}