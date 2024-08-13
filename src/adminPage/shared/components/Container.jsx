import NavBar from "./NavBar.jsx";

function Container({ children }) {
  return (
    <div className="w-full min-h-screen flex">
      <NavBar />
      <div className="w-full h-full min-h-screen flex-grow flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}

export default Container;
