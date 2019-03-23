import gql from 'graphql-tag'

export default gql`
  type Archivist {
    id: String
    dns: String
    port: Int
  }

  extend type Query {
    publicKey: String
    paymentKey: String
    defaultArchivist: Archivist
    archivists: [Archivist]
  }

  extend type Mutation {
    setDefaultArchivist(id: String): Archivist
    attachArchivist(dns: String, port: Int): Archivist
    detachArchivist(id: String): Archivist
  }
`