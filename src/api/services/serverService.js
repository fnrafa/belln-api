const {hash} = require("bcryptjs");
const {prisma} = require("../../config/prisma");

exports.seedRoles = async () => {
    const roles = [{id: "1", name: "user"}, {id: "2", name: "admin"}];
    for (let role of roles) {
        await prisma.role.upsert({
            where: {name: role.name}, update: {}, create: {id: role.id, name: role.name},
        });
    }
};

exports.seedAccount = async () => {
    const accounts = [{
        username: "Admin", email: "admin@belln.com", fullname: "Admin", password: "Admin123", roleId: "2"
    }, {username: "Developer", email: "dev@belln.com", fullname: "Developer", password: "maturate", roleId: "2"}];
    for (const account of accounts) {
        const hashedPassword = await hash(account.password, 10);
        await prisma.user.upsert({
            where: {username: account.username}, update: {roleId: account.roleId,}, create: {
                username: account.username,
                password: hashedPassword,
                roleId: account.roleId,
                email: account.email,
                fullname: account.fullname
            },
        })
    }
};