import postTypes from "./post.types";
import postQueries from "./postQueries";
import postMutations from "./postMutations";

export default `
    ${postTypes}
    ${postQueries}
    ${postMutations}        
`;
