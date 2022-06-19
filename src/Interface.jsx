import { useStateValues } from './Context/StateContext';
import Term from './Term';

const Interface = () => {
    const { terms,  finalGPA } = useStateValues();

    return (
        <>
            <h1 className='center'>Final Gpa: {finalGPA} </h1>  
            {terms.map(data => (<Term key={data.id} data={data} />))}
        </>
    )
}

export default Interface