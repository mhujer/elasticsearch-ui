export default (props) => {
  let type;
  if (props.health === 'green') {
    type = 'success';
  } else if (props.health === 'yellow') {
    type = 'warning';
  } else if (props.health === 'red') {
    type = 'error';
  } else {
    return null;
  }

  return (
    <span className={`badge badge-${type}`}>{props.health}</span>
  )
}
