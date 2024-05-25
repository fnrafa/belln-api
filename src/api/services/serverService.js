const {hash} = require("bcryptjs");
const {prisma} = require("../../config/prisma");
const model = require("../models/userModel");

exports.seedRoles = async () => {
    const roles = [
        {id: "1", name: "user"},
        {id: "2", name: "admin"}
    ];
    for (let role of roles) {
        await prisma.role.upsert({
            where: {name: role.name},
            update: {},
            create: {id: role.id, name: role.name},
        });
    }
};

exports.seedAccount = async () => {
    const accounts = [
        {username: "Admin", email: "admin@belln.com", fullname: "Admin", password: "Admin123", roleId: "2"},
        {username: "Developer", email: "dev@belln.com", fullname: "Developer", password: "maturate", roleId: "2"}
    ];
    for (const account of accounts) {
        const userExists = await prisma.user.findUnique({
            where: {username: account.username},
        });

        if (!userExists) {
            const hashedPassword = await hash(account.password, 10);
            await model.createUser(account.email, account.username, hashedPassword, account.fullname, account.roleId);
        }
    }
};