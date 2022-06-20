import { createContext, useContext, useState } from "react";

const StateValues = createContext();
const StateFunctions = createContext();

export const useStateValues = () => useContext(StateValues);
export const useStateFunctions = () => useContext(StateFunctions);

const StateContext = ({ children }) => {

    const [terms, setTerms] =  useState([
        { title: 'Term 1', id: 'term1', gpa: 0 },
        { title: 'Term 2 ', id: 'term2', gpa: 0 },
        { title: 'Term 3', id: 'term3', gpa: 0 }
    ]);
    const [selectedTerm, setSelectedTerm] = useState({});

    const [subjects, setSubjects] = useState([]);
    const [selectedTermSubjects, setSelectedTermSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState({});

    const [topics, setTopics] = useState([]);

    const [selectedSubjectTopics, setSelectedSubjectTopics] = useState([]);

    const [finalGPA, setFinalGPA] = useState(0);

    const StateValuesEncapsulator = {
        terms, selectedTerm, subjects, selectedTermSubjects, 
        selectedSubject, topics, selectedSubjectTopics, finalGPA
    }

    const StateFunctionsEncapsulator = {
        setTerms, setSelectedTerm, setSubjects,
        setSelectedTermSubjects, setSelectedSubject,
        setTopics, setSelectedSubjectTopics, setFinalGPA
    }

    return (
        <StateValues.Provider value={StateValuesEncapsulator}>
            <StateFunctions.Provider value={StateFunctionsEncapsulator}>
                {children}
            </StateFunctions.Provider>
        </StateValues.Provider>
    )
}

export default StateContext;