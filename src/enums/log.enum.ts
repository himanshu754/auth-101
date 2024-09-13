enum logEnum {
    idLogs = "idLogs",
    mediaChannel = "mediaChannel",
    adAccount = "adAccount",
    action = "action",
    message = "message",
    type = "type",
    ruleId = "ruleId",
    userRef = "userRef",
    accountRef = "accountRef",
    projectId = "projectId",
    createdAt = "createdAt",
    updatedAt = "updatedAt",

}

enum logIdEnum {
    logId = "logId",
    projectId = "projectId"
}

enum logTypeEnum {
    Error = "Error",//live
    Success = "Success",
}

export {
    logEnum,
    logIdEnum,
    logTypeEnum,
};
