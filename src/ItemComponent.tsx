
import React, { useState, useEffect, useRef} from 'react';
import { Layout, Menu, Form, Input, Checkbox, Button } from 'antd'
import { Droppable} from 'react-beautiful-dnd';
import { IDroppable, IItem, IMainState, IMenuState, ISelect } from './Interface';
import { useDispatch, useSelector, } from 'react-redux';
import {DroppableBox,InnerBox,InnerCodeButton,InputButton,MakeBox,InnerTrashButton,MakeButton,TrashButton,AreaWrapper} from './styledComponent';
import { MainActions } from './reducer';
import WrappedRef  from './WrappedRef';

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

export function ButtonItem(style: React.CSSProperties) {
  return (
    <Button type="primary">Primary</Button>
  )
}


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



function Area() {
  const MainArea: Array<React.ReactElement | null> = useSelector((state: ISelect) => state.mainReducer['Area'] as Array<React.ReactElement | null>);
  const [boxColor, SetBoxColor] = useState('RoyalBlue');
  const [cursel, SetCursel] = useState(-1);
  const dispatch = useDispatch();

  const uref = useRef(null);

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
              <WrappedRef ref={(idx === cursel - 1) ? uref : undefined}>
                {React.cloneElement(v)}
              </WrappedRef>
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