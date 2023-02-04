import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { baseUrl } from '../utils/constants';
import CustomField from './CustomField';

const UserForm = ({children: client}) => {

    const navigate = useNavigate();

    const newClientSchema = Yup.object().shape({
        name: Yup.string()
                .required('El nombre es obligatorio')
                .min(3, "El nombre es muy corto")
                .max(20, "El nombre es muy largo"),
        company: Yup.string()
                .required('El nombre de la empresa es obligatorio')
                .max(40, "El nombre es muy largo"),
        email: Yup.string()
                .required('El email es obligatorio')
                .email('No cumple con el formato de un email'),
        phone: Yup.number()
            .typeError('El teléfono no es valido')
            .integer("No se permiten números decimales")
            .positive("No se permiten números negativos")
            .min(10000000, 'Teléfono muy corto')
            .max(9999999999, 'Teléfono muy largo'),
        notes: Yup.string()
            .max(400, "Excedió el número de caracteres permitido")
    });

    const addClient = async (values, resetForm) => {
        try {
            const url = `${baseUrl}clients`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            const result = await response.json();
            console.log(result);
            if(response.status != 201) return; 
            resetForm();
            navigate('/clients');
        } catch (error) {
            console.log(error);
        }
    }

    const editClient = async (values, resetForm) => {
        try {
            const url = `${baseUrl}clients/${client.id}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            const result = await response.json();
            console.log(result);
            if(response.status != 200) return; 
            resetForm();
            navigate('/clients');
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (values, {resetForm}) => {
        if(client.id){
            editClient(values, resetForm);
        } else {
            addClient(values, resetForm);
        }
    };

    const isEdit = client?.id ? true : false;

    return (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{ isEdit ? 'Editar cliente' : 'Agregar cliente'}</h1>
            <Formik
                initialValues={client}
                enableReinitialize={true}
                validationSchema={newClientSchema}
                onSubmit={ handleSubmit }
            >{() => {
                
                return (<Form>
                    <CustomField
                        id='name'
                        name='Nombre'
                        type='text'
                        placeholder='Nombre del cliente'
                    />
                    <CustomField
                        id='company'
                        name='Empresa'
                        type='text'
                        placeholder='Empresa del cliente'
                    />
                    <CustomField
                        id='email'
                        name='E-mail'
                        type='email'
                        placeholder='E-mail del cliente'
                    />
                    <CustomField
                        id='phone'
                        name='Teléfono'
                        type='tel'
                        placeholder='Teléfono del cliente (opcional)'
                    />
                    <CustomField
                        id='notes'
                        name='Notas'
                        type='textarea'
                        placeholder='Notas del cliente (opcional)'
                    />
                    <input type='submit' value={isEdit ? 'Guardar cambios' : 'Agregar cliente'} className='mt-5 w-full bg-blue-800 p-3 text-white font-bold uppercase text-lg'/>
                </Form>)
            }}
            </Formik>
        </div>
    )
}

UserForm.defaultProps = {
    client: {
        name: '',
        company: '',
        email: '',
        phone: '',
        notes: ''
    }
}

export default UserForm