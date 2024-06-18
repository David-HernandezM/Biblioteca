import { sleep } from "./utils";

export const usersAccounts = [
    {
        userId: "ljkasf9iorew",
        password: "123456789"
    },
    {
        userId: "a9s8df7g6h5j4k3",
        password: "qwerty123"
    },
    {
        userId: "zxcvbnm12345",
        password: "password123"
    },
    {
        userId: "user123",
        password: "securepass"
    },
    {
        userId: "randomuser",
        password: "987654321"
    },
    {
        userId: "jslover",
        password: "ilovejs"
    },
    {
        userId: "webdev2024",
        password: "webdevrocks"
    },
    {
        userId: "coder123",
        password: "codeislife"
    },
    {
        userId: "user567",
        password: "mypassword"
    },
    {
        userId: "jsninja",
        password: "n1nj@C0d3"
    }
];

export const checkCredentials = (userId, password) => {
    sleep(20);

    const userData = usersAccounts.filter((userAccount) => {
        return userAccount.userId == userId;
    });

    if (userData.length == 0) {
        throw new Error('El usuario no existe!');
    }

    if (userData[0].password != password) {
        throw new Error('La contraseña no es correcta!');
    }

    return userData[0];
}