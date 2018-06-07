import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <div className="white">
      <div className="f3 center">{`${name}, Your current rank is:`}</div>
      <div className="f1 center">{entries}</div>
    </div>
  );
};

export default Rank;
