import React, { useEffect, useState } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";

const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const url = "https://randomuser.me/api/";

  const [user, setUser] = useState({
    name: "",
    email: "",
    picture: "",
    dob: "",
    location: "",
    phone: "",

    password: "",
    uuid: "",
    login: "",
    registered: "",
    age: "",
  });

  const [whichClicked, setWhichClicked] = useState("");

  const [addUser, setAddUser] = useState([]);

  const getUser = () => {
    axios(url)
      .then((res) => setUser(res.data.results[0]))
      .catch((err) => console.log(err));
  };

  const handleAddUser = (email) => {
    const isUserAdded = addUser.some(
      (addedUser) => addedUser.newMail === email
    );

    if (isUserAdded) {
      alert("Bu kullanıcı zaten eklendi...");
    } else {
      setAddUser([
        ...addUser,
        {
          firstName: user.name.first,
          newMail: user.email,
          newPhone: user.phone,
          newAge: user.dob.age,
        },
      ]);
    }
  };
  const [newUserBtn, setNewUserBtn] = useState(false);

  useEffect(() => {
    getUser();
  }, [newUserBtn]);

  return (
    <main>
      <div className="block bcg-orange"></div>
      <div className="block">
        <div className="container">
          <img
            src={user.picture.large || defaultImage}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">
            My {whichClicked || ` name is ${user.name.first} ${user.name.last}`}
          </p>
          <p className="user-value"></p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onClick={() =>
                setWhichClicked(`name is ${user.name.first} ${user.name.last}`)
              }
            >
              <img src={womanSvg} alt="user" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="email"
              onClick={() => setWhichClicked(` email is ${user.email}`)}
            >
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="age"
              onClick={() => setWhichClicked(`age is ${user.dob.age}`)}
            >
              <img src={womanAgeSvg} alt="age" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="street"
              onClick={() => setWhichClicked(`city is ${user.location.city}`)}
            >
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="phone"
              onClick={() => setWhichClicked(`phone is ${user.phone}`)}
            >
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="password"
              onClick={() =>
                setWhichClicked(`password is ${user.login.password}`)
              }
            >
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button
              className="btn"
              type="button"
              onClick={() => setNewUserBtn(!newUserBtn)}
            >
              new user
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => handleAddUser(user.email)}
            >
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              {addUser.map((userData, index) => (
                <tr className="body-tr" key={index}>
                  <td className="th">{userData.firstName}</td>
                  <td className="th">{userData.newMail}</td>
                  <td className="th">{userData.newPhone}</td>
                  <td className="th">{userData.newAge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
