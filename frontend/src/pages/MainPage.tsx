import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  return (
    <div>
      Strona główna :)
      <div className="flex items-center justify-center w-full text-lg text-red-700">
        {localStorage.getItem("userId") + " "}
        {localStorage.getItem("userRole")}
      </div>
      <div className="flex items-center justify-center w-full">
        <button
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
          onClick={() => {
            localStorage.removeItem("userId");
            localStorage.removeItem("userRole");
            navigate("/login");
          }}
        >
          Wyloguj
        </button>
      </div>
    </div>
  );
}

export default MainPage;
