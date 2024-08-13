import NavBar from "./NavBar.jsx";

function Container({ children }) {
  return (
    <div className="w-full min-h-screen flex">
      <NavBar />
      <main className="w-full h-full min-h-screen p-4 flex-grow flex justify-center items-center">
        {children}
      </main>
    </div>
  );
}

export default Container;
