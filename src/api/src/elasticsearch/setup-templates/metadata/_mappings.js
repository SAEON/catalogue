export default {
  dynamic_templates: [
    {
      booleans: {
        mapping: {
          type: 'boolean',
        },
        match_mapping_type: 'boolean',
      },
    },
    {
      integers: {
        mapping: {
          type: 'long',
        },
        match_mapping_type: 'long',
      },
    },
    {
      doubles: {
        mapping: {
          type: 'double',
        },
        match_mapping_type: 'double',
      },
    },
    {
      strings: {
        mapping: {
          analyzer: 'saeon_text_fields',
          type: 'text',
          fields: {
            raw: {
              ignore_above: 256,
              type: 'keyword',
              normalizer: 'keyword_trimmed_lower',
            },
          },
        },
        match_mapping_type: 'string',
      },
    },
  ],
}
