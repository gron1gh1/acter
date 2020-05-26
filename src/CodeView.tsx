import React, { useEffect,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
    LiveProvider,
    LiveEditor,
    LiveError,
    LivePreview,

} from 'react-live'
import { ISelect } from './Interface';
import * as antd from 'antd';
import * as Item from './ItemComponent';
import {getNPM} from './util';

const WrapperCode = styled.div`
    display:flex;
    flex-direction:column;
    width:1024px;
    minHeight:240px;
`;

const StyledLiveEditor = styled(LiveEditor)`
    background: rgb(50,42,56);
    caret-color: rgb(197,200,198);
`;

const ModuleToObject = (npm_lib : object) => { // Local Module To Object (ex: {Button : function Button(...)}
    let res = {};
    let obj_names = Object.keys(npm_lib);
    Object.values(npm_lib).forEach((v, i) => {
        Object.assign(res, { [obj_names[i]]: v });
    })
    return res;
}
/* 
class App extends React.Component {
 
  constructor()
  {
  super();
  this.state = {
    current: 'mail',
  };
  }
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="mail" >
          Navigation One
        </Menu.Item>
        <Menu.Item key="app">
          Navigation Two
        </Menu.Item>
        <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            Navigation Four - Link
          </a>
        </Menu.Item>
      </Menu>
    );
  }
}

function App2()
{
	const [current,setCurrent] = useState('mail');
	function handleClick(e)
	{
		setCurrent(e.key);
	}
	return (
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="mail" >
          Navigation One
        </Menu.Item>
        <Menu.Item key="app">
          Navigation Two
        </Menu.Item>
        <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            Navigation Four - Link
          </a>
        </Menu.Item>
      </Menu>
    );
}

render(
 <App/>
)
 */

// 가상 렌더링 오류 solution : 서버에서 읽어올 떄 리액트도 다운 받아서 리액트가 두개 선언됨.
// jspm.io  에서 한번 읽고 react 부분 지운다음에 다시 import 시켜야 함.

/*
A = $.ajax('https://dev.jspm.io/antd');

BLOB = new Blob([A], {
  type: 'text/javascript',
  endings: 'native'
});

import(window.URL.createObjectURL(BLOB)).then(({ default: React }) => console.log(React));

*/
console.log( getNPM);
export function CodeView() {
    const CodeData: string = useSelector((state: ISelect) => state.codeReducer.Code as string); // Get Data from Reducer to this
    const [scope,SetScope] = useState<any>({});
    useEffect(() => {
      
        getNPM('antd@4.1.1').then((v : any)=> {
          //console.log(v);
          SetScope({...v,...{useState},...{useEffect}})

        });
    }, [])

    useEffect(()=>{
        console.log('scope',scope);
    },[scope])


    return (
        <WrapperCode>
            <LiveProvider noInline code={CodeData ? CodeData : `render (
                <div>

                </div>
            )`} scope={scope}>
                <StyledLiveEditor />
                <LiveError />
                <LivePreview style={{ background: 'white' }} />
            </LiveProvider>
        </WrapperCode>
    )
}