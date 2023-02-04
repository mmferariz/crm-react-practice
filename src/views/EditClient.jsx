import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import UserForm from '../components/UserForm';
import { baseUrl } from '../utils/constants';

const EditClient = () => {

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
  
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      { !loading ? 
        client?.id ? 
          (<>
            <p className="mt-3">{`Utiliza este formulario para modificar los datos del cliente ${client.name}.`}</p>
            <UserForm>{client}</UserForm>
          </>) : 
          <p className="mt-3">El cliente con id '{id}' no se encuentra registrado en el sistema</p> : 
        <Spinner/>
      }
    </>
  )
}

export default EditClient