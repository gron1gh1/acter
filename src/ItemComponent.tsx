
import React, { useState } from 'react';
import { Layout, Menu, Form, Input, Checkbox, Button, Row } from 'antd'
import { PlusCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Droppable, Draggable, DragDropContext, DropResult, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import { IDroppable, IItem, IMainState, IMenuState, IMakeArea } from './Interface';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styled, { css } from 'styled-components';
import { ActionCreators } from './reducer';
const { Header, Footer, Sider } = Layout;
const Sidebar_Color = 'rgb(59,160,233)';
const Content_Color = 'rgb(16,142,233)';
const Header_Color = 'rgb(125,188,234)';

export function MenuItem(style: React.CSSProperties) {
  return (
    <Menu style={style}>
      <Menu.Item>Menu</Menu.Item>
      <Menu.SubMenu title="SubMenu">
        <Menu.Item>SubMenuItem</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}

export function LoginItem(style: React.CSSProperties) {
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
  width: '100%',
  minHeight: '85px'
});

export function ButtonItem(style: React.CSSProperties) {
  return (
    <Layout style={style}>
      <Button type="primary">Primary</Button>
    </Layout>
  )
}

const RemoveButton = styled(CloseCircleOutlined)`
    font-size:2rem;
    padding-top:15px;
    padding-bottom:15px;
    color:black;
    &:hover{
      color:skyblue;
    }
`;

function ItemDroppable({ id, type }: IDroppable<IMainState, IMenuState>) {
  const MainState: IMainState = useSelector((state: IMainState) => state);
  const key = MainState[id] as React.ReactElement
  const dispatch = useDispatch();
  const [m_state, SetMouse] = useState('leave');
  const setStyle: React.CSSProperties = {
    background: 'GhostWhite',
    textAlign: 'center',
    width: '100%',
    cursor: m_state !== 'click' ? 'pointer' : undefined,
    border: m_state === 'enter' ? '1px skyblue solid' : undefined
  }

  function Remove() {
    dispatch(ActionCreators.addComponent(id, null));
  }

  return (
    <div>
      {key ?
        (
          <div style={setStyle}
            onMouseEnter={() => { SetMouse('enter') }}
            onMouseLeave={() => { SetMouse('leave') }}
          >
            {m_state === 'enter' && <RemoveButton onClick={Remove} />}
            {React.cloneElement(key)}
          </div>
        ) :
        (
          <Droppable droppableId={id} type={type}>
            {(provided, snapshot) => (
              <div ref={provided.innerRef} style={getViewStyle(snapshot.isDraggingOver)}>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}

    </div>
  )
}
interface IMakeBox {
  isClick: boolean;
}

const MakeButton = styled(PlusCircleOutlined)`
    font-size:2rem;
    padding-top:30px;
    padding-bottom:30px;
    color:black;

`;
const MakeBox = styled.div<IMakeBox>`
    background: GhostWhite;
    text-align: center;
    width: 100%;
    
    ${(props) =>
    props.isClick === false &&
    css`
      &:hover{
        cursor:pointer;
        border: 1px skyblue solid;
        ${MakeButton}{
          color:skyblue;
        }
      }
    `}
`;


function MakeArea({ unique_n }: IMakeArea) {
  const [m_state, SetMouse] = useState('leave');
  const setStyle: React.CSSProperties = {
    background: 'GhostWhite',
    textAlign: 'center',
    width: '100%',
    cursor: m_state !== 'click' ? 'pointer' : undefined,
    border: m_state === 'enter' ? '1px skyblue solid' : undefined
  }
  return (
    <MakeBox isClick={m_state === 'click' ? true : false}
      onMouseDown={() => SetMouse('click')}>
      {m_state !== 'click' ?
        <MakeButton />
        : (
          <div>
            <ItemDroppable id={`Content-${unique_n}`} type="COMPONENT" />
            <MakeArea unique_n={unique_n + 1} />
          </div>
        )
      }

    </MakeBox>
  )
}
export function Layout_1({ item = false, style = { background: 'white' } }: IItem) {
  const Content: React.ReactElement[] = useSelector((state: IMainState) => state.Content) as React.ReactElement[];

  var item_header_style: React.CSSProperties = {};
  var item_content_style: React.CSSProperties = {};
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
        {/* {!item && <ItemDroppable id="Header" type="COMPONENT" />} */}
      </Header>


      <div>
        {!item && <MakeArea unique_n={0} />}
      </div>

    </Layout>
  )
}
export function Layout_2({ item = false, style = {} }: IItem) {
  const Content: React.ReactElement[] = useSelector((state: IMainState) => state.Content) as React.ReactElement[];

  var item_header_style: React.CSSProperties = {};
  var item_content_style: React.CSSProperties = {};
  var sidebar_content_style: React.CSSProperties = {};
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
  const Content: React.ReactElement[] = useSelector((state: IMainState) => state.Content) as React.ReactElement[];

  var item_header_style: React.CSSProperties = {};
  var item_content_style: React.CSSProperties = {};
  var sidebar_content_style: React.CSSProperties = {};
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
  const Content: React.ReactElement[] = useSelector((state: IMainState) => state.Content) as React.ReactElement[];

  var item_header_style: React.CSSProperties = {};
  var item_content_style: React.CSSProperties = {};
  var sidebar_content_style: React.CSSProperties = {};
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