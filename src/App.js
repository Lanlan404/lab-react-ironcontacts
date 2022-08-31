// src/App.js
import { useState } from "react";
import "./App.css";
import contacts from "./contacts.json"



function App() {
  const [contactsList, setContactsList] = useState(contacts.slice(0,5))

  function UpdateContacts(){
    const idArr = contactsList.map((el)=>el.id)
    const newArr = contacts.filter((el)=>{ if (!idArr.includes(el.id)){return el} })
    const randomContact = newArr[Math.floor(Math.random()*newArr.length)]
    const contactsArray = contactsList.slice()
    contactsArray.push(randomContact)
    setContactsList(contactsArray)
  }

  
  return <div className="App">
    <h1>IronContacts</h1>
    <button onClick={UpdateContacts}>Add a new contact</button>
    <table>
      <thead><tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Popularity</th>
        <th>Won Oscar</th>
        <th>Won Emmy</th>
        </tr></thead>
      <tbody>
        {contactsList.map(({pictureUrl,name,popularity,wonOscar,wonEmmy}) => {
          return (<tr>
            <td><img src={pictureUrl} alt="la photo du user"/></td>
            <td>{name}</td>
            <td>{popularity}</td>
            <td>{wonOscar ? "🏆" : ""}</td>
            <td>{wonEmmy && "🏆"}</td>
          </tr>)
        })}
      </tbody>
    </table>
  </div>;
}
export default App;