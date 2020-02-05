import CDRRequest from "./CDRRequest";
const request = require('request-promise');

async function getTemplate() {
    let processedResult = [];
    const options = CDRRequest.generateRequestOptions("/rest/v1/template/Foot_and_Ankle_PROMs-v0");
    await request(options, function (error, response) {
            if (error) throw new Error(error);
            const result = JSON.parse(response.body);
            const listOfQuestions = result.webTemplate.tree.children[1].children;
            listOfQuestions.forEach((e) => {
                    const labels = [];
                    let name, description;
                    if ('localizedNames' in e) {
                        name = 'en' in e.localizedNames ? e.localizedNames.en : e.name;
                    } else {
                        name = e.name;
                    }
                    if ('localizedDescriptions' in e) {
                        description = 'en' in e.localizedDescriptions ? e.localizedDescriptions.en : "";
                    } else {
                        description = "";
                    }
                    if ('inputs' in e) {
                        if ('list' in e.inputs[0]) {
                            let inputsList = e.inputs[0].list;
                            inputsList.forEach((f) => {
                                labels.push(f.label);
                            });
                        }
                        if (e.inputs[0].type === "CODED_TEXT") {
                            processedResult.push({ inputType: "radio", name, description, labels });
                        } else if (e.inputs[0].type === "TEXT") {
                            processedResult.push({ inputType: "text", name, description });
                        }
                    }
                }
            )
            ;
        }
    );
    return processedResult;
}

export default getTemplate;
