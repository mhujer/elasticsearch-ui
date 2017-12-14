import Link from 'next/link'

export default (props) => (
  <ul className="nav nav-pills ournavmenu">
    <li className="nav-item">
      <Link href="/">
        <a className={`nav-link ${props.active === 'index' ? 'active' : ''}`}>Cluster Status</a>
      </Link>
    </li>
    <li className="nav-item">
      <Link href="/query">
        <a className={`nav-link ${props.active === 'query' ? 'active' : ''}`} >Interactive Query UI</a>
      </Link>
    </li>
  </ul>
);
