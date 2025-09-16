function MainPage() {
  return (
    <div>
      Strona główna :)
      <div className=" flex-1 items-center justify-center w-full text-lg text-red-700 overflow-auto">
        {localStorage.getItem("token")}
        <br />
        {localStorage.getItem("userId")}
        <br />
        {localStorage.getItem("role")}
      </div>
    </div>
  );
}

export default MainPage;
