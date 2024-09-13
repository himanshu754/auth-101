import { TiktokAdsTypeEnum, metricLevelEnum, ActionValueTypeEnum } from "enum/rules.enum";

interface IGoogleCustomerInfo {
    resourceName: string;
    manager: boolean;
    descriptiveName: string;
    id: string;
    spent: number;
    status: string;
    managerId: string;
    currencyCode: string;
}

interface AdCount {
    type: AdType;
    count: number;
}

interface DateRange {
    enumExist?: boolean
    since?: string;
    until?: string;
    date_preset?: string;
}

interface DateRangeTiktok {
    start_date?: string;
    end_date?: string;
    date_preset?: string;
}

interface IUserAccounts {
    idUserAccount: number;
    accountToken: string;
    refreshToken?: string;
    mediaChannel: string;
    userRef: User;
    idOrg: number;
    isActive: boolean;
    projectId: number;
    createdAt: Date;
    updatedAt: Date;
}
interface IPerformAction {
    campaignOrAdId: string;
    actionType: campaignActionEnum;
    percentage?: number;
    unitType?: ActionValueTypeEnum;
    newBudget?: number;
    accessToken: string;
    orgId: number;
    projectId: number;
    adsType?: metricLevelEnum;
    spendLimitTypeForAdset?: SpendLimitTypeForAdsetEnum;
    spendLimitInCents?: number;
    spendLimitInCentsMaxForAdSet?: number;
    spendLimitInCentsMinForAdset?: number;
    appendToName?: string;
    currency: string;
    biddingStrategyType:string;
    changeValue:number;
    adjustTargetRaos:string
}

interface IPerformActionTikTok {
    campaignOrAdId: string;
    campaignName: string;
    actionType: tiktokCampaignActionEnum;
    accountId: string;
    percentage?: number;
    unitType?: ActionValueTypeEnum;
    newBudget?: number;
    accessToken: string;
    orgId: number;
    projectId: number;
    adsType?: metricLevelEnum;
    appendToName?: string;
}