import { useState } from "react";
import { AiFillMinusCircle } from 'react-icons/ai';
import { useEventFunctions } from "./Context/EventContext";

const Topic = ({ data }) => {
    const [updateName, setUpdateName] = useState(false);
    const [updatePercent, setupdatePercent] = useState(false);
    const handleFocus = (e) => e.target.select();
    const handleNameSave = (e) => {
        if (e.keyCode === 13 || e.type === 'blur') setUpdateName(false);
    }
    const handlePercentSave = (e) => {
        if (e.keyCode === 13 || e.type === 'blur') setupdatePercent(false);
    }

    const { handleTopicNameChange, handleTopicPercentChange, handleTopicDelete, handleTopicChange } =  useEventFunctions();

    return (
        <div className="card background-white">
            <div className="component">
                <div className="icon">
                <button id={data.id} onClick={handleTopicDelete}><AiFillMinusCircle className="size" /></button>
                </div>
                <div className="main">
                    <div className="title">
                        {
                            updateName ? <input type="text" id={data.id} value={data.name} onChange={handleTopicNameChange} onBlur={handleNameSave} onKeyUp={handleNameSave} onFocus={handleFocus} autoFocus />
                            : <h1 className="large" id={data.id} onDoubleClick={() => setUpdateName(true)}>{data.name} (Grade: {data.grade})</h1>
                        }
                        {
                            updatePercent ? <input type="text" id={data.id} value={data.percent} onChange={handleTopicPercentChange} onBlur={handlePercentSave} onKeyUp={handlePercentSave} onFocus={handleFocus} autoFocus />
                            : <h1 className="medium italic" id={data.id} onDoubleClick={() => setupdatePercent(true)}>Percent: {data.percent*100}%</h1>
                        }
                    </div>
                    <div className="input">
                        <h1 className="medium">Topic Grade</h1>
                        <input type="text" id={data.id} onChange={handleTopicChange} onFocus={handleFocus} />
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default Topic