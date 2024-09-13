import { Number } from "aws-sdk/clients/iot";
import { RoleEnum, UserStatusEnum } from "enums/auth.enum";
import { adAccountStatusEnum } from "enums/user.enum";

declare namespace IUserInterface {
    interface IUpdateUserReq {
        passwordHash: string;
        status: UserStatusEnum;
        firstName: string;
        lastName: string;
        mobile: string;
        idUserInt?: number
        isPasswordCreated: boolean
        isEmailVerified: boolean
        email: string
        resetToken?: string
        taxId?: string;
        vatNo?: string;
        companyName?: string;
        marketingConsent?: boolean;
        termsAndConditions?: boolean;
    }
    interface IUpdateUserInput {
        token: string;
        firstName: string;
        lastName: string;
        mobile: string;
        password: string;
        taxId?: string;
        vatNo?: string;
        companyName?: string;
        marketingConsent?: boolean;
        termsAndConditions?: boolean;
    }

    interface IUpdateMember {
        idUserInt: number
        firstName?: string;
        lastName?: string;
        mobile?: string;
        password: string;
        status?: UserStatusEnum;
        role?: RoleEnum;
        projectIds?: number[]
    }


    interface UserProfileAccount {
        meta: { accountData: IAccountData[], connected: boolean, pageData?: { pageId: string, pageName: string } },
        google: { accountData: IAccountData[], connected: boolean },
        tiktok: { accountData: IAccountData[], connected: boolean, pageData?: { pageId: string, pageName: string } },
        snapchat: { accountData: IAccountData[], connected: boolean },
        projectId: number
    }



    interface UserPageAccount {
        pageData: IPageData[]
        projectId: number
    }


    interface IPageData {
        pageId: number;
        pageName: string;
        pageProfileUri: string;
        projectId: number;
        orgId: number;
        status: boolean;
    }

    interface IAccountData {
        actId: string;
        actSpent: number
        actName: string;
        actStatus: boolean;
        actProfileUri: string;
        projectId: number;
        managerId: string;
        orgId: number;
        status?: boolean;
        mediaChannel: string
        userAccountRef: number
        currency?: string
        baseActSpent?: number
    }

    interface IInviteMemberReq {
        email: string;
        permission?: PermissionEnum;
        role?: RoleEnum;
        projectIds?: number[];
    }

    interface IOrgId {
        orgId: number;

    }
    interface IUpdateAdaccountStatus {
        idAccountData: number;
        status: boolean;

    }

    interface IUpdateAdaccountPage {
        actId: string;
        pageId: string
        idOrg: number
    }

    interface IUpdateUser {
        firstName?: string;
        lastName?: string;
        email?: string;
        mobile?: string;
        profilePic?: string;
        taxId?: string;
        vatNo?: string;
        companyName?: string;
        marketingConsent?: boolean;
        termsAndConditions?: boolean;
    }
    
    interface AdActPageData {
        status: boolean;
        projectId: number; 
        mediaChannel: string; 
        orgId: number; 
        actId: string; 
        pageId: string; 
        pageName: string; 
      }
}