import './antd.css'
import './styles.css'
import React, { Fragment, useState } from 'react'
import { Keyframes, animated } from 'react-spring/renderprops'

import { Avatar, Form, Input, Button, Checkbox } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import delay from 'await-delay'

// Creates a spring with predefined animation slots
const Sidebar = Keyframes.Spring({
  // Slots can take arrays/chains,
  open: { delay: 0, x: 0 },
  // or async functions with side-effects
  close: async call => {
    await delay(100)
    await call({ delay: 0, x: -100 })
  },
})

// Creates a keyframed trail
const Content = Keyframes.Trail({
  open: { x: 0, opacity: 1, delay: 100 },
  close: { x: -100, opacity: 0, delay: 0 },
})

const items = [
  <Avatar src="https://avatars0.githubusercontent.com/u/41789633?s=460&u=f12ac960ecf9e98ba5184b086df996a7bc96484e&v=4" />,
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

  const icon = open ? <MenuFoldOutlined style={{width:'450px'}} className="sidebar-toggle" onClick={toggle} /> : <MenuUnfoldOutlined className="sidebar-toggle" onClick={toggle}/>;
  const state = open === undefined
    ? 'close'
    : open
      ? 'open'
      : 'close';
  return (
    <div style={{ position: 'absolute', background: 'lightgray', width: '100%', height: '100%' }}>
      {icon}
      <Sidebar native state={state}>
        {({ x }) => (

          <animated.div
            className="sidebar"
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
                    ...props,
                  }}>
                  <Form.Item className={i === 0 ? 'middle' : ''}>
                    {item}
                  </Form.Item>
                </animated.div>
              )}
            </Content>
          </animated.div>
        )}
      </Sidebar>
    </div>
  )
}

// export default class App extends React.Component {
//   state = { open: undefined }
//   toggle = () => this.setState(state => ({ open: !state.open }))
//   render() {
//     const state =
//       this.state.open === undefined
//         ? 'close'
//         : this.state.open
//         ? 'open'
//         : 'close';

//     const icon = this.state.open ? <MenuFoldOutlined className="sidebar-toggle" onClick={this.toggle}/> : <MenuUnfoldOutlined className="sidebar-toggle" onClick={this.toggle}/>;
//     return (
//       <div style={{ position: 'absolute',background: 'lightgray', width: '100%', height: '100%' }}>
//         {icon}
//         <Sidebar native state={state}>
//           {({ x }) => (

//             <animated.div
//               className="sidebar"
//               style={{
//                 transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
//               }}>
//               <Content
//                 native
//                 items={items}
//                 keys={items.map((_, i) => i)}
//                 reverse={!this.state.open}
//                 state={state}>
//                 {(item, i) => ({ x, ...props }) => (
//                   <animated.div
//                     style={{
//                       transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
//                       ...props,
//                     }}>
//                     <Form.Item className={i === 0 ? 'middle' : ''}>
//                       {item}
//                     </Form.Item>
//                   </animated.div>
//                 )}
//               </Content>
//             </animated.div>
//           )}
//         </Sidebar>
//       </div>
//     )
//   }
// }