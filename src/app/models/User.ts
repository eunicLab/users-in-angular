export interface User{
    name: string| undefined;
    email: string| undefined;
    phone: string| undefined;
}


export interface Config {
    data: [];
    status: string| undefined;
    message: string| undefined;
}

export interface myUser {
    id: string| undefined;
   name: string | undefined;
    email: string| undefined;
    phone: string| undefined; 
}

export class UsersList{
    id: string | undefined;
    name: string | undefined;
    email: string | undefined;
    phone: string | undefined;
}
