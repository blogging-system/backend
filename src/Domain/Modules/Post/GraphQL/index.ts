import postTypes from "./postTypes.schema";
import postQueries from "./postQueries.schema";
import postMutations from "./postMutations.schema";

export default `
    ${postTypes}
    ${postQueries}
    ${postMutations}        
`;
