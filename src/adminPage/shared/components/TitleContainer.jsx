function TitleContainer({ children }) {
  return (
    <div className="flex w-full justify-between sticky top-4 bg-white z-20 after:w-full after:h-5 after:-top-4 after:-z-10 after:absolute after:bg-white">
      { children }
    </div>
  );
}

export default TitleContainer;