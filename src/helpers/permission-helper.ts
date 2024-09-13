import { RoleEnum } from "enums/auth.enum";

enum PERMISSION_MODULE {
    ADD_PROJECT = "ADD_PROJECT",
    UPDATE_PROJECT = "UPDATE_PROJECT",
    DELETE_PROJECT = "DELETE_PROJECT",
    VIEW_PROJECT = "VIEW_PROJECT",
    INVITE_MEMBER = "INVITE_MEMBER",
    UPDATE_ROLE = "UPDATE_ROLE",
    VIEW_TEAM_MEMBER = "VIEW_TEAM_MEMBER",
    UPDATE_TEAM_NAME = "UPDATE_TEAM_NAME",
    UPDATE_TEAM_PROJECT = "UPDATE_TEAM_PROJECT",
    DEACTIVATE_ACCOUNT ="DEACTIVATE_ACCOUNT",
    ADD_CONNECTION = "ADD_CONNECTION",
    GET_CONNECTION = "GET_CONNECTION",
    UPDATE_CONNECTION = "UPDATE_CONNECTION",
    DELETE_CONNECTION = " DELETE_CONNECTION",
    ADD_RULES = "ADD_RULES",
    UPDATE_RULES = "UPDATE_RULES",
    VIEW_RULES = "VIEW_RULES",
    LIVE_DRAFT_RULES ="LIVE_DRAFT_RULES",
    ADD_ASSET = "ADD_ASSET",
    UPDATE_ASSET = "UPDATE_ASSET",
    VIEW_ASSET = "VIEW_ASSET",
    ADD_CUSTOM_METRICS = "ADD_CUSTOM_METRICS",
    UPDATE_CUSTOM_METRICS = "UPDATE_CUSTOM_METRICS",
    VIEW_CUSTOM_METRICS = "VIEW_CUSTOM_METRICS",
    ADD_CUSTOM_TIMEFRAME = "ADD_CUSTOM_TIMEFRAME",
    UPDATE_CUSTOM_TIMEFRAME = "UPDATE_CUSTOM_TIMEFRAME",
    VIEW_CUSTOM_TIMEFRAME = "VIEW_CUSTOM_TIMEFRAME",
    ADD_BULK_CREATION = "ADD_BULK_CREATION",
    UPDATE_BULK_CREATION = "UPDATE_BULK_CREATION",
    VIEW_BULK_CREATION = "VIEW_BULK_CREATION",
    MY_PROFILE = "MY_PROFILE",
    BILLING = "BILLING",
}

type IPermissions = {
    [key in PERMISSION_MODULE]: {
        [key in RoleEnum]: boolean;
    }
}

const Permissions: IPermissions = {
    [PERMISSION_MODULE.ADD_CONNECTION]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: false,
    },
    [PERMISSION_MODULE.GET_CONNECTION]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: true,
    },
    [PERMISSION_MODULE.ADD_PROJECT]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: false,
    },
    [PERMISSION_MODULE.UPDATE_PROJECT]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: false,
    },
    [PERMISSION_MODULE.DELETE_PROJECT]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: false,
    },
    [PERMISSION_MODULE.VIEW_PROJECT]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: true,
    },
    [PERMISSION_MODULE.INVITE_MEMBER]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: false,
    },
    [PERMISSION_MODULE.VIEW_TEAM_MEMBER]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: false,
    },
    [PERMISSION_MODULE.UPDATE_TEAM_NAME]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: false,
    },
    [PERMISSION_MODULE.UPDATE_TEAM_PROJECT]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: false,
    },
    [PERMISSION_MODULE.UPDATE_ROLE]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: false,
    },
    [PERMISSION_MODULE.DEACTIVATE_ACCOUNT]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: false,
    },
    [PERMISSION_MODULE.UPDATE_CONNECTION]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: false,
    },
    [PERMISSION_MODULE.DELETE_CONNECTION]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: false,
    },
    [PERMISSION_MODULE.ADD_RULES]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: true,
    },
    [PERMISSION_MODULE.UPDATE_RULES]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: true,
    },
    [PERMISSION_MODULE.VIEW_RULES]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: true,
    },
    [PERMISSION_MODULE.LIVE_DRAFT_RULES]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: true,
    },
    [PERMISSION_MODULE.ADD_ASSET]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: true,
    },
    [PERMISSION_MODULE.UPDATE_ASSET]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: true,
    },
    [PERMISSION_MODULE.VIEW_ASSET]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: true,
    },
    [PERMISSION_MODULE.ADD_CUSTOM_METRICS]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: true,
    },
    [PERMISSION_MODULE.UPDATE_CUSTOM_METRICS]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: true,
    },
    [PERMISSION_MODULE.VIEW_CUSTOM_METRICS]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: true,
    },
    [PERMISSION_MODULE.ADD_CUSTOM_TIMEFRAME]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: true,
    },
    [PERMISSION_MODULE.UPDATE_CUSTOM_TIMEFRAME]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: true,
    },
    [PERMISSION_MODULE.VIEW_CUSTOM_TIMEFRAME]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: true,
    },
    [PERMISSION_MODULE.ADD_BULK_CREATION]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: true,
    },
    [PERMISSION_MODULE.UPDATE_BULK_CREATION]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: true,
    },
    [PERMISSION_MODULE.VIEW_BULK_CREATION]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: true,
    },
    [PERMISSION_MODULE.MY_PROFILE]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: true,
    },
    [PERMISSION_MODULE.BILLING]: {
        [RoleEnum.owner]: true,
        [RoleEnum.admin]: true,
        [RoleEnum.user]: true,
    },
};

export {
    Permissions,
    PERMISSION_MODULE,
};
