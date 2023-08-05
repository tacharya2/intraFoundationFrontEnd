import React, {useState} from 'react';

function MyComponent(){

const [count, setCount] = useState(2);

const incrementer = () => {
setCount(count + 2);
};

 return(
<div>
{count + 1 === 3 ? <p>Click the button to start counting </p> : <p>Count: {count} </p>}
<button onClick={incrementer}>Increment</button>
</div>
 );
 }
 export default MyComponent;