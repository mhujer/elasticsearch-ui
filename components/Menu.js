export default (props) => (
  <ul className="nav nav-pills">
    <li className="nav-item">
      <a className={`nav-link ${props.active === 'index' ? 'active' : ''}`} href="/">Status</a>
    </li>
    <li className="nav-item">
      <a className={`nav-link ${props.active === 'query' ? 'active' : ''}`} href="/query">Query UI</a>
    </li>
  </ul>
);
