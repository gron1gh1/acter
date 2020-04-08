
import React from 'react';
import { Layout, Menu, Form, Input, Checkbox, Button } from 'antd'


const { Header, Footer, Sider } = Layout;
const Sidebar_Color = 'rgb(59,160,233)';
const Content_Color = 'rgb(16,142,233)';
const Header_Color = 'rgb(125,188,234)';

export function MenuItem(style) {
  return (
    <Menu style={style}>
      <Menu.Item>Menu</Menu.Item>
      <Menu.SubMenu title="SubMenu">
        <Menu.Item>SubMenuItem</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}
export function LoginItem(style) {
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

export function ButtonItem(style) {
  return (
    <Layout style={style}>
      <Button type="primary">Primary</Button>
    </Layout>
  )
}

export function Layout_1({ item, style }) {

  if (item === true) {
    var item_header_style = {
      background: `${Header_Color}`, height: '40px'
    }

    var item_content_style = {
      background: `${Content_Color}`, height: '100px'
    }
  }
  return (
    <Layout style={style}>
      <Header style={item_header_style}>Header</Header>
      <Layout.Content style={item_content_style}>Content</Layout.Content>
      <Footer style={item_header_style}>Footer</Footer>
    </Layout>
  )
}
export function Layout_2({ item, style }) {
  if (item === true) {
    var item_header_style = {
      background: `${Header_Color}`, height: '40px'
    }

    var item_content_style = {
      background: `${Content_Color}`, height: '100px'
    }
    var sidebar_content_style = {
      background: `${Sidebar_Color}`,
      width: 50
    }
  }
  return (

    <Layout style={style}>
      <Header style={item_header_style} height={50}>Header</Header>
      <Layout>
        <Sider style={sidebar_content_style} width={sidebar_content_style && sidebar_content_style.width}>Sider</Sider>
        <Layout.Content style={item_content_style}>Content</Layout.Content>
      </Layout>
      <Footer style={item_header_style}>Footer</Footer>
    </Layout>

  )
}
export function Layout_3({ item, style }) {
  if (item === true) {
    var item_header_style = {
      background: `${Header_Color}`, height: '40px'
    }

    var item_content_style = {
      background: `${Content_Color}`, height: '100px'
    }
    var sidebar_content_style = {
      background: `${Sidebar_Color}`,
      width: 50
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


export function Layout_4({ item, style,sidebar }) {
  
  if (item === true) {
    var item_header_style = {
      background: `${Header_Color}`, height: '40px'
    }

    var item_content_style = {
      background: `${Content_Color}`, height: '100px'
    }
    var sidebar_content_style = {
      background: `${Sidebar_Color}`,
      width: 50
    }
  }
  return (

    <Layout style={style}>

      <Sider style={sidebar_content_style} width={sidebar_content_style && sidebar_content_style.width}>
      {sidebar && sidebar.map((v, i) =>
            (
              <div>
                {React.cloneElement(v)}
                </div>
            )
          )}
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