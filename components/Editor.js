export default (props) => {
  if (typeof window !== 'undefined') {
    const Ace = require('react-ace').default;
    require('brace/mode/json');
    require('brace/theme/github');

    return <Ace {...props}/>
  }

  return null;
}
