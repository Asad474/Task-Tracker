import React,{useState} from 'react';

const AddTask = props => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);

    const onSubmit = event => {
        event.preventDefault();

        if (!text){
            alert('Please add a task.');
            return;
        };

        props.onAdd({text, day, reminder});

        setText('');
        setDay('');
        setReminder(false);
    };

    return (
        <form action="" className='add-form' onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input type="text" name="task" id="task" value={text} onChange={e => setText(e.target.value)} placeholder='Add Task' />
            </div>

            <div className="form-control">
                <label>Day & Time</label>
                <input type="text" name="day_time" id="day-time" value={day} onChange={e => setDay(e.target.value)} placeholder='Add Day & Time' />
            </div>

            <div className="form-control form-control-check">
                <label>Set Reminder</label>
                <input type="checkbox" checked={reminder} name="reminder" id="reminder" value={reminder} onChange={e => setReminder(e.currentTarget.checked)} />
            </div>

            <button type="submit" className='btn btn-block'>Save Task</button>
        </form>
    );
};

export default AddTask;