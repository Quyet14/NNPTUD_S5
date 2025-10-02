const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoleSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    isDelete: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
});

const Role = mongoose.model('Role', RoleSchema);

const createRole = async (roleData) => {
    try {
        const role = new Role(roleData);
        await role.save();
        return role;
    } catch (error) {
        console.error(error);
        throw new Error("Error creating role");
    }
};

const getAllRoles = async () => {
    try {
        const roles = await Role.find({ isDelete: false });
        return roles;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching roles");
    }
};

const getRoleById = async (roleId) => {
    try {
        const role = await Role.findById(roleId).where('isDelete').equals(false);
        return role;
    } catch (error) {
        console.error(error);
        throw new Error("Role not found");
    }
};

const getRoleByName = async (roleName) => {
    try {
        const role = await Role.findOne({ name: roleName, isDelete: false });
        return role;
    } catch (error) {
        console.error(error);
        throw new Error("Role not found");
    }
};

const softDeleteRole = async (roleId) => {
    try {
        const role = await Role.findByIdAndUpdate(roleId, { isDelete: true }, { new: true });
        return role;
    } catch (error) {
        console.error(error);
        throw new Error("Error deleting role");
    }
};

module.exports = {
    Role,
    createRole,
    getAllRoles,
    getRoleById,
    getRoleByName,
    softDeleteRole
};
