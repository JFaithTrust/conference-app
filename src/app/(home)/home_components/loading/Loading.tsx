import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <div className="spinnerContainer">
      <div className="spinner"></div>
      <div className="loader">
        <p>Yuklanmoqda</p>
        <div className="words">
          <span className="word">maqolalar</span>
          <span className="word">foydalanuvchilar</span>
          <span className="word">muharrirlar</span>
          <span className="word">konferensiyalar</span>
          <span className="word">yo&apos;nalishlar</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
