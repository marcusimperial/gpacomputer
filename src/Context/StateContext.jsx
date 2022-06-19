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

    const [subjects, setSubjects] = useState([
        { name: 'Math', units: 1, id: 'math', term: 'term1' },
        { name: 'Math 2', units: 2, id: 'math2', term: 'term1' },
        { name: 'Math 3', units: 3, id: 'math3', term: 'term1' },
        { name: 'English', units: 1, id: 'english', term: 'term2' }
    ]);
    const [selectedTermSubjects, setSelectedTermSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState({});

    const [topics, setTopics] = useState([
        { name: 'Linear func', percent: 0.4, id: 'linearfunc', subject: 'math2' },
        { name: 'Algebra I', percent: 0.6, id: 'algebra', subject: 'math2' },
        { name: 'Algebra II', percent: 0.6, id: 'algebra', subject: 'math1' },
    ]);

    const [selectedSubjectTopics, setSelectedSubjectTopics] = useState([]);

    const [finalGPA, setFinalGPA] = useState([]);

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