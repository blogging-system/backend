### My Blog REST API (2023)

#### My Stack:

- Typescript
- NodeJS/ ExpressJS
- MongoDB

#### Architecture Explanation

- `/src/server.ts` is for handling everything related to the server itself.
- `/src/app.ts` is for handling anything related to the **express app** itself.

---

#### Don't forget:

- Close the graphql introspection!!!! ([Security concern]('https://youtu.be/viWzbPuGqpo'))
- Close DB ACCESS cloud!!
- I think, It would be better if we call every service model schema docs keys(title, name) **"label"**, it would be easier and no double check for what service are we useing etc...
- [Take a look here]('https://www.builder.io/blog/safe-data-fetching')
