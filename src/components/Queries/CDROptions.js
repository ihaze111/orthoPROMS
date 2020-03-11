import environment from "../../environment";

const CDRHeaders = {
    'Ehr-Session-disabled': '{{Ehr-Session}}',
    'Content-Type': 'application/json',
    'Authorization': environment.api_authorisation,
};

const CDROptions = {
    generateRequestOptions(url) {
        return {
            'method': 'GET',
            'url': environment.api_url + url,
            headers: CDRHeaders,
        };
    },
    generateAxiosOptions(url) {
        return {
            method: 'get',
            url: environment.api_url + url,
            headers: CDRHeaders,
        };
    },
    generateQueryOptions(aql) {
        return {
            method: 'post',
            url:  environment.api_url + '/rest/v1/query',
            headers: CDRHeaders,
            data: JSON.stringify({
                "aql": aql
            })
        };
    },
    CDRHeaders: {
        'Ehr-Session-disabled': '{{Ehr-Session}}',
        'Content-Type': 'application/json',
        'Authorization': environment.api_authorisation,
    }
};

export default CDROptions;