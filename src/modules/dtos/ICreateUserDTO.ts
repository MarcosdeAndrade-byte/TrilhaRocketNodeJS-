interface ICreateUserDTO {
    name: string;
    username: string;
    password: string;
    email: string;
    isAdmin: boolean;
    driver_license: string;
}

export { ICreateUserDTO };
