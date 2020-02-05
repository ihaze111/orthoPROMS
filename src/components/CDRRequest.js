import environment from "../environment";

const headers = {
    'Ehr-Session-disabled': '{{Ehr-Session}}',
    'Content-Type': 'application/json',
    'Authorization': environment.api_authorisation,
};

const CDRRequest = {
    generateRequestOptions(url) {
        return {
            'method': 'GET',
            'url': environment.api_url + url,
            headers,
        };
    },
    generateQueryOptions(aql) {
        return {
            'method': 'POST',
            'url': environment.api_url + '/rest/v1/query',
            headers,
            body: JSON.stringify({
                "aql": aql
            })
        };
    }
};

export default CDRRequest;
