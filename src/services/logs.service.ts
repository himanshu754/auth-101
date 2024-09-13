import { Logs } from "db/entities/Logs";
import { logsRepo } from "db/repos";
import { assetSortKeyEnum } from "enums/asset.enum";
import { SortTypeEnum } from "enums/common.enum";
import { ILog } from "types/log";

async function saveLogsService(body: ILog.ISaveLogReq, projectId?: number) {
    const {
        mediaChannel,
        action,
        message,
        logStatus,
        orgId,
        logEvent,
        logType,
        logTypeId,
    } = body;
    const logs = new Logs();

    logs.message = message;

    // logs.updateBy = idUserInt;
    if (projectId)
        logs.projectId = projectId;

    if (mediaChannel) {
        logs.mediaChannel = mediaChannel;
    }
    if (action) {
        logs.action = action;
    }
    if (logStatus) {
        logs.logStatus = logStatus;
    }
    if (logType) {
        logs.logType = logType;
    }

    if (logTypeId) {
        logs.logTypeId = logTypeId;
    }
    if (orgId) {
        logs.orgId = orgId;
    }

    if (logEvent)
        logs.logEvent = logEvent;

    const newLogs = logsRepo()
        .create(logs);

    const data = await logsRepo()
        .save(newLogs);

    return { data };
}

const getLogsIdService = async (input: ILog.ILogsId) => {
    const {
        logId,
        projectId,
    } = input;

    const result = await logsRepo()
        .createQueryBuilder("log")
        .where("log.idLogs=:logId", { logId })
        .orWhere("log.projectId=:projectId", { projectId })
        .getOne();

    return result;
};

const getLogsService = async (input: CommonTypesDef.ISortAndPagination<assetSortKeyEnum>, projectId: number): Promise<ILog.logData> => {
    const {
        pageNumber,
        pageSize,
    } = input;

    const offset = (Number(pageNumber) - 1) * Number(pageSize);
    const limit = Number(pageSize);

    input.sortKey = input.sortKey ? input.sortKey : assetSortKeyEnum.createdAt;
    input.sortType = input.sortType ? input.sortType : SortTypeEnum.DESC;

    const orderedBy = { [input.sortKey]: input.sortType };

    const [result, totalRecords] = await logsRepo()
        .findAndCount({
            where: { projectId },
            order: orderedBy,
            take: limit,
            skip: offset,
        });

    const totalPages = limit > 0 ? Math.ceil(totalRecords / limit) : 0;

    return {
        totalRecords,
        totalPages,
        items: result,
    };
};

export {

    saveLogsService,
    getLogsService,
    getLogsIdService,
};
