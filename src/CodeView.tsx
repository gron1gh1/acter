import React, { useEffect } from 'react';
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

const scope = () => {
    let res = {};

    Object.values(Item).forEach((v, i) => {
        let name = v.name;
        Object.assign(res, { [name]: v });
    })
    return res;
}

const scope2 = { LoginItem: Item.LoginItem };

export function CodeView() {
    const CodeData: string = useSelector((state: ISelect) => state.codeReducer.Code as string); // Get Data from Reducer to this 
    useEffect(() => {
        console.log(scope());
        getNPM('antd').then((v : any)=> console.log('res : ',v));
    }, [])
    return (
        <WrapperCode>
            <LiveProvider code={CodeData ? CodeData : "Hello World"} scope={scope()}>
                <StyledLiveEditor />
                <LiveError />
                <LivePreview style={{ background: 'white' }} />
            </LiveProvider>
        </WrapperCode>
    )
}