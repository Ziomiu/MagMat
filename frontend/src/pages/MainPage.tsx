import { useAuth } from "../context/UseAuth.tsx";

function MainPage() {
  const { userId, role } = useAuth();
  return (
    <div>
      Strona główna :)
      <div className=" flex-1 items-center justify-center w-full text-lg text-red-700 overflow-auto">
        {userId}
        <br />
        {role}
      </div>
    </div>
  );
}

export default MainPage;
