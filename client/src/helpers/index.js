import React from 'react';

// time - in seconds
const elapsedTime = (time) => {
  if (time === 0) return <div className="add-time">00:00:00</div>;
  const S = `${time % 60} sec `;
  const H = time < 3600 ? '' : `${~~(time / 3600)} h `;
  const M = time < 60 ? '' : `${~~((time % 3600) / 60)} min `;

  return (
    <div className="add-time">
      {H} {M} {S}
    </div>
  );
};

export default elapsedTime;
