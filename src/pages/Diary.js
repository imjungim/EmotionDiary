import React from "react";
import { useParams } from "react-router-dom"; 

const Diary = () => {
  const {id} = useParams();
  console.log("id",id);
  
  return (
    <div>
      <h1>Diary</h1>
      <p>이 곳은 일기상세페이지 입니다.</p>
    </div>
  );
};

export default Diary;
