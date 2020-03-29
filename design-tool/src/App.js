import './antd.css'
import './styles.css'
import React, { Fragment, useState, createContext, useContext, useRef } from 'react'
import { Keyframes, animated } from 'react-spring/renderprops'
import { useSpring, animated as a } from 'react-spring';
import { Layout, Avatar, Form, Input, Button, Checkbox, Row, Col } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import delay from 'await-delay';
import Draggable from 'react-draggable';
import styled from 'styled-components';


// Creates a spring with predefined animation slots
const Sidebar = Keyframes.Spring({
  // Slots can take arrays/chains,
  open: { delay: 0, x: 0 },
  // or async functions with side-effects
  close: async call => {
    await delay(100)
    await call({ delay: 0, x: -300 })
  },
})

// Creates a keyframed trail
const Content = Keyframes.Trail({
  open: { x: 0, opacity: 1, delay: 100 },
  close: { x: -100, opacity: 0, delay: 0 },
});

const Layout_Ani = Keyframes.Spring({
  use: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  not_use: {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
  restore: async call => {
    await call({ transform: 'translate3d(-300px,0,0)', config: { duration: 0 } });
    await call({ from: { transform: 'translate3d(-300px,0,0)', opacity: 0 }, to: { transform: 'translate3d(0%,0,0)', opacity: 1 } })

  },
  mouse_down: {
    from: { opacity: 1 },
    to: { opacity: 0.5 },
  },
  mouse_up: {
    from: { opacity: 0.5 },
    to: { opacity: 1 },
  }

})
const { Header, Footer, Sider } = Layout;
const Sidebar_Color = 'rgb(59,160,233)';
const Content_Color = 'rgb(16,142,233)';
const Header_Color = 'rgb(125,188,234)';

function Layout_1({ style }) {

  return (
    <Layout style={style}>
      <Header style={{ background: `${Header_Color}` }}>Header</Header>
      <Layout.Content style={{ background: `${Content_Color}` }}>Content</Layout.Content>
      <Footer style={{ background: `${Header_Color}` }}>Footer</Footer>
    </Layout>
  )
}
function Layout_2({ style }) {

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
function Layout_3({ style }) {

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


function Layout_4({ style }) {

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
function Layout_item({ item, children }) {
  const main = useContext(AppContext);
  const [ani_state, AniControl] = useState('use');
  const boxRef = useRef();
  const [controlledPosition, setPoint] = useState(null);
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



function Main() {
  const [open, SetOpen] = useState();

  const [reset, set] = useState(false);
  const toggle = () => { SetOpen(!open); }
  const main = useContext(AppContext);
  const state = open === undefined
    ? 'close'
    : open
      ? 'open'
      : 'close';

  const ani_props = useSpring({ opacity: main.layout ? 1 : 0 });
  return (
    <Row style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <Col span={4}
        className='sidebar' style={{ background: 'white', overflow: 'visible', zIndex: 99 }}>
        <MenuFoldOutlined className="sidebar-toggle" onClick={toggle} style={{ position: 'absolute', right: 10, top: 0 }} />
        <Sidebar native state={state} reset={reset}>
          {({ x, opacity }) => (
            <animated.div
              style={{
                transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
              }}>
              <Content
                native
                items={main.MenuItems}
                keys={main.MenuItems.map((_, i) => i)}
                reverse={!open}
                state={state}
              >
                {(item, i) => ({ x, ...props }) => (
                  <animated.div
                    style={{
                      paddingTop: 15,
                      paddingBottom: 15,
                      opacity,
                      transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
                      ...props
                    }}>
                    <Form.Item className={i === 0 ? 'middle' : ''} >
                      {item}
                    </Form.Item>
                  </animated.div>
                )}

              </Content>
            </animated.div>

          )}

        </Sidebar>
      </Col>
      <Col span={20} style={{ background: 'lightgray' }}>

        {main.Components.map((v, i) =>
          (
            <a.div style={ani_props}>
              {React.cloneElement(v, { style: { height: '100vh' } })}
            </a.div>
          )
        )}

      </Col>
    </Row>


  )
}

const AppContext = createContext();
export default function App() {
  const [layout, SetLayout] = useState(false);
  const [Components, AddComponent] = useState([]);
  const [MenuItems, AddMenuItem] = useState([
    <Layout_item>
      <Layout_1 />
    </Layout_item>,

    <Layout_item>
      <Layout_2 />
    </Layout_item>,

    <Layout_item>
      <Layout_3 />
    </Layout_item>,

     <Layout_item>
     <Layout_4 />
   </Layout_item>,
  ]);
  const data = {
    layout, SetLayout, Components, AddComponent, MenuItems, AddMenuItem
  }

  return (
    <AppContext.Provider value={data}>
      <Fragment>
        <Main />
      </Fragment>
    </AppContext.Provider>
  )
}