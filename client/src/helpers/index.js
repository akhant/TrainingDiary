import React from "react";

const elapsedTime = time => {
  let H = ~~(time / 3600) < 10 ? "0" + ~~(time / 3600) : ~~(time / 3600);
  let M = ~~(time / 60) < 10 ? "0" + ~~(time / 60) : ~~(time / 60);
  let S = time % 60 < 10 ? "0" + (time % 60) : time % 60;
  if (!time) S = "00";
  return (
    <div className="timer_numerals">
      {H} : {M} : {S}
    </div>
  );
};

export default elapsedTime;
