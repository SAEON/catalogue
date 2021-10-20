export default data =>
  data.map(
    ({
      id,
      sid,
      doi,
      institution_key: institution,
      collection_key: collection,
      schema_key: schema,
      metadata = {},
      published,
      errors = {},
      ...otherFields
    }) => {
      const { originalMetadata, ...otherMetadataFields } = metadata

      return {
        id,
        doi,
        institution,
        collection,
        schema,
        published,
        sid,
        errors: JSON.stringify(errors),
        ...otherMetadataFields,
        ...otherFields,
      }
    }
  )
