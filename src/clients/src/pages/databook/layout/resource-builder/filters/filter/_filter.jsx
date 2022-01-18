import { useState } from 'react'
import AutoComplete from '../../../../../../components/dropdown-select'
import { useTheme } from '@mui/material/styles'

export default ({ filter }) => {
  const theme = useTheme()
  const { id, name, values } = filter
  const [selectedValues, setSelectedValues] = useState([])

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(8),
      }}
    >
      <div
        style={{
          border: `1px solid ${theme.palette.grey[200]}`,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: theme.spacing(8),
        }}
      >
        <AutoComplete
          options={values}
          selectedOptions={selectedValues}
          setOption={newValues => {
            setSelectedValues(newValues)
          }}
          label={name}
          style={{ position: 'relative', top: -16 }}
        />
      </div>
    </div>
  )
}
