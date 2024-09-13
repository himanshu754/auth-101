declare namespace CommonTypesDef {

  interface CommonResponseType<T> {
    data?: T;
    error?: any;
    message?: string;
    status?: number;
  }

  // For Frontend Body
  interface CommonResponsePayloadType<T> {
    message?: string;
    data: T | null;
    error?: any;
  }

  interface IApiResponseData<T> {
    items: T[];
    totalPages: number;
    totalRecords: number;
  }

  interface IPagination {
    pageNumber: number;
    pageSize: number;
  }
  interface IParams {
    id: number;
  }

  interface IOrderType {
    [key: string]: 'ASC' | 'DESC'
  }
  interface ISortAndPagination<T> extends IPagination {
    sortKey: T;
    sortType: 'ASC' | 'DESC';
    searchKey?: string;
    projectId: number;
    refresh?: boolean
  }

  interface ISortType<T> {
    sortKey: T;
    sortType: 'ASC' | 'DESC'
  }

  interface ITokenError {
    hasError: boolean;
    errCode: number | null;
    errMessage: string | null;
    verifiedToken?: any
  }

  interface IJsonToExcelItem {
    name: string;
    data: any[];
    opts?: any
  }

  interface IKeyValuePair {
    [key: string]: any;
  }

  interface IDbDates {
    createdAt: string;
    updatedAt: string;
  }
  interface IMetaErrorResponse {
    response: {
      data: {
        error:
        {
          message: string;
          type: string;
          code: number;
          error_subcode: number;
        }
      }
    }
  }

  interface ITiktokErrorResponse {
          code: number;
          message: string;
          request_id: string;
          data: object
  }
}
//   interface IGetSignedurlData{
//     url: string;
//     params: {
//         Bucket: string;
//         Key: string;
//         Expires: number;
//     };
//   }
//   interface IGetSignedurlRes{
//     message: string;
//     data: IGetSignedurlData[]
//   }
// }

interface IDbConfig {
  dbHost: string;
  dbUserName: string;
  dbPassword: string;
  dbName: string;
}

interface SendHubspotEmailOptions {
  to: string;
  from?: string;
  replyTo?: string[];
  cc?: string[];
  bcc?: string[];
}

interface PublicSingleSendRequestWithId {
  emailId: number;
  message: SendHubspotEmailOptions;
  customProperties?: Record<string, string>;
}

interface CityData {
  key: string;
  name: string;
  type: string;
  country_code: string;
  country_name: string;
  region?: string;
  region_id: number;
  supports_region: boolean;
  supports_city: boolean;
}


interface CityInfo {
  key: string;
  name: string;
  type: string;
  country_code: string;
  country_name: string;
  region_id: number;
  supports_region: boolean;
  supports_city: boolean;
  region: string;
}

interface ExchangeRate {
  baseCode: string;
  lastUpdated: string;
  currencyCode: string;
  conversionRate: number;
  offset?: number;
}