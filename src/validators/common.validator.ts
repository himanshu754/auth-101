import {
    body,
    param, query,
} from "express-validator";

import {
    AutoSuggestionEnum,
    CommonEnum, CommonQueryParams, CountriesCommonEnum,
} from "enums/common.enum";
import { commonMessages } from "helpers/messageConstants/commonMessages";

const getS3SignedUrlValidator = () => [
    param("fileName")
        .exists()
        .isString(),
];
const commonPaginationValidator = () => [
    query(CommonQueryParams.pageNumber)
        .exists()
        .withMessage(commonMessages.INVALID_PAGENUMBER)
        .isNumeric()
        .withMessage(commonMessages.INVALID_PAGENUMBER)
        .isInt({ min: 1 }),
    query(CommonQueryParams.pageSize)
        .exists()
        .withMessage(commonMessages.INVALID_PAGESIZE)
        .isNumeric()
        .withMessage(commonMessages.INVALID_PAGESIZE)
        .isInt({ min: 1 }),
    query(CommonQueryParams.sortKey)
        .exists()
        .isString(),
    query(CommonQueryParams.searchKey)
        .optional()
        .isString(),
    query(CommonQueryParams.sortType)
        .exists()
        .isString(),
];

const paginationValidator = () => [
    ...commonPaginationValidator(),
    param(CommonQueryParams.projectId)
        .exists()
        .isNumeric()
        .withMessage(commonMessages.INVALID_DATA),
];

const getAllBulkCreation = () => [
    ...paginationValidator(),
    query("refresh")
        .optional()
        .default(false),
];
const projectValidator = () => [
    param(CommonEnum.projectId)
        .exists()
        .isNumeric(),
];

const autoSuggestionValidator = () => [
    param("type")
        .exists()
        .custom(key => Object.values(AutoSuggestionEnum)
            .includes(key)),
    query("url")
        .exists()
        .isString(),
];

const countriesValidator = () => [
    body(CountriesCommonEnum.type)
        .exists()
        .isString(),
    body(CountriesCommonEnum.countries)
        .optional()
        .isArray(),
    body(CountriesCommonEnum.keywords)
        .optional()
        .isString(),
];

export {
    getS3SignedUrlValidator,
    paginationValidator,
    commonPaginationValidator,
    projectValidator,
    autoSuggestionValidator,
    getAllBulkCreation,
    countriesValidator,
};
