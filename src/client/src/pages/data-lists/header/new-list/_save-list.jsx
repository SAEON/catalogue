import { gql, useMutation } from '@apollo/client'
import SaveIcon from 'mdi-react/ContentSaveIcon'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'

export default ({ closeFn, title, description, createdBy }) => {
  const [saveList, { error, loading }] = useMutation(
    gql`
      mutation (
        $search: JSON!
        $createdBy: String!
        $type: ListType
        $title: String
        $description: String
      ) {
        saveList(
          search: $search
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
            }
          }
        `

        const { lists: existingLists } = cache.read({
          query,
        })

        cache.writeQuery({
          query,
          data: {
            lists: [...existingLists, newList],
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
            search: {},
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
          <SaveIcon size={18} />
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
