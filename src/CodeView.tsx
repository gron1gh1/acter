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

const ModuleToObject = (npm_lib : object) => { // NPM Module or Local Module To Object (ex: {Button : function Button(...)}
    let res = {};
    let obj_names = Object.keys(npm_lib);
    Object.values(npm_lib).forEach((v, i) => {
        Object.assign(res, { [obj_names[i]]: v });
    })
    return res;
}

const scope2 = { LoginItem: Item.LoginItem };

export function CodeView() {
    const CodeData: string = useSelector((state: ISelect) => state.codeReducer.Code as string); // Get Data from Reducer to this
    const [scope,SetScope] = useState({});
    useEffect(() => {
        let npm_lib = {};
        getNPM('antd').then((v : any)=> SetScope(ModuleToObject(v)));
      //  SetScope(get_scope(Item));
    }, [])

    useEffect(()=>{
        console.log('scope',scope);
    },[scope])
    return (
        <WrapperCode>
            <LiveProvider code={CodeData ? CodeData : "Hello World"} scope={scope}>
                <StyledLiveEditor />
                <LiveError />
                <LivePreview style={{ background: 'white' }} />
            </LiveProvider>
        </WrapperCode>
    )
}