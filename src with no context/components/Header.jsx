import logo from "../assets/react.svg";
function Header() {
  return (
    <header className=" flex items-center space-between mb-16 lg:w-[66rem] ">
     
      <img src={logo} alt="React logo"  className="lg:w-[14rem] w-[8rem]"/>
      <h1 className="lg:text-[5.7rem] text-[4rem]">The React Quiz</h1>
    </header>
  );
}

export default Header;
