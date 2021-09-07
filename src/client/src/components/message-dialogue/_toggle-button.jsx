import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge'
import InfoIcon from 'mdi-react/InformationVariantIcon'

const IconButtonType = ({
  disabled,
  ariaLabel,
  id,
  setOpen,
  open,
  badgeProps,
  icon,
  ...iconProps
}) => {
  return (
    <IconButton
      disabled={disabled}
      aria-label={ariaLabel}
      aria-controls={id}
      aria-haspopup="true"
      aria-expanded={open}
      onClick={e => {
        e.stopPropagation()
        setOpen(!open)
      }}
      {...iconProps}
    >
      {badgeProps ? (
        badgeProps._component ? (
          <badgeProps._component {...badgeProps}>
            {icon || <InfoIcon size={18} />}
          </badgeProps._component>
        ) : (
          <Badge {...badgeProps}>{icon || <InfoIcon size={18} />}</Badge>
        )
      ) : (
        icon || <InfoIcon size={18} />
      )}
    </IconButton>
  )
}

const NormalButtonType = ({ disabled, ariaLabel, id, setOpen, open, ...buttonProps }) => {
  return (
    <Button
      disabled={disabled}
      aria-label={ariaLabel}
      aria-controls={id}
      aria-haspopup="true"
      aria-expanded={open}
      onClick={e => {
        e.stopPropagation()
        setOpen(!open)
      }}
      {...buttonProps}
    />
  )
}

export default ({ buttonType, badgeProps, ...props }) => {
  if (buttonType === 'icon') {
    return <IconButtonType badgeProps={badgeProps} {...props} />
  }

  return <NormalButtonType {...props} />
}
