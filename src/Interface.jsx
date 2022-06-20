import { useStateValues } from './Context/StateContext';
import Term from './Term';

const Interface = () => {
    const { terms, finalGPA } = useStateValues();

    return (
        <div className="card background-white">
            <div className="main">
                <h1 className="header">Final GPA: {finalGPA} </h1>  
                <h1 className="large italic">Double click on titles, units, and percentages to edit.</h1>
            </div>
            {terms.map(data => (<Term key={data.id} data={data} />))}
        </div>

    )
}

export default Interface