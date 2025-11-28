import { ValidatedUser } from "src/auth/interfaces/validated-user.interface";

export interface RequestWithUser extends Request {
    user: ValidatedUser
}