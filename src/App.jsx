import './index.css';

import { useState, useEffect } from 'react';
import Term from './Term.jsx';
import Subject from './Subject.jsx';
import Topic from './Topic.jsx'

const App = () => {


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

    const handleTermChange = (e) => {
        let array = [...terms];
        array[array.findIndex(term => term.id === e.target.id)].gpa = e.target.value;
        setTerms(array);
    };
    const handleTermClick = (e) => setSelectedTerm(terms.find(term => term.id === e.target.id));
    const handleSubjectClick = (e) => setSelectedSubject(subjects.find(subject => subject.id === e.target.id));
    const handleSubjectChange = (e) => {
        let array = [...subjects];
        array[array.findIndex(subject => subject.id === e.target.id)].grade = e.target.value;
        setSubjects(array);
    };
    const handleTopicChange = (e) => {
        let array = [...topics];
        array[array.findIndex(topic => topic.id === e.target.id)].grade = e.target.value;
        setTopics(array);
    };
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

    const calculateFinalGpa = () => {
        let sum = 0;
        for (const { gpa } of terms) sum = parseFloat(gpa) + sum;
        setFinalGPA(round(sum / terms.length));
    }

    const calculateSubjectGrade = () => {
        let numeric = 0;
        for (const { grade, percent } of selectedSubjectTopics) numeric = numeric + ((indexes[`${grade}`] || 0.0) * percent);
        let array = [...subjects];
        const index = array.findIndex(subject => subject.id === selectedSubject.id);
        if (index > -1) array[index].grade = convertNumericToletter(numeric);
        setSubjects(array);
    }
    
    useEffect(calculateFinalGpa, [terms]);
    useEffect(calculateTermGpa, [subjects]);
    useEffect(calculateSubjectGrade, [topics]);

    const handleTermDelete = (e) => {
        let array = [...terms];
        array = array.filter(term => term.id !== e.target.id);
        setTerms(array);

        let array2 = [...subjects];
        let array3 = [...topics];
        for (const { id } of array2) array3 = array3.filter(topic => topic.subject !== id);
        array2 = array2.filter(subject => subject.term !== e.target.id);
        setSubjects(array2);
        setTopics(array3);

        // since parent is gone, children are gone
        setSelectedTermSubjects([]);
        setSelectedSubjectTopics([]);
    }

    const handleSubjectDelete = (e) => {
        console.log(e.target.id);
        let array = [...subjects];
        array = array.filter(subject => subject.id !== e.target.id);
        console.log(array);
        setSubjects(array);

        let array2 = [...topics];
        array2 = array2.filter(topic => topic.subject !== e.target.id);
        setTopics(array2);

        let array3 = [...selectedTermSubjects];
        array3 = array3.filter(selectedSubject => selectedSubject.id !== e.target.id);
        setSelectedTermSubjects(array3);

        setSelectedSubjectTopics([]);
    }

    const handleTopicDelete = (e) => {
        let array = [...topics];
        array = array.filter(topic => topic.id !== e.target.id);

        let array2 = [...selectedSubjectTopics];
        array2 = array2.filter(selectedTopic => selectedTopic.id !== e.target.id);
        setSelectedSubjectTopics(array2);
    }

    const handleTermUpdate = (e) => {
        let array = [...terms];
        array[array.findIndex(term => term.id === e.target.id)].title = e.target.value;
        setTerms(array);
    }

    const handleSubjectNameChange = (e) => {
        let array = [...subjects];
        array[array.findIndex(subject => subject.id === e.target.id)].name = e.target.value;
        setSubjects(array);
    }

    const handleSubjectUnitsChange = (e) => {
        let array = [...subjects];
        array[array.findIndex(subject => subject.id === e.target.id)].units = e.target.value;
        setSubjects(array);
    }

    const handleTopicNameChange = (e) => {
        let array = [...topics];
        array[array.findIndex(topic => topic.id === e.target.id)].name = e.target.value;
        setTopics(array);
    }

    const handleTopicPercentChange = (e) => {
        let array = [...topics];
        array[array.findIndex(topic => topic.id === e.target.id)].percent = e.target.value;
        setTopics(array);
    }

    const handleTermAdd = (e) => {
        handleTermClick(e);
        let array = [...subjects];
        array.push({ name: 'New Subject', id: `s${array.length}`, units: 0, term: e.target.id });
        setSubjects(array);
    }

    const handleSubjectAdd = (e) => {
        handleSubjectClick(e);
        let array = [...topics];
        array.push({ name: 'New Topic', id: `t${array.length}`, percent: 0.0, subject: e.target.id });
        setTopics(array);
    }

    const filterSubjects = () => {
        setSelectedTermSubjects(subjects.filter(subject => subject.term === selectedTerm.id));
        // if the selected subjects are not in the selected term, remove
        if (selectedSubject.term !== selectedTerm.id) setSelectedSubject({});
    }

    const filterTopics = () => setSelectedSubjectTopics(topics.filter(topic => topic.subject === selectedSubject.id));

    useEffect(filterSubjects, [selectedTerm, subjects]);
    useEffect(filterTopics, [selectedSubject, topics]);

    return (
        <>
            <h1 className='center'>Final Gpa: {finalGPA} </h1>  
            <div className='display'>
                <div className='display2'>
                    <h1>Terms</h1>
                    {terms.map(data => (<Term onAdd={handleTermAdd} onUpdate={handleTermUpdate} onDelete={handleTermDelete} onClick={handleTermClick} onChange={handleTermChange} data={data} />))}
                </div>
                <div className='display2'>
                    <h1>{selectedTerm.title} Subjects</h1>
                    {selectedTermSubjects.map(data => (<Subject onAdd={handleSubjectAdd} onNameUpdate={handleSubjectNameChange} onUnitsUpdate={handleSubjectUnitsChange} onDelete={handleSubjectDelete} onClick={handleSubjectClick} data={data} onChange={handleSubjectChange} />))}
                </div>
                <div>
                    <h1>{selectedSubject.name} Topics</h1>
                    {selectedSubjectTopics.map(data => (<Topic onNameUpdate={handleTopicNameChange} onPercentUpdate={handleTopicPercentChange} onDelete={handleTopicDelete} data={data} onChange={handleTopicChange} />))}
                </div>
            </div>
        </>
    )
}

export default App