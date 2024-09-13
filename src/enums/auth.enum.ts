enum userEnum {
    IdUserInt = "idUserInt",
    firstName = "firstName",
    lastName = "lastName",
    email = "email",
    mobile = "mobile",
    isPasswordCreated = "isPasswordCreated",
    passwordHash = "passwordHash",
    password = "password",
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    status = "status",
    token = "token",
    oldPassword = "oldPassword",
    taxId = "taxId",
    vatNo = "vatNo",
    companyName = "companyName",
    marketingConsent = "marketingConsent",
    termsAndConditions = "termsAndConditions"
}
enum TOKEN_TYPE {
    ACCESS_TOKEN = "ACCESS_TOKEN",
    REFRESH_TOKEN = "REFRESH_TOKEN",
    INVITED_USER = "INVITED_USER",
    RESET_PASSWORD = "RESET_PASSWORD",
    TEMP_TOKEN = "TEMP_TOKEN"
}

enum APP_TYPE {
    META = "META",
    GOOGLE = "GOOGLE",
    TIKTOK = "TIKTOK",
    SNAPCHAT = "SNAPCHAT"
}

enum inviteMemberEnum {
    email = "email",
    permission = "permission",
    role = "role",
}

enum PermissionEnum {
    fullAccess = "fullAccess",//live
    limitedAccess = "limitedAccess",
    noAccess = "noAccess"
}
enum RoleEnum {
    owner = "owner",//live
    user = "user",
    admin = "admin"
}

enum memberUpdateEnum {
    idUserInt = "idUserInt",
    firstName = "firstName",
    lastName = "lastName",
    mobile = "mobile",
    password = "password",
    status = "status",
    projectId = "projectId",
    projectIds = "projectIds",
    role = "role"

}
enum UserStatusEnum {
    Active = "Active",
    Inactive = "Inactive",
    Invited = "Invited"
}

enum userUpdateEnum {
    idUserInt = "idUserInt",
    firstName = "firstName",
    lastName = "lastName",
    email = "email",
    mobile = "mobile",
    profilePic = "profilePic",
    vatNo = "vatNo",
    taxId = "taxId",
    companyName = "companyName",
    marketingConsent = "marketingConsent",
    termsAndConditions = "termsAndConditions"

}

export {
    TOKEN_TYPE,
    userEnum,
    APP_TYPE,
    inviteMemberEnum,
    PermissionEnum,
    RoleEnum,
    userUpdateEnum,
    UserStatusEnum,
    memberUpdateEnum,
};
