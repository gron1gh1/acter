import { PlusCircleOutlined } from '@ant-design/icons';
import { AiFillCode } from 'react-icons/ai';
import { RiDragDropLine } from 'react-icons/ri';
import { FaTrashAlt } from 'react-icons/fa';
import styled, { css } from 'styled-components';
import {IMakeBox, IDroppableBox,IAreaWrapper } from './Interface';

export const MakeButton = styled(PlusCircleOutlined)`
font-size:2rem;
padding-top:30px;
padding-bottom:30px;
color:black;
`;
export const InnerBox = styled.div<IMakeBox>`

display:none;
margin-bottom:5px;
width:100%;
height:50px;
cursor: default;
${(props) => css`
  background: ${props.boxColor};   
`}

`;

export const InnerCodeButton = styled(AiFillCode)`
margin: 15px 7px 15px 7px;
font-size:1.5rem;
color:GhostWhite;
&:hover{
  cursor: pointer;
  color:LightGray;
}
`;

export const InnerTrashButton = styled(FaTrashAlt)`
margin: 15px 7px 15px 7px;
font-size:1.5rem;
color:GhostWhite;
&:hover{
  cursor: pointer;
  color:LightGray;
}
`;


export const MakeBox = styled.div<IMakeBox>`
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
export const InputButton = styled(RiDragDropLine)`
  display:inline-block;
`;

export const TrashButton = styled(FaTrashAlt)`
  display:none;
  fontSize:2rem;
  color:DimGray;
  &:hover{
    cursor:pointer;
    color:IndianRed;
  }
`;

export const DroppableBox = styled.div<IDroppableBox>`
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

//AreaWrapper > Clicked Component InnerBox Output
export const AreaWrapper = styled.div<IAreaWrapper>` 
    ${(props) => css`
        ${MakeBox}:nth-child(${props.cursel}) ${InnerBox}{
          display: block;
        } 
    `} 
`;