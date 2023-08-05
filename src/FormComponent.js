import React, {useState} from 'react';
import axios from 'axios';

function FormComponent(){
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [textMessage, setTextMessage] = useState('');
const [message, setMessage] = useState();
const maxCharacter = 120;

    const handleNameChange = (e) => {
    setName(e.target.value);
    };

    const handleEmailChange = (e) => {
    setEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    };

const handleTextMessageChange = (e) => {
    setTextMessage(e.target.value);
};

    const handleSubmit = (e) => {
    e.preventDefault();

    //Prepare the data to be sent to the server
    const dataToSend = {
    name: name,
    email: email,
    phone: phone,
    textMessage: textMessage,
    };

    //Make a POST request to the backend API
    console.log(dataToSend)
    axios.post('http://localhost:8083/intraNationalApi/email', dataToSend)
      .then((response) => {
        console.log(response.data); // If needed, handle the response from the server
        setMessage(`Hello ${response.data.name}! Thanks for providing your email: ${response.data.email}`);
        setName('');
        setEmail('');
        setPhone('');
        setTextMessage('');
//       e.target.reset()

      // Fetch the saved email data by its ID
      // This is used to retrieve it from the DB from the UI side
      axios.get(`http://localhost:8083/intraNationalApi/email/${response.data.id}`)
        .then((emailResponse) => {
          console.log(emailResponse.data);
          setMessage(`Hello ${response.data.name}! Your email registered with us is ${emailResponse.data.email}`);
        })
        .catch((error) => {
          console.error('Error:', error);
            setMessage('An error occurred while retrieving the email data.');
        });
    })
    .catch((error) => {
      console.error('Error:', error);
      setMessage('An error occurred while retrieving the email data.');
    });
//  setMessage('');
//  setTextMessage('');
};
    return (
    <div>
        <h2>Contact Form</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label> Name </label>
            <input type="Text" value={name} onChange={handleNameChange}/>
            </div>
            <div>
            <label> Email </label>
            <input type="email" value={email} onChange={handleEmailChange}/>
            </div>
            <div>
            <label> Phone </label>
            <input type="text" value={phone} onChange={handlePhoneChange}/>
            </div>
            <div>
            <label> Message </label>
            <textarea rows="10" cols="50" value={textMessage} onChange={handleTextMessageChange}/>
            <p>{textMessage.length}/{maxCharacter}</p>
            </div>
            <button type="submit">Submit</button>
        </form>
      <p>Your Message: {message}</p>
    </div>
    );
}
export default FormComponent;