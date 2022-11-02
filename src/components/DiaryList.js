import React, { useState } from "react";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  {value : 'all', name : '전부다'},
  {value : 'good', name : '좋은 감정만'},
  {value : 'bad', name : '안 좋은 감정만'},
]

//정렬 컴포넌트
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState('all');
  //정렬함수
  const getProcessedDiaryList = () => {
    //sort 사용시 원본배열 자체가 정렬되어 바뀜 -> 깊은 복사로

    const filterCallBack = (item) => {
      if(filter === 'good'){
        return parseInt(item.emotion) <= 3;
      }else{
        return parseInt(item.emotion) > 3;
      }
    }

    const compare = (a, b) => {
      if(sortType === 'latest'){
        return parseInt(b.date)- parseInt(a.date);
      }else {
        return parseInt(a.date) - parseInt(b.date);
      }
    }
    const copyList = JSON.parse(JSON.stringify(diaryList)) //원본배열(diaryList) =>문자열로 변환 => 다시 배열

    const filteredList = filter === 'all' ? copyList : copyList.filter((it)=>filterCallBack(it));
    const sortedList = filteredList.sort(compare);
    return sortedList;
  }

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />

      <ControlMenu
        value={filter}
        onChange={setFilter}
        optionList={filterOptionList}
      />
      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>{it.content} {it.emotion}</div>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
