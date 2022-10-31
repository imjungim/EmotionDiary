import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


const Edit = () => {
  const navigate = useNavigate();
  console.log("navi",navigate)
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get('id');
  console.log("id??",id)
  const mode = searchParams.get('mode');
  console.log("mode??",mode)

  return (
    <div>
      <h1>Edit </h1>
      <p>이 곳은 일기수정페이지 입니다.</p>
      <button onClick={()=>setSearchParams({who : 'imjungim'})}>바꾸기</button>
      <button onClick={()=>{
        navigate('/home')
      }}>HOME으로 가기</button>
      <button onClick={()=>{
        navigate(-1);
      }}>뒤로가기</button>
    </div>
  );
};

export default Edit;