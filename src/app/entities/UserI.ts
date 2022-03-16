import * as internal from "stream";

export interface UserI{
    id: number,
    username: string,
    email: string,
    last_name: string,
    first_name: string,
    account_type: string,
    phone: number,
    address: string
}