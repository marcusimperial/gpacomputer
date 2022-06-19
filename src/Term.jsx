import { useState } from "react";
import { MdKeyboardArrowDown } from 'react-icons/md';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import Subject from './Subject';
import { useEventFunctions } from "./Context/EventContext";
import { useStateValues } from "./Context/StateContext";

const Term = ({ data }) => {
    const [update, setUpdate] = useState(false);
    const handleFocus = (e) => e.target.select();
    const handleSave = (e) => {
        if (e.keyCode === 13 || e.type === 'blur') setUpdate(false);
    }

    const { handleTermAdd, handleTermUpdate, handleTermDelete, handleTermClick, handleTermChange } = useEventFunctions();
    const { selectedTermSubjects, selectedTerm } = useStateValues();

    return (
        <div className="card background-white">
            <div className="component">
                <div className="icon">
                <button id={data.id} onClick={handleTermDelete}><AiFillMinusCircle className="size" /></button>
                </div>
                <div className="main">
                    {
                        update ? <input type="text" id={data.id} value={data.title} onChange={handleTermUpdate} onBlur={handleSave} onKeyUp={handleSave} onFocus={handleFocus} autoFocus />
                        : <h1 className="large" id={data.id} onDoubleClick={() => setUpdate(true)}>{data.title} (GPA: {data.gpa})</h1>
                    }
                    <div className="input">
                        <h1 className="medium">Term GPA</h1>
                        <input type="text" id={data.id} value={data.gpa} onChange={handleTermChange} onFocus={handleFocus} />
                    </div>
                </div>  
                <div className="icon">
                    <button id={data.id} onClick={handleTermClick}><MdKeyboardArrowDown className="size" /></button>
                </div>
            </div>

            <div className="children">
                <div className="icon">
                    <button id={data.id} onClick={handleTermAdd}><AiFillPlusCircle className="size" /></button>
                </div>
                <div>
                    {data.id === selectedTerm.id && selectedTermSubjects.map(data => (<Subject key={data.id} data={data} />))}
                </div>
            </div>

        </div>
    )
}

export default Term