import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../context/authContext";

const baseLinkClasses =
  "text-sm font-medium transition-colors duration-150 px-2 py-1";
const activeLinkClasses =
  "text-emerald-300 border-b-2 border-emerald-400";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }
  return (
    <header className="bg-slate-950/90 text-slate-50 border-b border-slate-800">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 font-bold">
            C
          </span>
          <span>CarHub</span>
        </NavLink>

        
        <div className="flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseLinkClasses} ${
                isActive ? activeLinkClasses : "text-slate-200 hover:text-emerald-300"
              }`
            }
          >
            Home
          </NavLink>
            
          <NavLink
            to="/cars"
            className={({ isActive }) =>
              `${baseLinkClasses} ${
                isActive ? activeLinkClasses : "text-slate-200 hover:text-emerald-300"
              }`
            }
          >
            Cars
          </NavLink>
           {isAuthenticated && (
          <NavLink
            to="/create"
            className={({ isActive }) =>
              `${baseLinkClasses} ${
                isActive ? activeLinkClasses : "text-slate-200 hover:text-emerald-300"
              }`
            }

          >
            Create Car
          </NavLink>
           )}
        </div>

        
        <div className="flex items-center gap-3 text-sm">
          {!isAuthenticated ? (
             <>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `rounded-full border border-slate-600 px-3 py-1 text-xs font-medium 
               hover:border-emerald-400 hover:text-emerald-300 ${
                 isActive ? "border-emerald-400 text-emerald-300" : "text-slate-200"
               }`
            }
          >
            Log in
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              `rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-slate-900 
               hover:bg-emerald-400 ${
                 isActive ? "ring-2 ring-emerald-300" : ""
               }`
            }
          >
            Register
          </NavLink>
          </>
          ) : (
            <> 
             <span className="text-xs text-slate-300 italic">
                {user?.email}
              </span>
            
              <NavLink
      to="/profile"
      className={({ isActive }) =>
        `${baseLinkClasses} ${
          isActive
            ? activeLinkClasses
            : "text-slate-200 hover:text-emerald-300"
        }`
      }
    >
      Profile
    </NavLink>

            <button
              onClick={handleLogout}
              className="rounded-full border border-slate-600 px-3 py-1 text-xs font-medium 
                         text-slate-200 hover:border-red-400 hover:text-red-300"
            >
              Logout
            </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
