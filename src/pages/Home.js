import React, { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import DiaryList from "../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);//필터링된 다이어리 data!

  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    //날짜가 이동하게 되면 diaryList에서 해당 월의 데이터만 뽑아냄.
    //현재월의 첫째날.
    if(diaryList.length >= 1){ 
    const firstDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      1
    ).getTime();

    //현재월의 마지막날짜.
    const lastDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      0,
      23,
      59,
      59
    ).getTime();

    //현재 월의 firstDay~LastDay 데이터만 필터링
    setData(
      diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
    );

  }
  }, [diaryList, curDate]);


  // useEffect(() => {
  //   console.log("data", data);
  // }, [data]);

  //+월
  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };
  //-월
  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data}/>
    </div>
  );
};

export default Home;
