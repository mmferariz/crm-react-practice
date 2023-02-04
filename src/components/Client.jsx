import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { baseUrl } from "../utils/constants";

const Client = ({children}) => {

    const navigate = useNavigate(); 

    const handleDelete = async id => {
        const result = await Swal.fire({
            title: '¿Seguro que desea eliminar el usuario?',
            text: "Esta acción no se se podrá deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, estoy seguro.'
        })
        if(!result.isConfirmed) return;
        try {
            const url = `${baseUrl}clients/${id}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const result = await response.json();
            console.log(result);
            if(response.status != 200) return; 
            // navigate('/clients');
        } catch (error) {
            console.log(error);
        }
    };

    const {name, company, email, phone, notes, id} = children;

    return (
        <tr className="border-b hover:bg-gray-200">
            <td className="p-3">{name}</td>
            <td className="p-3">
                <p><span className="text-gray-800 uppercase font-bold">Email: </span>{email}</p>
                <p><span className="text-gray-800 uppercase font-bold">Teléfono: </span>{phone}</p>
            </td>
            <td className="p-3">{company}</td>
            <td className="p-3">
                <button 
                    type="button"
                    className="bg-green-600 block hover:bg-green-800 w-full text-white p-2 uppercase font-bold text-xs" 
                    onClick={() => navigate(`${id}`)}
                >Ver</button>
                <button 
                    type="button"
                    className="bg-blue-600 block hover:bg-blue-800 w-full text-white p-2 uppercase font-bold text-xs mt-3" 
                    onClick={() => navigate(`edit/${id}`)}
                >Editar</button>
                <button 
                    className="bg-red-600 block hover:bg-red-800 w-full text-white p-2 uppercase font-bold text-xs mt-3" 
                    type="button"
                    onClick={() => handleDelete(id)}
                >Eliminar</button>
            </td>
        </tr>
    )
}

export default Client