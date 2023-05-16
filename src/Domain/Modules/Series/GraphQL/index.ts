import seriesTypes from "./seriesTypes.schema";
import seriesQueries from "./seriesQueries.schema";
import seriesMutations from "./seriesMutations.schema";

export default `
    ${seriesTypes}
    ${seriesQueries}
    ${seriesMutations}        
`;
