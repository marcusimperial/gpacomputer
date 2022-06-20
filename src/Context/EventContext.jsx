import { createContext, useContext } from "react";
import { useStateFunctions, useStateValues } from "./StateContext";

const EventFunctions = createContext();

export const useEventFunctions = () => useContext(EventFunctions);

const EventContext = ({ children }) => {

    const { terms, subjects, selectedTermSubjects, topics, selectedSubjectTopics } = useStateValues();
    const { setTerms, setSelectedTerm, setSubjects, setSelectedTermSubjects, setSelectedSubject, setTopics, setSelectedSubjectTopics } = useStateFunctions();

    const handleTermClick = (e) => setSelectedTerm(terms.find(term => term.id === e.currentTarget.id));
    const handleSubjectClick = (e) => setSelectedSubject(subjects.find(subject => subject.id === e.currentTarget.id));
    const handleTermChange = (e) => {
        let array = [...terms];
        array[array.findIndex(term => term.id === e.currentTarget.id)].gpa = e.currentTarget.value;
        setTerms(array);
    };
    const handleSubjectChange = (e) => {
        let array = [...subjects];
        array[array.findIndex(subject => subject.id === e.currentTarget.id)].grade = e.currentTarget.value;
        setSubjects(array);
    };
    const handleTopicChange = (e) => {
        let array = [...topics];
        array[array.findIndex(topic => topic.id === e.currentTarget.id)].grade = e.currentTarget.value;
        setTopics(array);
    };

    const confirmation = () => {
        const check = window.confirm("You're about to delete an item. Do you want to continue?");
        if (check) return true;
        return false;
    }
    const handleTermDelete = (e) => {
        const check = confirmation();
        if (!check) return;
        let array = [...terms];
        array = array.filter(term => term.id !== e.currentTarget.id);
        setTerms(array);

        let array2 = [...subjects];
        let array3 = [...topics];
        for (const { id } of array2) array3 = array3.filter(topic => topic.subject !== id);
        array2 = array2.filter(subject => subject.term !== e.currentTarget.id);
        setSubjects(array2);
        setTopics(array3);

        // since parent is gone, children are gone
        setSelectedTermSubjects([]);
        setSelectedSubjectTopics([]);
    }

    const handleSubjectDelete = (e) => {
        const check = confirmation();
        if (!check) return;
        let array = [...subjects];
        array = array.filter(subject => subject.id !== e.currentTarget.id);
        setSubjects(array);

        let array2 = [...topics];
        array2 = array2.filter(topic => topic.subject !== e.currentTarget.id);
        setTopics(array2);

        let array3 = [...selectedTermSubjects];
        array3 = array3.filter(selectedSubject => selectedSubject.id !== e.currentTarget.id);
        setSelectedTermSubjects(array3);

        setSelectedSubjectTopics([]);
    }

    const handleTopicDelete = (e) => {
        const check = confirmation();
        if (!check) return;
        let array = [...topics];
        array = array.filter(topic => topic.id !== e.currentTarget.id);
        setTopics(array);

        let array2 = [...selectedSubjectTopics];
        array2 = array2.filter(selectedTopic => selectedTopic.id !== e.currentTarget.id);
        setSelectedSubjectTopics(array2);
    }

    const handleTermUpdate = (e) => {
        let array = [...terms];
        array[array.findIndex(term => term.id === e.currentTarget.id)].title = e.currentTarget.value;
        setTerms(array);
    }

    const handleSubjectNameChange = (e) => {
        let array = [...subjects];
        array[array.findIndex(subject => subject.id === e.currentTarget.id)].name = e.currentTarget.value;
        setSubjects(array);
    }

    const handleSubjectUnitsChange = (e) => {
        let array = [...subjects];
        array[array.findIndex(subject => subject.id === e.currentTarget.id)].units = e.currentTarget.value;
        setSubjects(array);
    }

    const handleTopicNameChange = (e) => {
        let array = [...topics];
        array[array.findIndex(topic => topic.id === e.currentTarget.id)].name = e.currentTarget.value;
        setTopics(array);
    }

    const handleTopicPercentChange = (e) => {
        let array = [...topics];
        array[array.findIndex(topic => topic.id === e.currentTarget.id)].percent = e.currentTarget.value;
        setTopics(array);
    }

    const handleTermAdd = (e) => {
        handleTermClick(e);
        setSubjects([ ...subjects, { name: 'New Subject', id: `s${subjects.length}`, units: 0, term: e.currentTarget.id } ]);
    }

    const handleSubjectAdd = (e) => {
        handleSubjectClick(e);
        setTopics([ ...topics, { name: 'New Topic', id: `t${topics.length}`, percent: 0.0, subject: e.currentTarget.id }]);
    }

    const EventFunctionsEncapsulator = {
        handleTermClick, handleSubjectClick, handleTermChange, handleSubjectChange,
        handleTopicChange, handleTermDelete, handleSubjectDelete, handleTopicDelete,
        handleTermUpdate, handleSubjectNameChange, handleSubjectUnitsChange, 
        handleTopicNameChange, handleTopicPercentChange, handleTermAdd, handleSubjectAdd 
    }
    return (
        <EventFunctions.Provider value={EventFunctionsEncapsulator}>
            {children}
        </EventFunctions.Provider>
    )
}

export default EventContext;