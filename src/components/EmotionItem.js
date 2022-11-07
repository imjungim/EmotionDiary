import React from "react";
//useCallback으로 묶어진 함수가 아니면 컴포넌트가 다시렌더링 -> onClick DiaryEditor
const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
  isSelected,
}) => {
  return (
    <div onClick={()=> onClick(emotion_id)} className={["EmotionItem",
    isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`
    ].join(" ")}>
      <img src={emotion_img} />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default React.memo(EmotionItem);
