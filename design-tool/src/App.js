import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';

function Content()
{
  return (
    <div className="content-container">
        Hello World!
    </div>
  )
}

function SideBar()
{
  const [Open,setOpen] = useState(true);

  const toggleSidebar = () =>{
    setOpen(!Open);
  }
  
  const renderSidebar = () => {
    if(!Open) return null;
    return <div className="sidebar">
      <div className="sidebar-link">Home</div>
      <div className="sidebar-link">About</div>
      <div className="sidebar-link">Contact</div>
    </div>
  }
  return (
    <div className="sidebar-container">
      <div className="sidebar-icon">
         <button onClick={() => toggleSidebar()}>Open></button>
       </div>
       {renderSidebar()}
       
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <SideBar />
      <Content />
    </div>
  )
}

export default App;
