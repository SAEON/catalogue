import { gql, useMutation } from '@apollo/client'
import { ContentSave as SaveIcon } from '../../../../components/icons'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'

export default ({ closeFn, title, description, createdBy }) => {
  const [saveList, { error, loading }] = useMutation(
    gql`
      mutation (
        $filter: JSON
        $createdBy: String!
        $type: ListType
        $title: String
        $description: String
      ) {
        saveList(
          filter: $filter
          createdBy: $createdBy
          type: $type
          title: $title
          description: $description
        ) {
          id
          title
          description
        }
      }
    `,
    {
      update: (cache, { data: { saveList: newList } }) => {
        const query = gql`
          query {
            lists {
              id
              title
              description
            }
          }
        `

        const { lists: existingLists } = cache.read({
          query,
        })

        const merged = [...existingLists, newList]

        cache.writeQuery({
          query,
          data: {
            lists: merged,
          },
        })

        closeFn()
      },
    }
  )

  if (error) {
    throw error
  }

  return (
    <Button
      onClick={() =>
        saveList({
          variables: {
            createdBy,
            filter: { dois: ['doi1', 'doi2', 'doi3', 'etc...'] },
            description,
            title,
            type: 'curated',
          },
        })
      }
      startIcon={
        loading ? (
          <CircularProgress thickness={2} size={18} style={{ margin: '0 15px' }} />
        ) : (
          <SaveIcon fontSize="small" />
        )
      }
      variant="text"
      size="small"
      disableElevation
    >
      Save new list
    </Button>
  )
}
