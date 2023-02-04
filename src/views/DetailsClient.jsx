import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Spinner from "../components/Spinner";
import { baseUrl } from "../utils/constants";

const DetailsClient = () => {

  const [client, setClient] = useState({})
  const [loading, setLoading] = useState(false)

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const getClient = async () =>  {
      try {
        const response = await fetch(`${baseUrl}clients/${id}`);
        const result = await response.json()
        if(Object.keys(result).length > 0){
          setClient(result);
        } 
      } catch (error) {
        console.log(error); 
      }
      setLoading(false);
    };
    getClient();
  }, [])
  


  return loading ? <Spinner/> : Object.keys(client).length > 0 ? (
    <>
      <h1 className="font-black text-4xl text-blue-900">Ver cliente {client.name}</h1>
      <p className="mt-3">Información del cliente.</p>

      <div className="mt-10">
        <p className="text-2xl text-gray-600"><span className="text-gray-800 uppercase font-bold">Cliente: </span>{client.name}</p>
        <p className="text-2xl text-gray-600"><span className="text-gray-800 uppercase font-bold">Email: </span>{client.email}</p>
        <p className="text-2xl text-gray-600"><span className="text-gray-800 uppercase font-bold">Teléfono: </span>{client.phone}</p>
        <p className="text-2xl text-gray-600"><span className="text-gray-800 uppercase font-bold">Empresa: </span>{client.company}</p>
        <p className="text-2xl text-gray-600"><span className="text-gray-800 uppercase font-bold">Notas: </span>{client.notes}</p>
      </div>
    </> 
  ) : (<>
    <h1 className="font-black text-4xl text-blue-900">Cliente no encontrado</h1>
      <p className="mt-3">El cliente con id '{id}' no se encuentra registrado en el sistema</p>
  </>)
}

export default DetailsClient