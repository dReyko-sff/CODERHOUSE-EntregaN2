const socket = io();
const form = document.getElementById("userForm");
const list = document.getElementById("userList");

socket.on("updateUsers", users => {
  list.innerHTML = "";
  users.forEach(u => {
    list.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span><strong>${u.name}</strong> - ${u.email}</span>
        <button class="btn btn-danger btn-sm" onclick="deleteUser('${u.id}')">
          Eliminar
        </button>
      </li>
    `;
  });
});

form.addEventListener("submit", e => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));
  socket.emit("createUser", data);

  form.reset();
});

function deleteUser(id) {
  socket.emit("deleteUser", id);
}