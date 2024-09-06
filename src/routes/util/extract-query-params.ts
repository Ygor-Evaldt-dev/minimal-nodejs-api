export function extractQueryParams(query: string) {
    return query?.substr(1).split("&").reduce((queryParams: any, param: string) => {
        const [key, value] = param.split("=");
        queryParams[decodeURIComponent(key)] = decodeURIComponent(value);

        return queryParams;
    }, {});
}