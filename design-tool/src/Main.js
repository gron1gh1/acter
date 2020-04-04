import React, { Fragment, useState, useContext, useRef } from 'react';
import { animated as render_a} from 'react-spring/renderprops';
import { useSpring, animated} from 'react-spring';
import { Form, Row, Col } from 'antd';
import { MenuFoldOutlined,LayoutOutlined,ToolFilled ,LayoutFilled} from '@ant-design/icons';
import {Sidebar,Content} from './Spring';
import {AppContext} from './App';

  
export default function Main() {
    const main = useContext(AppContext);
    
    const [CurrentMenu,SetMenu] = useState('layout');
    const LayoutMenuShow = () => {
      if(CurrentMenu !== 'layout')
      {
        SetMenu('layout');
      }
    }
    const ItemMenuShow = () => {
      if(CurrentMenu !== 'item')
      {
        SetMenu('item');
      }
    } 
    const ani_props = useSpring({ opacity: main.layout ? 1 : 0 });
    return (
      <Row style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <Col span={4}
          className='sidebar' style={{ background: 'white', overflow: 'visible', zIndex: 99 }}>
          <div style={{height:20}}>
          <LayoutFilled className="sidebar-toggle" onClick={LayoutMenuShow} style={{ position: 'absolute', left: 10, top: 0 }} />
          <ToolFilled className="sidebar-toggle" onClick={ItemMenuShow} style={{ position: 'absolute', left: 50, top: 0 }} />
          </div>
          <Sidebar native state='open'>
            {({ x, opacity }) => (
              <render_a.div
                style={{
                  transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
                }}>
                <Content
                  native
                  items={CurrentMenu === 'layout' ? main.MenuItems : main.Items}
                  keys={CurrentMenu === 'layout' ? main.MenuItems.map((_, i) => i) : main.Items.map((_, i) => i)}
                  reverse={!main.open}
                  state='open'
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
        {/* {main.Components.layout} */}
          {main.Components.layout.map((v, i) =>
            (
              <animated.div style={ani_props}>
                {React.cloneElement(v, { style: { height: '100vh' } ,item:'false',sidebar: main.Components.content})}
              </animated.div>
            )
          )}
  
        </Col>
      </Row>
  
  
    )
  }
  