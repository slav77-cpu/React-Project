import { Link, NavLink } from "react-router";

export default function Header() {
    const baseLinkClasses =
    "text-sm font-medium hover:text-emerald-400 transition-colors";
    const activeLinkClasses = "text-emerald-400";
    return (
    <header className="bg-slate-900 text-slate-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 font-bold">
            C
          </span>
          <span>CarHub</span>
        </NavLink>

        {/* Main navigation */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseLinkClasses} ${
                isActive ? activeLinkClasses : "text-slate-200"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              `${baseLinkClasses} ${
                isActive ? activeLinkClasses : "text-slate-200"
              }`
            }
          >
            Catalog
          </NavLink>
            <NavLink 
            to='/create'
            className={({ isActive }) =>
                `${baseLinkClasses} ${
                    isActive ? activeLinkClasses : "text-slate-200"
                }`
                }
                >
                Create Car
                </NavLink>
        </div>

        {/* Auth navigation */}
        <div className="flex items-center gap-3 text-sm">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `rounded-full border border-slate-500 px-3 py-1 text-xs font-medium hover:border-emerald-400 hover:text-emerald-300 ${
                isActive ? "border-emerald-400 text-emerald-300" : ""
              }`
            }
          >
            Log in
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              `rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-slate-900 hover:bg-emerald-400 ${
                isActive ? "ring-2 ring-emerald-300" : ""
              }`
            }
          >
             Register
          </NavLink>
        </div>
      </nav>
    </header>
  );
  
}