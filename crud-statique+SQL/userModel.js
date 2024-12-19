let Users = [
    { id: 1, name: "Jean", age: 28 },
    { id: 2, name: "Emma", age: 34 },
    { id: 3, name: "Noah", age: 26 },
    { id: 4, name: "Olivia", age: 31 },
    { id: 5, name: "Ava", age: 22 },
    { id: 6, name: "James", age: 40 },
    { id: 7, name: "Sophia", age: 29 },
    { id: 8, name: "Jackson", age: 36 },
    { id: 9, name: "Isabella", age: 25 },
    { id: 10, name: "Mason", age: 33 }
];

const getAll = () => Users;

const getById = (id) => Users.find(user => user.id === id);

const searchByName = (name) =>
    Users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));

const paginate = (page, limit) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
        currentPage: page,
        totalPages: Math.ceil(Users.length / limit),
        limit,
        totalUsers: Users.length,
        users: Users.slice(startIndex, endIndex),
    };
};

const add = (name, age) => {
    const newId = Users.length > 0 ? Math.max(...Users.map(user => user.id)) + 1 : 1;
    const newUser = { id: newId, name, age };
    Users.push(newUser);
    return newUser;
};

const update = (id, name, age) => {
    const userIndex = Users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        Users[userIndex] = { ...Users[userIndex], name, age };
        return Users[userIndex];
    }
    return null;
};

module.exports = { getAll, getById, searchByName, paginate, add, update };