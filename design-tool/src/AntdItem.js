
import React, { useState, useContext, useRef } from 'react';
import { Layout} from 'antd'
import Draggable from 'react-draggable';
import {Layout_Ani} from './Spring';

import {AppContext} from './App';

const { Header, Footer, Sider } = Layout;
const Sidebar_Color = 'rgb(59,160,233)';
const Content_Color = 'rgb(16,142,233)';
const Header_Color = 'rgb(125,188,234)';

export function Layout_item({ item, children }) {
    const main = useContext(AppContext);
    const [ani_state, AniControl] = useState('use');
    const boxRef = useRef();
    function drag_start(e) {
      AniControl('mouse_down');
    }
    function drag_ing(e, data) {
    }
    function drag_stop(e, data) {
      if (e.clientX > boxRef.current.offsetWidth) {
        main.SetLayout(true);
        AniControl('not_use');
        main.AddComponent(main.Components.splice().concat(children));
        AniControl('restore');
      }
      else {
        AniControl('mouse_up');
      }
    }
  
    return (
  
      <Draggable onStart={drag_start}
        onDrag={drag_ing}
        onStop={drag_stop}
        position={{ x: 0, y: 0 }}
      >
        <div>
          <Layout_Ani state={ani_state}>
            {styles => (
              <div ref={boxRef}>
                {React.cloneElement(children, { style: styles })}
              </div>
            )}
          </Layout_Ani>
        </div>
      </Draggable>
    )
  }
  
  
export function Layout_1({ style }) {

  return (
    <Layout style={style}>
      <Header style={{ background: `${Header_Color}` }}>Header</Header>
      <Layout.Content style={{ background: `${Content_Color}` }}>Content</Layout.Content>
      <Footer style={{ background: `${Header_Color}` }}>Footer</Footer>
    </Layout>
  )
}
export function Layout_2({ style }) {

  return (

    <Layout style={style}>
      <Header style={{ background: `${Header_Color}` }}>Header</Header>
      <Layout>
        <Sider style={{ background: `${Sidebar_Color}`, width: '5px' }}>Sider</Sider>
        <Layout.Content style={{ background: `${Content_Color}` }}>Content</Layout.Content>
      </Layout>
      <Footer style={{ background: `${Header_Color}` }}>Footer</Footer>
    </Layout>

  )
}
export function Layout_3({ style }) {

  return (

    <Layout style={style}>
      <Header style={{ background: `${Header_Color}` }}>Header</Header>
      <Layout>
        <Layout.Content style={{ background: `${Content_Color}` }}>Content</Layout.Content>
        <Sider style={{ background: `${Sidebar_Color}`, width: '5px' }}>Sider</Sider>
      </Layout>
      <Footer style={{ background: `${Header_Color}` }}>Footer</Footer>
    </Layout>

  )
}


export function Layout_4({ style }) {

  return (

    <Layout style={style}>

      <Sider style={{ background: `${Sidebar_Color}`, width: '5px' }}>Sider</Sider>

      <Layout>
        <Header style={{ background: `${Header_Color}` }}>Header</Header>
        <Layout.Content style={{ background: `${Content_Color}` }}>Content</Layout.Content>
        <Footer style={{ background: `${Header_Color}` }}>Footer</Footer>
      </Layout>
    </Layout>

  )
}