// src/App.js
import { useState } from "react";
import "./App.css";
import contacts from "./contacts.json"

function App() {
  const randomIndex = Math.floor(Math.random() * contacts.length)
  const [contactsList, setContactsList] = useState(contacts.slice(randomIndex, randomIndex + 5))
  const [sortedPopDir, setSortedPopDir] = useState(0)
  const [sortedNameDir, setSortedNameDir] = useState(0)

  function addContact() {
    const idArr = contactsList.map((el) => el.id)
    const newArr = contacts.filter((el) => { if (!idArr.includes(el.id)) { return el } else { return 0 } })
    const randomContact = newArr[Math.floor(Math.random() * newArr.length)]
    const contactsArray = contactsList.slice()
    contactsArray.push(randomContact)
    setContactsList(contactsArray)
  }

  function sortPopularity() {
    const idArr = contactsList.map((el) => el.id)
    const newArr = contacts.filter((el) => { if (idArr.includes(el.id)) { return el } else { return 0 } })

    function sort1() {
      newArr.sort(function (a, b) {
        console.log("sort1")
        return b.popularity - a.popularity
      })
    }
    function sort2() {
      newArr.sort(function (a, b) {
        console.log("sort2")
        return a.popularity - b.popularity
      })
    }

    if (sortedPopDir === 0) {
      sort1()
      setSortedPopDir(1)
    }
    if (sortedPopDir === 1) {
      sort2()
      setSortedPopDir(0)
    }
    setContactsList(newArr)
  }

  function sortName() {
    const idArr = contactsList.map((el) => el.id)
    const newArr = contacts.filter((el) => { if (idArr.includes(el.id)) { return el } else { return 0 } })
   
    function sort1() {
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
      })
    }

    function sort2() {
      newArr.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      })
    }

    if (sortedNameDir === 0) {
      sort1()
      setSortedNameDir(1)
    }
    if (sortedNameDir === 1) {
      sort2()
      setSortedNameDir(0)
    }
    setContactsList(newArr)
  }

  function deleteContact(el) {
    const idArr = contactsList.map((el) => el.id)
    const newArr = contacts.filter((el) => { if (idArr.includes(el.id)) { return el } else { return 0 } })
    newArr.splice(el.index, 1)
    setContactsList(newArr)
  }

  return <div className="App">
    <h1>IronContacts</h1>

    <div id="buttons">
      <button onClick={addContact}>Add a new contact</button>
      <button onClick={sortPopularity}>Sort by popularity {sortedPopDir === 0 ? "🔼" : "🔽"}</button>
      <button onClick={sortName}>Sort by name{sortedNameDir === 0 ? "🔼" : "🔽"}</button>
    </div>

    <div id="tableau">
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
    </div>
  </div>;
}

export default App;