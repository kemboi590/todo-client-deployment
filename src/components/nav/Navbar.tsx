import logo from '../../assets/images/logo.png';
import { NavLink } from 'react-router';
import { type RootState } from '../../app/store';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const userrole = useSelector((state: RootState) => state.user.user?.role);
    const userToken = useSelector((state: RootState) => state.user.token);
    const isAdmin = userrole === 'admin';
    const isUser = userrole === 'user';
    return (
        <div>
            <div className="navbar bg-gray-300 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" data-test="todo-mobile-menu-bars">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        {/* Mobile devices */}
                        <ul
                            // tabIndex={0}
                            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow text-base-content bg-gray-700 h-[60vh]"
                            data-test="todo-ul-menu">
                            <ul className="menu  px-1">
                                <li className="font-bold text-lg">
                                    <NavLink to="/" data-test="mobile-nav-home">Home</NavLink>
                                    {/* <a href="/"></a> */}
                                </li>
                                <li className="font-bold text-lg">
                                    <NavLink to="/about" data-test="mobile-nav-about">About</NavLink>
                                </li>

                                <li className="font-bold text-lg">
                                    <NavLink to={isAdmin ? "/admin/dashboard/todos" : isUser ? "/user/dashboard/todos" : "/dashboard/analytics"} data-test="mobile-nav-dashboard">
                                        Dashboard
                                    </NavLink>
                                </li>
                                {!userToken && (
                                    <>
                                        <li className="font-bold text-lg">
                                            <NavLink to="/register" data-test="mobile-nav-register">Register</NavLink>
                                        </li>
                                        <li className="font-bold text-lg">
                                            <NavLink to="/login" data-test="mobile-nav-login">Login</NavLink>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </ul>
                    </div>

                    {/* Desktop */}
                    <img src={logo} alt="" className="w-16 ml-8 hidden sm:block " />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 ">
                        <li className="font-bold text-lg">
                            <NavLink to="/" data-test="desktop-nav-home">Home</NavLink>
                        </li>
                        <li className="font-bold text-lg">
                            <NavLink to="/about" data-test="desktop-nav-about">About</NavLink>
                        </li>
                        {userToken && (
                            <li className="font-bold text-lg">
                                <NavLink to={isAdmin ? "/admin/dashboard/todos" : isUser ? "/user/dashboard/todos" : "/dashboard/analytics"} data-test="desktop-nav-dashboard">
                                    Dashboard
                                </NavLink>
                            </li>
                        )}

                    </ul>
                </div>
                <div className="navbar-end">
                    <div className='flex gap-4 mr-4'>
                        {!userToken && (
                            <>
                                <li className="font-bold text-lg list-none">
                                    <NavLink to="/register" data-test="desktop-nav-register">Register</NavLink>
                                </li>
                                <li className="font-bold text-lg list-none">
                                    <NavLink to="/login" data-test="desktop-nav-login">Login</NavLink>
                                </li>
                            </>
                        )}
                    </div>
                    <a className="btn">Profile</a>
                </div>
            </div >
        </div >
    )
}

export default Navbar