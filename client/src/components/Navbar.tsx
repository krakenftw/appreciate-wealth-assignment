import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 px-10 bg-white text-black">
      <div className=" text-2xl font-bold">
        <Link to="/">Fruit.ai</Link>
      </div>
      <div>
        <Link to="/login" className=" text-lg">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
