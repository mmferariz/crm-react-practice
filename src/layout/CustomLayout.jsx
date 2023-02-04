import { Link, Outlet, useLocation } from "react-router-dom"

const CustomLayout = () => {

  const location = useLocation();
  const currentPath = location.pathname;
  
  

  return (
    <div className="md:flex md:min-h-screen">

      <div className="md:w-1/4 bg-blue-900 px-5 py-10">
        <h2 className="text-4xl font-black text-center text-white">CRM Clientes</h2>
        <nav className="mt-10">
          <Link to="/clients" className={`${currentPath === '/clients' ? 'text-blue-400' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`}>Clientes</Link>
          <Link to="/clients/new" className={`${currentPath === '/clients/new' ? 'text-blue-400' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`}>Nuevo cliente</Link>
        </nav>
      </div>
      <div className="md:w-3/4 p-8 bg-slate-100 md:h-screen overflow-scroll">
        <Outlet/>
      </div>
    </div>
  )
}

export default CustomLayout