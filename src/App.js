import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
//COMPONENTS
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyHeader
          headText={"App"}
          leftChild={
            <MyButton text={"왼쪽 버튼"} onClick={() => alert("왼쪽클릭")} />
          }
          rightChild={
            <MyButton text={"오른쪽 버튼"} onClick={() => alert("오른쪽클릭")} />
          }
        />
        <h1>App.js</h1>

        <MyButton
          text={"버튼"}
          onClick={() => alert("button click")}
          type={"positive"}
        />

        <MyButton
          text={"버튼"}
          onClick={() => alert("button click")}
          type={"negative"}
        />

        <MyButton text={"버튼"} onClick={() => alert("button click")} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
