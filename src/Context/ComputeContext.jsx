import { createContext, useContext, useEffect } from "react";
import { useStateFunctions, useStateValues } from "./StateContext";

const ComputeFunctions = createContext();

export const useComputeFunctions = () => useContext(ComputeFunctions);

const ComputeContext = ({ children }) => {

    const {
        terms, selectedTerm, subjects, selectedTermSubjects, 
        selectedSubject, topics, selectedSubjectTopics
    } = useStateValues();

    const {
        setTerms, setSubjects, setSelectedTermSubjects, setSelectedSubject,
        setTopics, setSelectedSubjectTopics, setFinalGPA
    } = useStateFunctions();

    const round = (int) => Number(`${Math.round(`${int}e2`)}e-2`);
    const convertNumericToletter = (int) => {
        if (int >= 4.1) return 'A+';
        else if (int >= 3.75) return 'A';
        else if (int >= 3.25) return 'A-';
        else if (int >= 2.75) return 'B'; 
        else if (int >= 2.25) return 'B-';
        else if (int >= 1.75) return 'C';
        else if (int >= 1.25) return 'D';
        else if (int >= 0.75) return 'F';
        else return 'FF';
    }

    const indexes = {
        'A+': 4.2, 'A': 4.0, 'A-': 3.5, 
        'B': 3.0, 'B-': 2.5, 'C': 2.0,
        'D': 1.5, 'F': 1.0, 'FF': 0.0, 
    }

    const getDataFromStorage = () => {
        console.log('DATA FROM STORAGE');
        const terms = localStorage.getItem('terms');
        const subjects = localStorage.getItem('subjects');
        const topics = localStorage.getItem('topics');

        const parsedTerms = JSON.parse(terms);
        const parsedSubjects = JSON.parse(subjects);
        const parsedTopics = JSON.parse(topics);
        console.log(typeof parsedTerms);


        if (terms) setTerms([...parsedTerms]);
        if (subjects) setSubjects(parsedSubjects);
        if (topics) setTopics(parsedTopics);

        console.log('terms', terms);
        console.log('subjects', subjects);
        console.log('topics', topics);

        filterSubjects();
    }
    useEffect(getDataFromStorage, []);

    const saveDataToStorage = () => {
        console.log('SAVING DATA TO STORAGE --')
        localStorage.setItem('terms', JSON.stringify(terms));
        localStorage.setItem('subjects', JSON.stringify(subjects));
        localStorage.setItem('topics', JSON.stringify(topics));
    }

    useEffect(saveDataToStorage, [terms, subjects, topics]);

    const calculateTermGpa = () => {
        let totalUnits = 0;
        let total = 0;
        for (const { grade, units } of selectedTermSubjects) {
            totalUnits = totalUnits + parseFloat(units);
            total = total + ((indexes[`${grade}`] || 0.0) * parseFloat(units));
        }
        let array = [...terms];
        const index = array.findIndex(term => term.id === selectedTerm.id);
        if (index > -1) array[index].gpa = round(total/totalUnits);
        setTerms(array);
    }

    useEffect(calculateTermGpa, [subjects]);

    const calculateFinalGpa = () => {
        let sum = 0;
        for (const { gpa } of terms) sum = parseFloat(gpa) + sum;
        setFinalGPA(round(sum / terms.length));
    }

    useEffect(calculateFinalGpa, [terms]);

    const calculateSubjectGrade = () => {
        let numeric = 0;
        for (const { grade, percent } of selectedSubjectTopics) numeric = numeric + ((indexes[`${grade}`] || 0.0) * percent);
        let array = [...subjects];
        const index = array.findIndex(subject => subject.id === selectedSubject.id);
        if (index > -1) array[index].grade = convertNumericToletter(numeric);
        setSubjects(array);
    }
   
    useEffect(calculateSubjectGrade, [topics]);

    const filterSubjects = () => {
        setSelectedTermSubjects(subjects.filter(subject => subject.term === selectedTerm.id));
        // if the selected subjects are not in the selected term, remove
        if (selectedSubject.term !== selectedTerm.id) setSelectedSubject({});
    }

    useEffect(filterSubjects, [selectedTerm, subjects]);

    const filterTopics = () => setSelectedSubjectTopics(topics.filter(topic => topic.subject === selectedSubject.id));

    useEffect(filterTopics, [selectedSubject, topics]);

    const ComputeFunctionsEncapsulator = {

    }
    return (
        <ComputeFunctions.Provider value={ComputeFunctionsEncapsulator}>
            {children}
        </ComputeFunctions.Provider>
    )
}

export default ComputeContext;