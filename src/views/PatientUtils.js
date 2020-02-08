import qs from "qs";
import getEHRId from "../components/GetEHRId";

export function getSubjectId(locationSearch) {
    return qs.parse(locationSearch, { ignoreQueryPrefix: true }).subjectId ?
        qs.parse(locationSearch, { ignoreQueryPrefix: true }).subjectId : "9999999000"
}

export function loadEhrId() {
    let subjectId = getSubjectId(this.props.location.search);
    let promise = getEHRId(subjectId);
    promise.then((e) => {
        this.setState({ ehrId: e });
    });
}
