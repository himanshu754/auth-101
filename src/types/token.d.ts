declare namespace Token {
    type TokenType = "ACCESS_TOKEN" | "REFRESH_TOKEN" | "INVITED_USER" | "RESET_PASSWORD" | "TEMP_TOKEN";
    interface IAccessTokenPayload {
        idUserInt: number;
        idOrg: number;
        email: string;
        firstName: string
        role: RoleEnum;
        tokenType: TokenType
    }
    interface IRefTokenPayload {
        userId: number;
        firstName: string;
        ipAddress: string | string[];
        createdDate: number;
    }

    interface IResetPasswordPayload {
        userId: number,
        email: string;
        tokenType: TokenType;
    }
    interface IRefTokenReq {
        idToken?: number;
        refreshToken: string;
        idUserInt: User;
        firstName: string;
        ipAddress: any;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
    }

    interface IForgetPasswordPayload {
        email: string;
    }

    interface ITokenInfo {
        secretKey: string;
        expiryTimeStamp: number
    }
    interface IInvitedUserPayload {
        idUserInt: number;
        email: string;
        tokenType: TOKEN_TYPE;
        companyName?: string; 
        vatNumber?: string;
        taxId?: string;
    }

    interface IRegisterUserInput {
        firstName?: string;
        lastName?: string;
        email: string;
        mobile?: string;
        isActive?: boolean;
        passwordHash?: string
    }
}