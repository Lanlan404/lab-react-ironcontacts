// src/App.js
import { useState } from "react";
import "./App.css";
import contacts from "./contacts.json"



function App() {
  const [contactsList, setContactsList] = useState(contacts.slice(0, 5))

  function addContact() {
    const idArr = contactsList.map((el) => el.id)
    const newArr = contacts.filter((el) => { if (!idArr.includes(el.id)) { return el } })
    const randomContact = newArr[Math.floor(Math.random() * newArr.length)]
    const contactsArray = contactsList.slice()
    contactsArray.push(randomContact)
    setContactsList(contactsArray)
  }

  function sortPopularity() {
    const idArr = contactsList.map((el) => el.id)
    const newArr = contacts.filter((el) => { if (idArr.includes(el.id)) { return el } })
    newArr.sort(function(a,b){return b.popularity-a.popularity})
    setContactsList(newArr)
  }

  function sortName() {
    
    const idArr = contactsList.map((el) => el.id)
    const newArr = contacts.filter((el) => { if (idArr.includes(el.id)) { return el } })
    console.log("newarr1",newArr)
    newArr.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
    
    console.log("newarr2",newArr)
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
      </tr></thead>
      <tbody>
        {contactsList.map(({ pictureUrl, name, popularity, wonOscar, wonEmmy }) => {
          return (<tr>
            <td><img src={pictureUrl} alt="la photo du user" /></td>
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