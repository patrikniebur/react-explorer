# About
This project explores GitHub's GraphQL API.

## Getting Started
Using standard npm project tools, run `npm install` in the project folder, and use `npm start` to begin development.

### Environment Variables
Variables are predefined in the `.env_sample` file with sensitive details omitted. Rename it to `.env` and fill in the missing details. `REACT_APP_GRAPHQL_TOKEN` is a required authentication token for the GitHub API - [see docs](https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#authenticating-with-graphql).

## Running in Docker
A Docker image has been set up to serve the files by default, but it can also be used to run tests. Follow these steps:
- Make sure the `.env` file is available since it is used for image building. Run `docker build -t react-explorer .` to build the image.
- Start the container with `docker run -it --rm -p 3000:3000 react-explorer`. This will serve files on port 3000.
- Tests can be run by providing the test command: `docker run --rm react-explorer npm test -- --watchAll=false`
