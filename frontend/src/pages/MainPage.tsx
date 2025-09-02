import React from "react";

function MainPage() {
  return (
    <div>
      Strona główna :)
      <div className="flex items-center justify-center w-full text-lg text-red-700">
        {localStorage.getItem("userId") + " "}
        {localStorage.getItem("userRole")}
      </div>
    </div>
  );
}

export default MainPage;
