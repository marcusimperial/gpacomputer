import { useState } from "react";
const Topic = ({ data, onChange, onDelete, onNameUpdate, onPercentUpdate }) => {
    const [updateName, setUpdateName] = useState(false);
    const [updatePercent, setupdatePercent] = useState(false);
    const handleFocus = (e) => e.target.select();
    const handleNameSave = (e) => {
        if (e.keyCode === 13 || e.type === 'blur') setUpdateName(false);
    }
    const handlePercentSave = (e) => {
        if (e.keyCode === 13 || e.type === 'blur') setupdatePercent(false);
    }
    return (
        <div className="test">
            {
                updateName ? <input type="text" id={data.id} value={data.name} onChange={onNameUpdate} onBlur={handleNameSave} onKeyUp={handleNameSave} onFocus={handleFocus} autoFocus />
                : <h2 id={data.id} onDoubleClick={() => setUpdateName(true)}>{data.name} (Grade: {data.grade})</h2>
            }
            {
                updatePercent ? <input type="text" id={data.id} value={data.percent} onChange={onPercentUpdate} onBlur={handlePercentSave} onKeyUp={handlePercentSave} onFocus={handleFocus} autoFocus />
                : <h2 id={data.id} onDoubleClick={() => setupdatePercent(true)}>Percent: {data.percent*100}%</h2>
            }
            <input type="text" name="" id={data.id} onChange={onChange} onFocus={handleFocus}/>
            <button id={data.id} onClick={onDelete}>Delete</button>
        </div>
    )
}

export default Topic