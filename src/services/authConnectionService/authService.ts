import { userRepo,
} from "db/repos";

const getTokenData = async (refreshToken: string) => {
    console.log(refreshToken)
    return {}
};

const deleteRefreshTokenByUserId = async (idUserInt: number) => console.log("delete",idUserInt)

async function getUserByEmail(email: string) {
    return await userRepo()
        .findOne({ where: { email } });
}

export {
    getTokenData,
    deleteRefreshTokenByUserId,
    getUserByEmail,
};
