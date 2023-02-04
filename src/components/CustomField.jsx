import {Field, ErrorMessage} from 'formik';

const CustomField = ({id, type, name, placeholder}) => {
  return (
    <div className='mb-4'>
        <label className='text-gray-800' htmlFor={id}>{name}</label>
        <Field
            id={id}
            name={id}
            className={`mt-2 block w-full p-3 bg-gray-50 ${type === 'textarea' ? 'h-40' : ''}`}
            type={type}
            placeholder={placeholder}
            as={type === 'textarea' ? 'textarea' : 'input'}
        />
        <ErrorMessage name={id} component='div' className='bg-red-700 text-center my-4 text-white font-bold p-2 uppercase'/>
    </div>
  )
}

export default CustomField