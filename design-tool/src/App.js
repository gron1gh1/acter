import './antd.css'
import './styles.css'
import React, { Fragment, useState,useRef } from 'react'
import { Keyframes, animated } from 'react-spring/renderprops'
import { useSpring, animated as a } from 'react-spring';
import { Layout, Avatar, Form, Input, Button, Checkbox } from 'antd'
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
    await call({ delay: 0, x: -300})
  },
})

// Creates a keyframed trail
const Content = Keyframes.Trail({
  open: { x: 0, opacity: 1, delay: 100 },
  close: { x: -100, opacity: 0, delay: 0 },
})
const { Header, Footer, Sider } = Layout;
const Sidebar_Color = 'rgb(59,160,233)';
const Content_Color = 'rgb(16,142,233)';
const Header_Color = 'rgb(125,188,234)';

function Layout_1({opacity}) {
  return (
   <Layout style={{opacity}}>
        <Header style={{ background: `${Header_Color}` }}>Header</Header>
        <Layout>
          <Layout.Content style={{ background: `${Content_Color}` }}>
            Content
          </Layout.Content>
          <Sider style={{ background: `${Sidebar_Color}` }}>Sider</Sider>
        </Layout>
        <Footer style={{ background: `${Header_Color}` }}>Footer</Footer>
      </Layout>
  )
}

function Layout_item({item})
{
  const [start,AniControl] = useState(0);
  const ani_props = useSpring({opacity: start ? 0 : 1})
  
  const [opacity,SetOpa] = useState(1);
  function drag_start(e)
  {
    SetOpa(0.5);
  }
  function drag_ing(e,data)
  {
  
  }
  function drag_stop(e,data)
  {
    SetOpa(1);
    if(data.x > 270)
    {
      AniControl(1);
      console.log('침범');
    }
  }

  return (
    <Draggable onStart={drag_start}
    onDrag={drag_ing}
    onStop={drag_stop}>
        <a.div style={ani_props}>
          <Layout_1 opacity={opacity}/>
        </a.div>
    </Draggable>
  )
}

const items = [
  <Avatar src="https://avatars0.githubusercontent.com/u/41789633?s=460&u=f12ac960ecf9e98ba5184b086df996a7bc96484e&v=4" />,
  <br />,
  <Input
    size="small"
    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
    placeholder="Username"
  />,
  <Input
    size="small"
    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
    type="password"
    placeholder="Password"
  />,
  <Fragment>
    <Checkbox size="small">Remember me</Checkbox>
    <a className="login-form-forgot" href="#" children="Forgot password" />
    <Button
      size="small"
      type="primary"
      htmlType="submit"
      className="login-form-button"
      children="Log in"
    />
  </Fragment>,
]

export default function App() {
  const [open, SetOpen] = useState();
  const toggle = () => SetOpen(!open);
  const contentProps = useSpring({
    left: open ? 220 : 0
  });

  const state = open === undefined
    ? 'close'
    : open
      ? 'open'
      : 'close';
  return (
    <div style={{ position: 'absolute', background: 'lightgray', width: '100%', height: '100%' }}>
      <a.div style={{ position: 'absolute', ...contentProps }}>
        <MenuFoldOutlined className="sidebar-toggle ani" onClick={toggle} />
      </a.div>

      <Sidebar native state={state} >
        {({ x }) => (
          <div style={{ height:'100%'}}>
            <animated.div
              className='sidebar'
              style={{
                transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
              }}>
              <Content
                native
                items={items}
                keys={items.map((_, i) => i)}
                reverse={!open}
                state={state}>
                {(item, i) => ({ x, ...props }) => (
                  <animated.div
                    style={{
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
            <animated.div
              style={{
                position: 'absolute',

                top:270,
                left: x.interpolate(x => `${x+10}px`),
               
              }}>
              <Layout_item />
            </animated.div>
          </div>
        )}

      </Sidebar>

    </div>

  )
}
