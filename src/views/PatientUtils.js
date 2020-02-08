import qs from "qs";

export function getSubjectId(locationSearch) {
    return qs.parse(locationSearch, { ignoreQueryPrefix: true }).subjectId ?
        qs.parse(locationSearch, { ignoreQueryPrefix: true }).subjectId : "9999999000"
}
