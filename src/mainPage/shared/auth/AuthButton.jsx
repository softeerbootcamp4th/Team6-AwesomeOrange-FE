import openModal from "@common/modal/openModal.js";
import AuthModal from "./AuthModal.jsx";
import WelcomeModal from "./Welcome";
import LogoutModal from "./Logout/LogoutConfirmModal.jsx";
import useAuthStore from "./store.js";
import useDrawEventStore from "@main/drawEvent/store.js";

function AuthButton() {
  const isLogin = useAuthStore((store) => store.isLogin);
  const userName = useAuthStore((store) => store.userName);
  const setCurrentJoin = useDrawEventStore((store)=>store.setCurrentJoin);

  const welcomeModal = <WelcomeModal />;
  const authModal = (
    <AuthModal onComplete={(isFreshMember) => isFreshMember && openModal(welcomeModal)} />
  );
  const logoutModal = <LogoutModal onLogout={()=>setCurrentJoin(false)} />;

  if (isLogin)
    return <button 
      onClick={()=>openModal(logoutModal)} 
      aria-label="로그아웃하기"
      className="text-body-s lg:text-body-m text-black overflow-hidden py-3 px-2 relative group/button"
    >
      {userName}님 환영합니다.
      <div className="absolute top-0 left-0 w-full h-full bg-blue-400 text-white flex justify-center items-center translate-x-full transition-transform group-hover/button:translate-x-0 group-focus/button:translate-x-0">
        로그아웃
      </div>
    </button>;

  return (
    <button
      onClick={() => openModal(authModal)}
      className="lg:right-[2.875rem] bg-blue-400 text-white text-body-s py-3 px-4"
    >
      본인인증하기
    </button>
  );
}

export default AuthButton;
