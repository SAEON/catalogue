import { memo } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'
import { DataGrid } from '@mui/x-data-grid'

export default memo(({ permissions }) => {
  const theme = useTheme()

  return (
    <Card
      style={{ border: 'none', width: '100%', backgroundColor: theme.backgroundColor }}
      variant="outlined"
    >
      <CardContent style={{ padding: 0 }}>
        <div style={{ height: 1000 }}>
          <DataGrid
            pageSize={25}
            rowHeight={theme.spacing(5)}
            columns={[
              {
                field: 'id',
                sortable: false,
                filterable: false,
                disableColumnMenu: true,
                headerName: 'ID',
                width: 50,
              },
              { field: 'name', headerName: 'Name', width: 200 },
              {
                field: 'description',
                headerName: 'Description',
                flex: 1,
                sortable: false,
                filterable: false,
                disableColumnMenu: true,
              },
            ]}
            rows={permissions.map(({ id, name, description }) => ({ id, name, description }))}
          />
        </div>
      </CardContent>
    </Card>
  )
})
