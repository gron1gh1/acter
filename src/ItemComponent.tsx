
import React from 'react';
import { Layout, Menu, Form, Input, Checkbox, Button } from 'antd'
import CSS from 'csstype';
import { Droppable, Draggable, DragDropContext, DropResult, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
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
});

export function ButtonItem(style: CSS.Properties) {
  return (
    <Layout style={style}>
      <Button type="primary">Primary</Button>
    </Layout>
  )
}
interface IItem {
  item?: boolean
  style?: CSS.Properties;
  
}
export function Layout_1({ item = false, style = {} }: IItem) {
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
        Header
        </Header>
      <Layout.Content style={item_content_style}>
        <Droppable droppableId="droppableId-1" type="COMPONENT">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} style={getViewStyle(snapshot.isDraggingOver)}>
              Content
              {provided.placeholder}
            </div>
          )}
        </Droppable>

      </Layout.Content>
      <Footer style={item_header_style}>
        Footer
        </Footer>
    </Layout>
  )
}
export function Layout_2({ item = false, style = {} }: IItem) {
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
      <Header style={item_header_style}>Header</Header>
      <Layout>
        <Sider style={sidebar_content_style} width={sidebar_content_style && sidebar_content_style.width}>Sider</Sider>
        <Layout.Content style={item_content_style}>Content</Layout.Content>
      </Layout>
      <Footer style={item_header_style}>Footer</Footer>
    </Layout>

  )
}
export function Layout_3({ item = false, style = {} }: IItem) {
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
      <Header style={item_header_style}>Header</Header>
      <Layout>
        <Layout.Content style={item_content_style}>Content</Layout.Content>
        <Sider style={sidebar_content_style} width={sidebar_content_style && sidebar_content_style.width}>Sider</Sider>
      </Layout>
      <Footer style={item_header_style}>Footer</Footer>
    </Layout>

  )
}


//export function Layout_4({ item, style,sidebar } : Item) {
export function Layout_4({ item = false, style = {} }: IItem) {
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
        {/* {sidebar && sidebar.map((v, i) =>
            (
              <div>
                {React.cloneElement(v)}
                </div>
            )
          )} */}
          Sidebar
      </Sider>

      <Layout>
        <Header style={item_header_style}>
          Header
        </Header>
        <Layout.Content style={item_content_style}>
          Content
        </Layout.Content>
        <Footer style={item_header_style}>
          Footer
        </Footer>
      </Layout>
    </Layout>

  )
}