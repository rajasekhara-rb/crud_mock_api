let displayContainer = document.querySelector('#display');
let errorBar = document.querySelector('#error-bar');

let editUserBtn = document.querySelector("#editUser")
editUserBtn.style.display = "none";

let idInputElement = document.querySelector("#id");
idInputElement.style.display = "none";

let idLabelElement = document.querySelector("#idLabel");
idLabelElement.style.display = "none";

let addUserSubmitBtn = document.querySelector("#addUser");

let openModalBtn = document.querySelector('#openModalBtn');

let entryForm = document.querySelector('#modal');
function openModal() {
    entryForm.removeAttribute("class");
    // entryForm.setAttribute("class", "modal show");
}

function closeModal() {
    entryForm.setAttribute("class", "modal fade hidden");
}

openModalBtn.addEventListener("click", () => {
    openModal()

});

let online = window.navigator.onLine;
if (online !== true) {
    displayContainer.innerHTML = `<h5 class="d-flex align-items-center m-5 alert alert-danger">Oops!!! It seems like you dont have internet connection</h5>`;
    errorBar.innerHTML = `<h6 class="alert alert-danger">Oops!!! It seems like you dont have internet connection</h6>`;
    setInterval(() => {
        errorBar.innerHTML = "";
    }, 3000);
} else {
    // // window.location.reload();
    // displayContainer.innerHTML = `<h5 class="d-flex align-items-center m-5 alert alert-info">Hey, Your Connection is Restored</h5>`;
    // errorBar.innerHTML = `<h6 class="alert alert-info">Hey, Your Connection is Restored</h6>`;
    // setInterval(() => {
    //     errorBar.innerHTML = "";
    // }, 3000);
}


let url = "https://645a7e0e95624ceb21039cad.mockapi.io/users";

async function getUsersData() {
    try {
        let usersData = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        let users = await usersData.json();
        // console.log(users);
        displayUsersData(users);
        // errorBar.innerHTML = `<h6 class="alert alert-info">Getting the user Data</h6>`;
        // setInterval(() => {
        //     errorBar.innerHTML = "";

        // }, 2000);

        return users;

    } catch (error) {
        console.log(error);
    }
}

getUsersData();


function displayUsersData(users) {

    let html = "";
    console.log(users);
    // , ${element.name},${element.email},${element.avatar}
    if (users.length !== 0) {

        users.forEach((element) => {
            html += `<div class="card">
            <div class="card-img-div">
            <img class="card-img" src="${element.avatar}" alt="${element.name}">
            </div>
            <div class="card-body">
            <h4 class="card-name"> ${element.id}, ${element.name}</h4>
            <h6 class="card-email">${element.email}</h6>
            <button class="btn btn-primary" onclick="editUser(${element.id})">Edit</button>
            
            <button class="btn btn-danger" onclick="deleteUser(${element.id})">Delete</button>
            </div>
            </div>`
        });
        displayContainer.innerHTML = html;
        // errorBar.innerHTML = `<h6 class="alert alert-info">Displaying the user Data</h6>`;
        // setInterval(() => {
        //     errorBar.innerHTML = "";

        // }, 1000);
    }
    else {
        displayContainer.innerHTML = `<h5 class="d-flex align-items-center m-5 alert alert-info">No data avilable to show. Add users</h5>`;
    }

}

async function addUser() {
    try {

        let name = document.querySelector('#name');
        let email = document.querySelector('#email');
        let avatar = document.querySelector('#avatar');
        if (name.value == "" || email.value == "" || avatar.value == "") {
            errorBar.innerHTML = `<h6 class="alert alert-warning">User Details Cannot be blank.</h6>`;
            setInterval(() => {
                errorBar.innerHTML = "";

            }, 3000);
        }
        else {
            let usersData = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    name: name.value,
                    email: email.value,
                    avatar: avatar.value,
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            // let users = usersData.json();
            // console.log(users);
            errorBar.innerHTML = `<h6 class="alert alert-success">User Added Successfully</h6>`;
            setInterval(() => {
                errorBar.innerHTML = "";

            }, 3000);

            getUsersData();
            // displayUsersData();

            name.value = "";
            email.value = "";
            avatar.value = "";
            closeModal()
        }
    } catch (error) {
        console.log(error);
    }


};

async function deleteUser(id) {

    let sel = confirm("Are you sure to delete?");
    if (sel == true) {
        try {
            let usersData = await fetch(`https://645a7e0e95624ceb21039cad.mockapi.io/users/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            let users = await usersData.json();
            console.log(users);
            errorBar.innerHTML = `<h6 class="alert alert-danger">User with id ${id} Deleted Successfully</h6>`;
            setInterval(() => {
                errorBar.innerHTML = "";

            }, 3000);
            getUsersData();
            displayUsersData();
        } catch (error) {
            console.log(error);
        }
    }

};



async function editUser(id) {
    try {

        // console.log("triggered");
        let users = await getUsersData();
        // console.log(users);
        let selectedUser = "";
        users.forEach(user => {
            if (id == user["id"]) {
                // console.log(User);
                selectedUser = user;
                return selectedUser;
            }
            // return selectedUser;
        })

        let idElement = selectedUser["id"];
        // console.log(idElement);
        let nameElement = selectedUser["name"];
        // console.log(nameElement);
        let emailElement = selectedUser["email"];
        let avatarElement = selectedUser["avatar"];

        let eId = document.querySelector('#id');
        let eName = document.querySelector('#name');
        let eEmail = document.querySelector('#email');
        let eAvatar = document.querySelector('#avatar');


        eId.value = idElement;
        eName.value = nameElement;
        eEmail.value = emailElement;
        eAvatar.value = avatarElement;

        editUserBtn.style.display = "block";
        idLabelElement.style.display = "block";
        idInputElement.style.display = "block";
        addUserSubmitBtn.style.display = "none";

        openModal();
        editUserBtn.addEventListener("click", () => {

            saveUser(idElement);

            eId.value = "";
            eName.value = "";
            eEmail.value = "";
            eAvatar.value = "";

            idInputElement.style.display = "none";
            editUserBtn.style.display = "none";
            addUserSubmitBtn.style.display = "block";
            idLabelElement.style.display = "none";
            closeModal();
            errorBar.innerHTML = `<h6 class="alert alert-success">User Edited Successfully</h6>`;

            setInterval(() => {
                errorBar.innerHTML = "";

            }, 3000);
            // window.location.reload();
        })
    } catch (error) {
        console.log(error);
    }
}

async function saveUser(id) {
    // let id = await editUser();
    console.log(id);
    try {
        let fullname = document.querySelector('#name');
        let email = document.querySelector('#email');
        let avatar = document.querySelector('#avatar');

        let user = await fetch(`https://645a7e0e95624ceb21039cad.mockapi.io/users/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                name: fullname.value,
                email: email.value,
                avatar: avatar.value,
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        let userData = await user.json();
        // getUsersData();
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}
