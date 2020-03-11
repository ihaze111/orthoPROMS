import React from "react";

export function NHSTd(props) {
    return <td className="nhsuk-table__cell" {...props} />;
}

export function NHSTh(props) {
    return <th className="nhsuk-table__header" scope="col" {...props} />;
}

export function NHSTr(props) {
    return <tr className="nhsuk-table__row" {...props} />;
}

export function NHSTBody(props) {
    return <tbody className="nhsuk-table__body" {...props} />;
}

export function NHSTHead(props) {
    return <thead className="nhsuk-table__head" {...props} />;
}

export function NHSTableCaption(props) {
    return <caption className="nhsuk-table__caption" {...props}/>;
}

export function NHSTable(props) {
    return <table className="nhsuk-table" style={{textAlign: 'left'}} {...props} />
}

export function NHSTableWrapper(props) {
    return <div className="nhsuk-table-responsive" {...props} />
}

export function NHSTableWrapperTest() {
    return <NHSTableWrapper>
        <NHSTable>
            <NHSTableCaption>Skin symptoms and possible causes</NHSTableCaption>
            <NHSTHead>
            <NHSTr>
                <NHSTh>Skin symptoms</NHSTh>
                <NHSTh>Possible cause</NHSTh>
            </NHSTr>
            </NHSTHead>
            <NHSTBody>
            <NHSTr>
                <NHSTd>Blisters on lips or around the mouth</NHSTd>
                <NHSTd>cold sores</NHSTd>
            </NHSTr>
            <NHSTr>
                <NHSTd>Itchy, dry, cracked, sore</NHSTd>
                <NHSTd>eczema</NHSTd>
            </NHSTr>
            <NHSTr>
                <NHSTd>Itchy blisters</NHSTd>
                <NHSTd>shingles, chickenpox</NHSTd>
            </NHSTr>
            </NHSTBody>
        </NHSTable>
    </NHSTableWrapper>;
}
