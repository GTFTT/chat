//This file contains users' data and auxiliary functionality

const users = [];//It contains objects of all signed in users 

//It adds new user if name and room are free else it returns an error
//Id is socket instance identifier whatever it means
const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const isUser = users.find(user => (user.name === name && user.room === room));

    if(isUser) {
        return {error: "User with name \""+name+"\" and room \""+room+"\" already exists;"}
    }

    const user = {id, name, room};
    users.push(user);
    return { user };
}

//Removes user from users list by specific id
const removeUser = (id) => {
    const index = users.findIndex(user => (user.id == id));

    if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find(user => user.id===id);

const getUsersInRoom = (room) => {
    return users.filter(user => user.room === room);
}

//removes all existing users
const tempRemoveAllUsers = () => {
    users.splice(0, users.length);
}

const tempPrintAllUsers = () => {
    console.log("Users: ");
    users.map(u =>{
        console.log(u);
    });
}

module.exports = {addUser, removeUser, getUser, getUsersInRoom, tempRemoveAllUsers, tempPrintAllUsers};
