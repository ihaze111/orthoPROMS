import environment from "../environment";

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
    generateQueryOptions(aql) {
        return {
            'method': 'POST',
            'url': environment.api_url + '/rest/v1/query',
            headers: CDRHeaders,
            body: JSON.stringify({
                "aql": aql
            })
        };
    }
};

export default CDROptions;
