import { useState } from "react";
import { MdKeyboardArrowDown } from 'react-icons/md';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import Topic from './Topic';
import { useEventFunctions } from "./Context/EventContext";
import { useStateValues } from "./Context/StateContext";

const Subject = ({ data }) => {
    const [updateName, setUpdateName] = useState(false);
    const [updateUnits, setUpdateUnits] = useState(false);
    const handleFocus = (e) => e.target.select();
    const handleNameSave = (e) => {
        if (e.keyCode === 13 || e.type === 'blur') setUpdateName(false);
    }
    const handleUnitsSave = (e) => {
        if (e.keyCode === 13 || e.type === 'blur') setUpdateUnits(false);
    }

    const { 
        handleSubjectAdd, handleSubjectNameChange, handleSubjectUnitsChange, 
        handleSubjectDelete, handleSubjectClick, handleSubjectChange 
    } = useEventFunctions();

    const { selectedSubjectTopics, selectedSubject } = useStateValues();

    return (
        <div className="card background-white">
            <div className="component">
                <div className="icon">
                    <button id={data.id} onClick={handleSubjectDelete}><AiFillMinusCircle className="size" /></button>
                </div>
                <div className="main">
                    <div className="title">
                        {
                            updateName ? <input type="text" id={data.id} value={data.name} onChange={handleSubjectNameChange} onBlur={handleNameSave} onKeyUp={handleNameSave} onFocus={handleFocus} autoFocus />
                            : <h1 className="large" id={data.id} onDoubleClick={() => setUpdateName(true)}>{data.name}</h1>
                        }
                        {
                            updateUnits ? <input type="text" id={data.id} value={data.units} onChange={handleSubjectUnitsChange} onBlur={handleUnitsSave} onKeyUp={handleUnitsSave} onFocus={handleFocus} autoFocus />
                            : <h1 id={data.id} className="medium italic" onDoubleClick={() => setUpdateUnits(true)}>Units: {data.units}</h1>
                        }
                    </div>
                    <div className="input">
                        <h1 className="medium">Subject Grade</h1>
                        <input type="text" id={data.id} value={data.grade} onChange={handleSubjectChange} onFocus={handleFocus} />
                    </div>
                </div>  
                <div className="icon">
                    <button id={data.id} onClick={handleSubjectClick}><MdKeyboardArrowDown className="size" /></button>
                </div>
            </div>

            <div className="children">
                <div className="icon">
                    <button id={data.id} onClick={handleSubjectAdd}><AiFillPlusCircle className="size" /></button>
                </div>
                <div>
                    {data.id === selectedSubject.id && selectedSubjectTopics.map(data => (<Topic key={data.id} data={data} />))}
                </div>
            </div>
        </div>
    )
}

export default Subject