import { isString } from "util";

export class LoginDto {
    readonly name : string;
    readonly email: string;
    readonly password : string;
}