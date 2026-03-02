const socket = io();
const form = document.getElementById("userForm");
const userList = document.getElementById("userList");

form.addEventListener("submit", e => {
  e.preventDefault();
  const formData = new FormData(form);
  const user = Object.fromEntries(formData);
  socket.emit("createUser", user);
  form.reset();
});

socket.on("updateUsers", users => {
  userList.innerHTML = "";
  users.forEach(user => {
    userList.innerHTML += `
      <li>
        ${user.name} - ${user.email}
        <button onclick="deleteUser('${user.id}')">Eliminar</button>
      </li>
    `;
  });
});

function deleteUser(id) {
  socket.emit("deleteUser", id);
}