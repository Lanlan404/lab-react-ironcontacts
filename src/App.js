// src/App.js
import { useState } from "react";
import "./App.css";
import contacts from "./contacts.json"



function App() {
  const [contactsList, setContactsList] = useState(contacts.slice(0, 5))

  function addContact() {
    const idArr = contactsList.map((el) => el.id)
    const newArr = contacts.filter((el) => { if (!idArr.includes(el.id)) { return el } else {return 0} })
    const randomContact = newArr[Math.floor(Math.random() * newArr.length)]
    const contactsArray = contactsList.slice()
    contactsArray.push(randomContact)
    setContactsList(contactsArray)
  }

  function sortPopularity() {
    const idArr = contactsList.map((el) => el.id)
    const newArr = contacts.filter((el) => { if (idArr.includes(el.id)) { return el } else {return 0} })
    newArr.sort(function(a,b){return b.popularity-a.popularity})
    setContactsList(newArr)
  }

  function sortName() {
    const idArr = contactsList.map((el) => el.id)
    const newArr = contacts.filter((el) => { if (idArr.includes(el.id)) { return el } else {return 0} })
    newArr.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    setContactsList(newArr)
  }

  function deleteContact(el){
    const idArr = contactsList.map((el) => el.id)
    const newArr = contacts.filter((el) => { if (idArr.includes(el.id)) { return el } else {return 0} })
    newArr.splice(el.index,1)
    setContactsList(newArr)
  }


  return <div className="App">
    <h1>IronContacts</h1>
    <button onClick={addContact}>Add a new contact</button>
    <button onClick={sortPopularity}>Sort by popularity</button>
    <button onClick={sortName}>Sort by name</button>
    <table>
      <thead><tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Popularity</th>
        <th>Won Oscar</th>
        <th>Won Emmy</th>
        <th>Action</th>
      </tr></thead>
      <tbody>
        {contactsList.map((el) => {
          return (<tr key={el.id}>
            <td><img src={el.pictureUrl} alt="visage de la personne" /></td>
            <td>{el.name}</td>
            <td>{el.popularity}</td>
            <td>{el.wonOscar ? "🏆" : ""}</td>
            <td>{el.wonEmmy && "🏆"}</td>
            <td><button onClick={deleteContact}>Delete</button></td>
          </tr>)
        })}
      </tbody>
    </table>
  </div>;
}
export default App;