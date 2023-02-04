import { useEffect, useState } from "react"
import Client from "../components/Client";
import { baseUrl } from "../utils/constants";

const Home = () => {

  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getClients = async () => {
      try {
        const url = `${baseUrl}clients`;
        const response = await fetch(url);
        const result = await response.json();
        setClients(result);
      } catch (error) {
        console.log(error);
      }
    }
    getClients();
  });

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Llena los siguientes campos para registrar un cliente</p>
      
      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead> 
        <tbody>
          {clients.map( e => <Client key={e.id}>{e}</Client>)}
        </tbody>

      </table>
    </>
  )
}

export default Home