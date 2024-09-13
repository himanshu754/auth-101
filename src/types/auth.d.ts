declare namespace ILogin {

    interface ILoginReq {
        email: string;
        password: string;
        rememberMe?: boolean
    }
}