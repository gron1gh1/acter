
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Form, Input, Checkbox, Button, Row } from 'antd'
import { PlusCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { RiDragDropLine } from 'react-icons/ri';
import { FaTrashAlt } from 'react-icons/fa';
import { Droppable, Draggable, DragDropContext, DropResult, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import { IDroppable, IItem, IMainState, IMenuState, IMakeArea, IMakeBox,IDroppableBox } from './Interface';
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
  cursor: 'default',
  width: '100%',
  minHeight: '85px',
  textAlign: 'center',
  paddingTop: '30px',
  paddingBottom: '30px',
  borderBottom: '1px LightGray solid',
});

export function ButtonItem(style: React.CSSProperties) {
  return (
    <Layout style={style}>
      <Button type="primary">Primary</Button>
    </Layout>
  )
}

const RemoveButton = styled.div`
    display: none;
    margin-top:15px;
    margin-bottom:15px;
    font-size:2rem;
    color:LightSteelBlue;
    &:hover{
      color:Crimson;
    }
    
`;


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
      cursor:pointer;
      &:hover{
        box-shadow: 0 0 0 1px ${props.boxColor} inset;
        ${MakeButton}{
          color:RoyalBlue;
        }
        ${RemoveButton}{
          display:inline-block;
        }
        
      }
    `}
`;

const TrashButton = styled(FaTrashAlt)`
      fontSize:2rem;
      color:DimGray;
      &:hover{
        cursor:pointer;
        color:Crimson;
      }
`;

const DroppableBox = styled.div<IDroppableBox>`
    cursor: default;
    width:100%;
    min-height:85px;
    text-align:center;
    padding-top:30px;
    padding-bottom: 30px;
    border-bottom: 1px LightGray solid;
    ${(props) =>
      props.isDragging &&
      css`
      background:skyblue;
       
    `}
`;


function ItemDroppable({ id, unique_n, type }: IDroppable<IMainState, IMenuState>) {
  const [m_state, SetMouse] = useState(false);

  const dispatch = useDispatch();
  function Remove(index: number | undefined) {
    if(index !== undefined)
      dispatch(ActionCreators.removeArea(index));
  }

  return (
    <div>
      <Droppable droppableId={`Area-${unique_n}`} type={type}>
        {(provided, snapshot) => (
          <DroppableBox ref={provided.innerRef} isDragging={snapshot.isDraggingOver}
            onMouseEnter={() => !snapshot.isDraggingOver && SetMouse(true)}
            onMouseLeave={() => !snapshot.isDraggingOver && SetMouse(false)}>
              
            {m_state && <TrashButton fontSize="2rem" onClick={()=>Remove(unique_n)}/>}
            {!m_state && <RiDragDropLine fontSize="2rem" />}
            {provided.placeholder}
          </DroppableBox>
        )}
      </Droppable>
    </div>
  )
}


function MakeArea() {

  const dispatch = useDispatch();
  function Make() {
    dispatch(ActionCreators.makeArea());
  }
  return (
    <MakeBox boxColor="RoyalBlue" isClick={false}
      onClick={Make}>
      <MakeButton />
    </MakeBox>
  )
}

function Area() {
  const MainArea: Array<JSX.Element | null> = useSelector((state: IMainState) => state['Area'] as Array<JSX.Element | null>);
  const [boxColor, SetBoxColor] = useState('RoyalBlue');
  const dispatch = useDispatch();

  function Remove(index: number | undefined) {
    if(index !== undefined)
      dispatch(ActionCreators.removeArea(index));
  }
  return (
    <div>
      {MainArea.map((v, idx) => {
        if (v) {
          return (
            <MakeBox boxColor={boxColor} isClick={false}>

              <RemoveButton onClick={() => Remove(idx)} onMouseEnter={() => SetBoxColor('Crimson')} onMouseLeave={() => SetBoxColor('RoyalBlue')}>
                <CloseCircleOutlined />
              </RemoveButton>
              {React.cloneElement(v)}
            </MakeBox>
          )
        }
        else if (v === null) {

          return (
            <MakeBox boxColor={boxColor} isClick={true}>
              <ItemDroppable id="Area" unique_n={idx} type="COMPONENT" />
            </MakeBox>

          )
        }
      })}
      <MakeArea />
    </div>
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
        {!item && <Area />}
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
        {/* {!item && <ItemDroppable id="Header" type="COMPONENT" />} */}
      </Header>
      <Layout>
        <Sider style={sidebar_content_style} width={sidebar_content_style && sidebar_content_style.width}>
          {/* {!item && <ItemDroppable id="Sidebar" type="COMPONENT" />} */}
        </Sider>
        <Layout.Content style={item_content_style}>
          {/* {!item && <ItemDroppable id="Content" type="COMPONENT" />} */}
        </Layout.Content>
      </Layout>
      <Footer style={item_header_style}>
        {/* {!item && <ItemDroppable id="Footer" type="COMPONENT" />} */}
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
        {/* {!item && <ItemDroppable id="Header" type="COMPONENT" />} */}
      </Header>
      <Layout>
        <Layout.Content style={item_content_style}>
          {/* {!item && <ItemDroppable id="Content" type="COMPONENT" />} */}
        </Layout.Content>
        <Sider style={sidebar_content_style} width={sidebar_content_style && sidebar_content_style.width}>
          {/* {!item && <ItemDroppable id="Sidebar" type="COMPONENT" />} */}
        </Sider>
      </Layout>
      <Footer style={item_header_style}>
        {/* {!item && <ItemDroppable id="Footer" type="COMPONENT" />} */}
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
        {/* {!item && <ItemDroppable id="Sidebar" type="COMPONENT" />} */}
      </Sider>

      <Layout>
        <Header style={item_header_style}>
          {/* {!item && <ItemDroppable id="Header" type="COMPONENT" />} */}
        </Header>
        <Layout.Content style={item_content_style}>
          {/* {!item && <ItemDroppable id="Content" type="COMPONENT" />} */}
        </Layout.Content>
        <Footer style={item_header_style}>
          {/* {!item && <ItemDroppable id="Footer" type="COMPONENT" />} */}
        </Footer>
      </Layout>
    </Layout>

  )
}