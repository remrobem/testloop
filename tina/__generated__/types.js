export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const EventPartsFragmentDoc = gql`
    fragment EventParts on Event {
  __typename
  title
  date
  day
  locationName
  locationAddress
  locationCity
  locationState
  locationZip
  bodyColor
  backgroundColor
  bodyFont
  title1Font
  title2Font
  title1Color
  title2Color
  image
  map
  body
}
    `;
export const EventDocument = gql`
    query event($relativePath: String!) {
  event(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...EventParts
  }
}
    ${EventPartsFragmentDoc}`;
export const EventConnectionDocument = gql`
    query eventConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: EventFilter) {
  eventConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...EventParts
      }
    }
  }
}
    ${EventPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    event(variables, options) {
      return requester(EventDocument, variables, options);
    },
    eventConnection(variables, options) {
      return requester(EventConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
