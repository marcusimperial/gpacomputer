import { useState } from "react";

const Subject = ({ data, onAdd, onClick, onNameUpdate, onUnitsUpdate, onDelete, onChange }) => {
    const [updateName, setUpdateName] = useState(false);
    const [updateUnits, setUpdateUnits] = useState(false);
    const handleFocus = (e) => e.target.select();
    const handleNameSave = (e) => {
        if (e.keyCode === 13 || e.type === 'blur') setUpdateName(false);
    }
    const handleUnitsSave = (e) => {
        if (e.keyCode === 13 || e.type === 'blur') setUpdateUnits(false);
    }
    return (
        <div className="test">
            <button id={data.id} onClick={onClick}>View Topics</button>
            <button id={data.id} onClick={onAdd}>Add Topic for {data.name}</button>
            {
                updateName ? <input type="text" id={data.id} value={data.name} onChange={onNameUpdate} onBlur={handleNameSave} onKeyUp={handleNameSave} onFocus={handleFocus} autoFocus />
                : <h2 id={data.id} onDoubleClick={() => setUpdateName(true)}>{data.name} (Grade: {data.grade})</h2>
            }
            {
                updateUnits ? <input type="text" id={data.id} value={data.units} onChange={onUnitsUpdate} onBlur={handleUnitsSave} onKeyUp={handleUnitsSave} onFocus={handleFocus} autoFocus />
                : <h2 id={data.id} onDoubleClick={() => setUpdateUnits(true)}>Units: {data.units}</h2>
            }
            <input type="text" name="" id={data.id} value={data.grade} onChange={onChange} onFocus={handleFocus}/>
            <button id={data.id} onClick={onDelete}>Delete</button>
        </div>
    )
}

export default Subject