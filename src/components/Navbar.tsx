import Link from "next/link";

function Navbar() {
  return (
      <nav className={"border-b border-gray-200 bg-white"}>
          <div className={"max-w-4xl mx-auto px-8 py-4 flex items-center justify-between"}>
              <Link href={"/"} className={"text-xl font-bold text-gray-900"}>My blog</Link>
              <div className={"flex items-center gap-6"}>
                  <Link href={"/blog"} className={"text-gray-600 hover:text-black transition-colors"}>Blog</Link>
                  <Link href={"/login"} className={"text-gray-600 hover:text-black transition-colors"}>Login</Link>
                  <Link href={"/dashboard"} className={"bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors"}>Dashboard</Link>
              </div>
          </div>
      </nav>
  );
}

export default Navbar;