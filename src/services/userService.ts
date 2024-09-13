import { User } from "db/entities/User";
import {
    userRepo
} from "db/repos";
import { commonMessages } from "helpers/messageConstants/commonMessages";
import { ERROR_CODES } from "helpers/messageConstants/errorCodesMessages";
import { IUserInterface } from "types/user";
import { customError } from "utils/common";



const checkExistenceInUserDb = async (key: string, value: string | number) => await userRepo()
    .createQueryBuilder("u")
    .where({ [key]: value })
    .getOne();

const updateUserData = async (idUserInt: number, input: Partial<IUserInterface.IUpdateUserReq>) => {
    return await userRepo()
        .update(
            { idUserInt },
            input,
        );
};



const checkEmailInDb = async (email: string) => {
    const data = await userRepo()
        .findOne({ where: { email } });
    return data ? data : null;
};

async function updateUserService(body: IUserInterface.IUpdateUser, token: Token.IAccessTokenPayload) {
    const {
        firstName, lastName, email, mobile, profilePic, vatNo, companyName, termsAndConditions, marketingConsent, taxId,
    } = body;

    const user = new User();
    user.idUserInt = token.idUserInt;

    if (firstName) {
        user.firstName = firstName;
    }
    if (lastName) {
        user.lastName = lastName;
    }
    if (email) {
        const existingUser = await userRepo()
            .findOne({ where: { email } });
        if (existingUser && existingUser.idUserInt !== token.idUserInt) {
            throw customError({
                status: ERROR_CODES.INVALID_REQUEST,
                message: commonMessages.EMAIL_EXISTS,
            });
        }
        user.email = email;
    }
    if (mobile) {
        user.mobile = mobile;
    }
    if (profilePic) {
        user.profilePic = profilePic;
    }
    if (vatNo) {
        user.vatNo = vatNo;
    }
    if (taxId) {
        user.taxId = taxId;
    }
    if (companyName) {
        user.companyName = companyName;
    }
    if (termsAndConditions) {
        user.termsAndConditions = termsAndConditions;
    }
    if (marketingConsent) {
        user.marketingConsent = marketingConsent;
    }

    const result = await userRepo()
        .findOne({ where: { idUserInt: token.idUserInt } });

    if (!result) {
        throw customError({
            status: ERROR_CODES.INVALID_REQUEST,
            message: commonMessages.INVALID_DATA,
        });
    }

    await userRepo()
        .update({ idUserInt: token.idUserInt }, user);

    return null;

}

export {
    checkExistenceInUserDb,
    updateUserData,
    checkEmailInDb,
    updateUserService,
};
