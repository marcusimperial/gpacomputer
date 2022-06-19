import { useState } from "react";

const Term = ({ data, onClick, onChange, onDelete, onUpdate, onAdd }) => {
    const [update, setUpdate] = useState(false);
    const handleFocus = (e) => e.target.select();
    const handleSave = (e) => {
        if (e.keyCode === 13 || e.type === 'blur') setUpdate(false);
    }
    return (
        <div className="test">
            <button id={data.id} onClick={onClick}>View Subjects</button>
            <button id={data.id} onClick={onAdd}>Add Subject for {data.title}</button>
            {
                update ? <input type="text" id={data.id} value={data.title} onChange={onUpdate} onBlur={handleSave} onKeyUp={handleSave} onFocus={handleFocus} autoFocus />
                : <h2 title="sad" id={data.id} onDoubleClick={() => setUpdate(true)}>{data.title} (GPA: {data.gpa})</h2>}
            <input type="text" name="" id={data.id} value={data.gpa} onChange={onChange} onFocus={handleFocus} />
            <button id={data.id} onClick={onDelete}>Delete</button>
        </div>
    )
}
// <h2 id={data.id}>{data.title} (GPA: {data.gpa})</h2>
export default Term