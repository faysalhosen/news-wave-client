import  { useEffect, useState } from 'react';
import moment from 'moment';
const TimePicker = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        setInterval(() => setTime(new Date()), 1000)
    }, [])
    const currentDate = new Date();


    return (
        
          <div className=' mb-4'> 
            <p className="flex gap-2"><p className='font-bold text-blue '> Current Date:</p> <span className=' font-normal'>{moment(currentDate).format("D MMM YYYY,")}   {time.toLocaleTimeString()}</span> 
            </p>   
          </div>
       
    
        
    );
};

export default TimePicker;