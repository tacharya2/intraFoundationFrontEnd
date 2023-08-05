import React, {useState, useEffect} from 'react';

function LifeCycle(){
const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

useEffect(()=>{
fetchData().then((data)=>setData(data));

 }, []);
 return (
 <div>
 <h3> List of posts: </h3>
   <ul>
    {data.map((item)=>(
    <li key={item.id}>{item.title}</li>
    ))}
   </ul>
 </div>
 );
}
export default LifeCycle;