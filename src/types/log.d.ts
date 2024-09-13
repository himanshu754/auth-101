import { logTypeEnum } from "enum/log.enum";

declare namespace ILog {
    interface ISaveLogReq {
        mediaChannel?: string
        action?: string;
        message: string;
        projectId?: number
        orgId?: number
        logStatus?: logTypeEnum
        logEvent?: string;
        logType?: string;
        logTypeId?: number;
    }


    interface ILogsId {
        logId: number;
        projectId: number;
    }
    interface logData{
        totalRecords: number;
        totalPages: number;
        items: any[];
    }
    interface IgetAllLogRes {
        message: string;
        data: logData[]
    }
}