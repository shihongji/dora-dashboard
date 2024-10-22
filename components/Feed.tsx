'use client';
import React, { useState, useEffect } from 'react';
// Define the structure of each advice
interface Advice {
  count?: number;
  time: string;
  type: string;
  details: string;
}
const adviceData: Advice[] = [
  {
    time: "第三节 05:35:12",
    type: "换人",
    details: "对方外线后卫球员（5号 胡明轩）移动速度/体能下降，上3号增加突破得分及外线三分投射。"
  },
  {
    time: "第三节 04:35:01",
    type: "战术建议",
    details: "对方风险球员 内线出手困难，寻求外线出手。根据历史数据，可适当放投。"
  },
  {
    time: "第二节 07:12:33",
    type: "换人",
    details: "内线球员防守吃紧，上4号加强篮板保护，同时增加防守端的高度。"
  },
  {
    time: "第二节 03:48:55",
    type: "战术建议",
    details: "全队传球不流畅，建议加强三角进攻战术，增加跑动掩护，创造外线投篮机会。"
  },
  {
    time: "第四节 06:20:14",
    type: "换人",
    details: "对方3号球员三分命中率下降，换上5号加强外线防守，减少三分机会。"
  },
  {
    time: "第四节 03:12:09",
    type: "战术建议",
    details: "对方禁区防守松懈，建议快速突入内线，抢得高质量出手机会。"
  },
  {
    time: "第一节 09:22:40",
    type: "战术建议",
    details: "对方防守压迫性不强，可尝试利用快速突破形成人数优势，抢得前场篮板。"
  },
  {
    time: "第一节 05:47:16",
    type: "换人",
    details: "对方内线5号球员因犯规问题下场，上7号加强内线进攻，利用身高优势造犯规。"
  },
  {
    time: "第二节 08:50:21",
    type: "战术建议",
    details: "对方外线防守薄弱，利用挡拆创造三分机会，适当调整传球速度，制造空位。"
  },
  {
    time: "第三节 01:30:45",
    type: "换人",
    details: "对方主力体能下降，建议换上替补5号，减少消耗的同时保持攻防强度。"
  },
  {
    time: "第四节 02:25:10",
    type: "战术建议",
    details: "对方全场紧逼防守，建议增加空切配合，快速转移球打破防线，减少失误。"
  },
  {
    time: "第二节 06:15:32",
    type: "换人",
    details: "外线防守需要加强，换上2号，提升防守速度和压力，封锁对方三分射手。"
  }
];

const Feed = () => {
  const [adviceList, setAdviceList] = useState<Advice[]>([]);

  useEffect(() => {
    // Simulating dynamically pushed AI advice with a time interval
    const interval = setInterval(() => {
      // push the count into the new advice

      const newAdvice = generateRandomAdvice(); // Simulate new advice
      setAdviceList((prevAdviceList) => {
        // Limit the number of advices to 20
        const updatedAdvice = [newAdvice, ...prevAdviceList];
        if (updatedAdvice.length > 20) {
          return updatedAdvice.slice(0, 20); // Keep only the latest 20 items
        }
        return updatedAdvice;
      });
    }, 8000); // Every 5 seconds, push new advice

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const generateRandomAdvice = () => {
    const advices = adviceData;

    // Randomly pick an advice from the list
    return advices[Math.floor(Math.random() * advices.length)];
  };

  return (
    <div className="bg-gray-200 p-4 mt-4 h-80 overflow-y-auto">
      <h2>Feed</h2>
      <div className="mt-2">
        {adviceList.length === 0 ? (
          <p>No advice yet...</p>
        ) : (
          <ul className="list-none">
            {adviceList.map((advice, index) => (
              <li key={index} className="mb-4">
                <span className="text-gray-500">{advice?.count}[?]</span> -
                <span className="text-blue-500 font-semibold">{advice.time}</span> - 
                <span className="text-red-500 font-bold ml-2">{advice.type}</span> - 
                <span className="ml-2">{advice.details}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Feed;