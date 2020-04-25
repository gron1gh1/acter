
import React, { useState } from 'react';
import { Layout, Menu, Form, Input, Checkbox, Button, Row } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons';
import CSS from 'csstype';
import { Droppable, Draggable, DragDropContext, DropResult, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import { IDroppable, IItem, IMainState, IMenuState } from './Interface';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
const { Header, Footer, Sider } = Layout;
const Sidebar_Color = 'rgb(59,160,233)';
const Content_Color = 'rgb(16,142,233)';
const Header_Color = 'rgb(125,188,234)';

export function MenuItem(style: CSS.Properties) {
  return (
    <Menu style={style}>
      <Menu.Item>Menu</Menu.Item>
      <Menu.SubMenu title="SubMenu">
        <Menu.Item>SubMenuItem</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}

export function LoginItem(style: CSS.Properties) {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      style={style}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
const getViewStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  background: isDraggingOver ? "lightblue" : "white",
  width: '100vh',
});

export function ButtonItem(style: CSS.Properties) {
  return (
    <Layout style={style}>
      <Button type="primary">Primary</Button>
    </Layout>
  )
}


function ItemDroppable({ id, type }: IDroppable<IMainState, IMenuState>) {
  const MainState: IMainState = useSelector((state: IMainState) => state);
  const key = MainState[id] as React.ReactElement[];

  return (
    <Droppable droppableId={id} type={type}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} style={getViewStyle(snapshot.isDraggingOver)}>
          {key && key.map((v, i) =>
            (
              <div>
                {React.cloneElement(v)}
              </div>
            )
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

function MakeArea() {
  const [m_state, SetMouse] = useState('leave');
  const setStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '100px', width: '100vh',
    cursor: m_state !== 'click' ? 'pointer' : undefined,
    border: m_state === 'enter' ? '1px skyblue solid' : undefined
  }
  return (
    <div style={setStyle}
      onMouseEnter={() => { m_state !== 'click' ? SetMouse('enter') : console.log('1') }}
      onMouseLeave={() => { m_state !== 'click' ? SetMouse('leave') : console.log('1') }}
      onMouseDown={() => SetMouse('click')}>
      {m_state !== 'click' ?
        <PlusCircleOutlined style={{ fontSize: '2rem', color: m_state === 'enter' ? 'skyblue' : undefined }} /> :
        <ItemDroppable id="Content" type="COMPONENT" />
      }

    </div>
  )
}
export function Layout_1({ item = false, style = {} }: IItem) {
  const Content: React.ReactElement[] = useSelector((state: IMainState) => state.Content);

  var item_header_style: CSS.Properties = {};
  var item_content_style: CSS.Properties = {};
  if (item === true) {
    item_header_style = {
      background: `${Header_Color}`, height: '40px'
    }

    item_content_style = {
      background: `${Content_Color}`, height: '100px'
    }
  }


  return (
    <Layout style={style} >
      <Header style={item_header_style}>
        {!item && <ItemDroppable id="Header" type="COMPONENT" />}
      </Header>

      <Row>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {!item && <MakeArea />}

        </div>

      </Row>
    </Layout>
  )
}
export function Layout_2({ item = false, style = {} }: IItem) {
  const Content: React.ReactElement[] = useSelector((state: IMainState) => state.Content);

  var item_header_style: CSS.Properties = {};
  var item_content_style: CSS.Properties = {};
  var sidebar_content_style: CSS.Properties = {};
  if (item === true) {
    item_header_style = {
      background: `${Header_Color}`, height: '40px'
    }

    item_content_style = {
      background: `${Content_Color}`, height: '100px'
    }
    sidebar_content_style = {
      background: `${Sidebar_Color}`,
      width: '50px'
    }
  }
  return (

    <Layout style={style}>

      {/* <Header style={item_header_style} height={50}>Header</Header> */}
      <Header style={item_header_style}>
        {!item && <ItemDroppable id="Header" type="COMPONENT" />}
      </Header>
      <Layout>
        <Sider style={sidebar_content_style} width={sidebar_content_style && sidebar_content_style.width}>
          {!item && <ItemDroppable id="Sidebar" type="COMPONENT" />}
        </Sider>
        <Layout.Content style={item_content_style}>
          {!item && <ItemDroppable id="Content" type="COMPONENT" />}
        </Layout.Content>
      </Layout>
      <Footer style={item_header_style}>
        {!item && <ItemDroppable id="Footer" type="COMPONENT" />}
      </Footer>
    </Layout>

  )
}
export function Layout_3({ item = false, style = {} }: IItem) {
  const Content: React.ReactElement[] = useSelector((state: IMainState) => state.Content);

  var item_header_style: CSS.Properties = {};
  var item_content_style: CSS.Properties = {};
  var sidebar_content_style: CSS.Properties = {};
  if (item === true) {
    item_header_style = {
      background: `${Header_Color}`, height: '40px'
    }

    item_content_style = {
      background: `${Content_Color}`, height: '100px'
    }
    sidebar_content_style = {
      background: `${Sidebar_Color}`,
      width: '50px'
    }
  }
  return (

    <Layout style={style}>
      <Header style={item_header_style}>
        {!item && <ItemDroppable id="Header" type="COMPONENT" />}
      </Header>
      <Layout>
        <Layout.Content style={item_content_style}>
          {!item && <ItemDroppable id="Content" type="COMPONENT" />}
        </Layout.Content>
        <Sider style={sidebar_content_style} width={sidebar_content_style && sidebar_content_style.width}>
          {!item && <ItemDroppable id="Sidebar" type="COMPONENT" />}
        </Sider>
      </Layout>
      <Footer style={item_header_style}>
        {!item && <ItemDroppable id="Footer" type="COMPONENT" />}
      </Footer>
    </Layout>

  )
}


//export function Layout_4({ item, style,sidebar } : Item) {
export function Layout_4({ item = false, style = {} }: IItem) {
  const Content: React.ReactElement[] = useSelector((state: IMainState) => state.Content);

  var item_header_style: CSS.Properties = {};
  var item_content_style: CSS.Properties = {};
  var sidebar_content_style: CSS.Properties = {};
  if (item === true) {
    item_header_style = {
      background: `${Header_Color}`, height: '40px'
    }

    item_content_style = {
      background: `${Content_Color}`, height: '100px'
    }
    sidebar_content_style = {
      background: `${Sidebar_Color}`,
      width: '50px'
    }
  }
  return (

    <Layout style={style}>

      <Sider style={sidebar_content_style} width={sidebar_content_style && sidebar_content_style.width}>
        {!item && <ItemDroppable id="Sidebar" type="COMPONENT" />}
      </Sider>

      <Layout>
        <Header style={item_header_style}>
          {!item && <ItemDroppable id="Header" type="COMPONENT" />}
        </Header>
        <Layout.Content style={item_content_style}>
          {!item && <ItemDroppable id="Content" type="COMPONENT" />}
        </Layout.Content>
        <Footer style={item_header_style}>
          {!item && <ItemDroppable id="Footer" type="COMPONENT" />}
        </Footer>
      </Layout>
    </Layout>

  )
}