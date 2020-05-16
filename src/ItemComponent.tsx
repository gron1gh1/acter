
import React, { useState, useEffect, useRef, forwardRef, createRef} from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Form, Input, Checkbox, Button, Row } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons';
import { AiFillCode } from 'react-icons/ai';
import { RiDragDropLine } from 'react-icons/ri';
import { FaTrashAlt } from 'react-icons/fa';
import { Droppable, Draggable, DragDropContext, DropResult, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import { IDroppable, IItem, IMainState, IMenuState, IMakeBox, IDroppableBox, ISelect, IAreaWrapper } from './Interface';
import { useDispatch, useSelector, } from 'react-redux';
import styled, { css } from 'styled-components';
import { MainActions } from './reducer';
import withForwardedRef from 'react-with-forwarded-ref';

const { Header, Footer, Sider } = Layout;
const Sidebar_Color = 'rgb(59,160,233)';
const Content_Color = 'rgb(16,142,233)';
const Header_Color = 'rgb(125,188,234)';

export const MenuItem_bak = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref}>
    <Menu>
      <Menu.Item>Menu</Menu.Item>
      <Menu.SubMenu title="SubMenu">
        <Menu.Item>SubMenuItem</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  </div>
))


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

export const forward = (Component: React.ReactElement, Props?: any, ref?: any) => forwardRef<HTMLDivElement>(() => (
  <div ref={ref}>
    {React.cloneElement(Component, { ...Props })}
  </div>
))

// function withForward(Component: React.reacte) {
//   return forwardRef<HTMLDivElement>((props, ref) => {
//     return (
//       <div ref={ref}>
//         <Component {...props} />
//       </div>
//     )
//   }
//   )
// }


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

export const LoginItem_bak = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref}>
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      name="basic"
      initialValues={{ remember: true }}
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

      <Form.Item wrapperCol={{ offset: 8, span: 16 }} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
))

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

export const ButtonItem = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref}>
    <Button type="primary">Primary</Button>
  </div>
))


export function ButtonItem_bak(style: React.CSSProperties) {
  return (
    <Button type="primary">Primary</Button>
  )
}


const MakeButton = styled(PlusCircleOutlined)`
    font-size:2rem;
    padding-top:30px;
    padding-bottom:30px;
    color:black;
`;
const InnerBox = styled.div<IMakeBox>`

   display:none;
    margin-bottom:5px;
    width:100%;
    height:50px;
    cursor: default;
    ${(props) => css`
      background: ${props.boxColor};   
    `}

`;

const InnerCodeButton = styled(AiFillCode)`
    margin: 15px 7px 15px 7px;
    font-size:1.5rem;
    color:GhostWhite;
    &:hover{
      cursor: pointer;
      color:LightGray;
    }
`;
const InnerTrashButton = styled(FaTrashAlt)`
    margin: 15px 7px 15px 7px;
    font-size:1.5rem;
    color:GhostWhite;
    &:hover{
      cursor: pointer;
      color:LightGray;
    }
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
      }
    `}
`;
const InputButton = styled(RiDragDropLine)`
      display:inline-block;
`;

const TrashButton = styled(FaTrashAlt)`
      display:none;
      fontSize:2rem;
      color:DimGray;
      &:hover{
        cursor:pointer;
        color:IndianRed;
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
    
    ${InputButton}{
      display:inline-block;
    }
    ${TrashButton}{
      display:none;
    }
    

    ${(props) =>
    props.isDragging &&
    css`
      background:skyblue;
      
    `}

    ${(props) =>
    !props.isDragging &&
    css`
      &:hover{
        ${InputButton}{
          display:none;
        }
        ${TrashButton}{
          display:inline-block;
        }
      }
    `}
`;


function ItemDroppable({ id, unique_n, type }: IDroppable<IMainState, IMenuState>) {

  const dispatch = useDispatch();
  function Remove(index: number | undefined) {
    if (index !== undefined)
      dispatch(MainActions.removeArea(index));
  }

  return (
    <div>
      <Droppable droppableId={`Area-${unique_n}`} type={type}>
        {(provided, snapshot) => (
          <DroppableBox ref={provided.innerRef} isDragging={snapshot.isDraggingOver}>
            <InputButton fontSize="2rem" />
            <TrashButton fontSize="2rem" onClick={() => Remove(unique_n)} />
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
    dispatch(MainActions.makeArea());
  }
  return (
    <MakeBox boxColor="RoyalBlue" isClick={false}
      onClick={Make}>
      <MakeButton />
    </MakeBox>
  )
}

//AreaWrapper > Clicked Component InnerBox Output
const AreaWrapper = styled.div<IAreaWrapper>` 
    ${(props) => css`
        ${MakeBox}:nth-child(${props.cursel}) ${InnerBox}{
          display: block;
        } 
    `} 
`;

interface Props<A = any> {
  children: React.ReactNode;
  forwardedRef?: React.RefObject<A>;
}

const Comp: React.FC<Props> = ({ children, forwardedRef }) => (
  <div ref={forwardedRef}>
    {children}
  </div>
)

const WrappedComp = withForwardedRef(Comp)

function Area() {
  const MainArea: Array<React.ReactElement | null> = useSelector((state: ISelect) => state.mainReducer['Area'] as Array<React.ReactElement | null>);
  const [boxColor, SetBoxColor] = useState('RoyalBlue');
  const [cursel, SetCursel] = useState(-1);
  const dispatch = useDispatch();

  const uref = useRef(null);
  const cref = createRef();
  useEffect(() => {
    console.log(cursel);
    console.log(`element-${cursel - 1}`, document.getElementById(`element-${cursel - 1}`));
    console.log(uref);
  }, [cursel]);

  async function Remove(index: number | undefined) {
    if (index !== undefined) {
      await dispatch(MainActions.removeArea(index));
      await SetCursel(-1);
    }
  }

  // function getStylesWithoutDefaults( element : Element ) {

  //   // creating an empty dummy object to compare with
  //   var dummy = document.createElement( 'element-' + ( new Date().getTime() ) );
  //   document.body.appendChild( dummy );

  //   // getting computed styles for both elements
  //   var defaultStyles = getComputedStyle( dummy );
  //   var elementStyles = getComputedStyle( element );

  //   // calculating the difference
  //   var diff : {[key : string]: CSSStyleDeclaration} = {};
  //   for( var key in elementStyles ) {
  //     if(elementStyles.hasOwnProperty(key)
  //           && defaultStyles[key] !== elementStyles[ key ] )
  //     {
  //       diff[key] = elementStyles[key];
  //     }
  //   }

  //   // clear dom
  //   dummy.remove();

  //   return diff;
  // }


  return (
    <AreaWrapper cursel={cursel}>
      {MainArea.map((v, idx) => {
        if (v) {
          return (
            <MakeBox boxColor={boxColor} isClick={false} onClick={() => SetCursel(idx + 1)}>
              <InnerBox boxColor={boxColor}>
                <InnerCodeButton />
                <InnerTrashButton onClick={() => Remove(idx)} onMouseEnter={() => SetBoxColor('IndianRed')} onMouseLeave={() => SetBoxColor('RoyalBlue')} />
              </InnerBox>

              {/* extractCSS(ref.current) 여기부터 시작 css 추출 */}
              <WrappedComp ref={uref}>
                {React.cloneElement(v)}
              </WrappedComp>
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
    </AreaWrapper>
  )
}
export function Layout_1({ item = false, style = { background: 'white' } }: IItem) {

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