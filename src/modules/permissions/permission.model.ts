import mongoose, { Schema, model } from "mongoose";
export interface IPermission {
    role: string;
    permissions: Array<string>;
}

const PermissionSchema = new Schema<IPermission & mongoose.Document>({
    role: {
        type: String,
        required: true,
    },

    permissions: {
        type: [String],
        default: [],
    },
});
const Permission = model<IPermission & mongoose.Document>(
    "Permissions",
    PermissionSchema
);
export default Permission;
