enum SortTypeEnum {
    ASC = "ASC",
    DESC = "DESC"
}
enum CommonQueryParams {
    pageNumber = "pageNumber",
    pageSize = "pageSize",
    sortType = "sortType",
    sortKey = "sortKey",
    searchKey = "searchKey",
    projectId = "projectId"
}

enum CommonEnum {
    projectId = "projectId",
    mediaChannel = "mediaChannel"
}

enum AutoSuggestionEnum {
    assets = "assets",
    googleAssets = "googleAssets",
    detailTargeting = "detailTargeting"
}
enum googleAdtypeEnum {
     brandProtection = "brandProtection",
     nonBrandProtection = "nonBrandProtection",
}

enum CountriesCommonEnum {
    type = "type",
    countries = "countries",
    keywords = "keywords",
}

export {
    SortTypeEnum,
    CommonQueryParams,
    CommonEnum,
    AutoSuggestionEnum,
    CountriesCommonEnum,
    googleAdtypeEnum,
};
