let state = {};

document.getElementById("myForm").onsubmit = function (event) {
  event.preventDefault();

  const username = document.getElementById("username");
  if (username && username.value.length > 0) {
    state.username = username.value;
  }

  state.email = document.getElementById("email_address").value;
  state.password = document.getElementById("password").value;

  console.log("state", state);
  myMain();
};

function myMain() {
  if (window.location.href.split("/").pop() === "index.html") {
    console.log("Ez a bejelentkezés oldal");

    let registrations = JSON.parse(localStorage.getItem("registrations")) || [];

    let isDuplicate = registrations.some((registration) => {
      return (
        registration.email === state.email &&
        registration.password === state.password
      );
    });

    if (!isDuplicate) {
      alert("Hibás adatok!");
      document.getElementById("password").value = "";
      return;
    } else {
      alert("Sikeres bejelentkezés!");

      window.location.href = window.location.href.replace(
        "/index.html",
        "/signedin.html"
      );
    }
  } else if (window.location.href.split("/").pop() === "registration.html") {
    console.log("Ez a regisztrációs oldal");

    let registrations = JSON.parse(localStorage.getItem("registrations")) || [];

    let isDuplicate = registrations.some((registration) => {
      return (
        registration.username === state.username &&
        registration.email === state.email
      );
    });

    if (isDuplicate) {
      alert("A profil már létezik!");
      document.getElementById("username").value = "";
      document.getElementById("email_address").value = "";
      document.getElementById("password").value = "";
      return;
    } else if (state.password.includes(state.username)) {
      alert("A jelszó nem tartalmazhatja a felhasználónevet!");
      document.getElementById("password").value = "";
    } else if (!isDuplicate) {
      registrations.push({
        username: state.username,
        email: state.email,
        password: state.password,
      });

      localStorage.setItem("registrations", JSON.stringify(registrations));

      alert("Regisztrációs sikeres!");

      window.location.href = window.location.href.replace(
        "/registration.html",
        "/index.html"
      );
    }
  } else if (window.location.href.split("/").pop() === "signedin.html") {
    console.log("Ez a bejelentkezett oldal");
  }
}
