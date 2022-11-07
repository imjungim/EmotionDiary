import React, { useEffect, useReducer, useRef } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, json } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
  let newState = [];

  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  localStorage.setItem('diary', JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();



function App() {

  //localStorage 사용 실습
  // useEffect(()=>{
  //   // localStorage.setItem("item1", 10);
  //   // localStorage.setItem("item2", 20);
  //   // localStorage.setItem("item3", JSON.stringify({ value : 30 }));
  //   const item1 = localStorage.getItem('item1');
  //   const item2 = localStorage.getItem('item2');
  //   const item3 = JSON.parse(localStorage.getItem('item3'));
  //   console.log({item1, item2, item3}) //문자열로 바뀌어 나옴.(number type ->string type)
  // },[]) 




  const [data, dispatch] = useReducer(reducer, []);

  useEffect(()=>{
    const localData = localStorage.getItem('diary');
    if(localData){
      const diaryList = JSON.parse(localData).sort((a,b)=>parseInt(b.id)-parseInt(a.id));
      dataId.current =parseInt(diaryList[0].id) + 1

      //diaryList 를data 초기값으로 설정
      dispatch({type : 'INIT', data : diaryList});
    }
  },[])

  const dataId = useRef(0);

  //create
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  //remove
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  //edit
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        data: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
