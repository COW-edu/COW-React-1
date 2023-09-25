
import { Routes, Route, useNavigate } from "react-router-dom";
import './Search.css'
import { useState } from "react";

export default function Search() {
    const [text, setText] = useState('');
    const [Display, setDisplay] = useState('none');
 
  const onChange = (e) => {
    setText(e.target.value);
    setDisplay('block');
  };
  const onReset = () => {
    setText('');
    setDisplay('none');
  };
  const back = {
    display : Display,
    backgroundColor : 'white',
    border : '0px'


  }
   
        const navigate = useNavigate();
      
        const Close = () => {
          
          navigate('/');
        }

    return (
    <div>
        <div type='form' className="SearchWrapper2">
        <img className='SearchButton2' width={'30px'} height={'30px'} src='magnifier.png'/>
         <input value={text}  onChange={onChange} className='Search2' type='search' 
         placeholder="검색어를 입력해주세요"
        ></input>
        <button onClick={onReset} style={back}>❎</button>
            <span className="SearchClear"></span>
            <button className='SearchX' onClick={Close}>✕</button>
            
        </div>
    </div>
    )

}