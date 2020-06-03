import Button from '@material-ui/core/Button';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { selectedItems } = props;
  const numSelected = selectedItems.length;
  const toolbarClassName = `${classes.root} ${
    numSelected > 0 ? classes.highlight : ''
  }`;

  return (
    <Toolbar className={toolbarClassName}>
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : null}

      {numSelected > 0 ? (
        <Tooltip title={props.deleteButtonTitle}>
          <Button
            color="secondary"
            variant="contained"
            aria-label={props.deleteButtonTitle}
            onClick={() =>
              props.onDeleteClick(
                selectedItems.map(item => item.id),
                props.deselectAll,
              )
            }
          >
            {props.deleteButtonTitle}
          </Button>
        </Tooltip>
      ) : (
        <Tooltip title={props.addButtonTitle}>
          <Button
            color="primary"
            variant="contained"
            aria-label={props.addButtonTitle}
            onClick={props.onAddClick}
          >
            {props.addButtonTitle}
          </Button>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.defaultProps = {
  onAddClick: () => {},
  onDeleteClick: () => {},
};

EnhancedTableToolbar.propTypes = {
  addButtonTitle: PropTypes.string,
  deleteButtonTitle: PropTypes.string,
  selectedItems: PropTypes.array.isRequired,
  onAddClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  deselectAll: PropTypes.func,
};

export { EnhancedTableToolbar };
