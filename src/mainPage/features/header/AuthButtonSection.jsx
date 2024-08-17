import openModal from "@common/modal/openModal.js";
import AuthModal from "@main/auth/AuthModal.jsx";
import WelcomeModal from "@main/auth/Welcome";
import useAuthStore from "@main/auth/store.js";

function AuthButtonSection() {
  const isLogin = useAuthStore((store) => store.isLogin);
  const userName = useAuthStore((store) => store.userName);

  const welcomeModal = <WelcomeModal />;
  const authModal = (
    <AuthModal onComplete={(isFreshMember) => isFreshMember && openModal(welcomeModal)} />
  );

  if (isLogin)
    return <div className="text-body-s lg:text-body-m text-black">{userName}님 환영합니다.</div>;

  return (
    <button
      onClick={() => openModal(authModal)}
      className="lg:right-[2.875rem] bg-blue-400 text-white text-body-s py-3 px-4"
    >
      본인인증하기
    </button>
  );
}

export default AuthButtonSection;
