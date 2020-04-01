import React, { Fragment, useState, useContext, useRef } from 'react';
import { animated as render_a} from 'react-spring/renderprops';
import { useSpring, animated} from 'react-spring';
import { Form, Row, Col } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import {Sidebar,Content} from './Spring';
import {AppContext} from './App';


  
export default function Main() {
    const [open, SetOpen] = useState();
  
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
          <Sidebar native state={state}>
            {({ x, opacity }) => (
              <render_a.div
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
                    <render_a.div
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
                    </render_a.div>
                  )}
  
                </Content>
              </render_a.div>
  
            )}
  
          </Sidebar>
        </Col>
        <Col span={20} style={{ background: 'lightgray' }}>
  
          {main.Components.map((v, i) =>
            (
              <animated.div style={ani_props}>
                {React.cloneElement(v, { style: { height: '100vh' } ,item:'false'})}
              </animated.div>
            )
          )}
  
        </Col>
      </Row>
  
  
    )
  }
  