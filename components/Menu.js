import Link from 'next/link'

export default (props) => (
  <ul className="nav nav-pills">
    <li className="nav-item">
      <Link href="/">
        <a className={`nav-link ${props.active === 'index' ? 'active' : ''}`}>Status</a>
      </Link>
    </li>
    <li className="nav-item">
      <Link href="/query">
        <a className={`nav-link ${props.active === 'query' ? 'active' : ''}`} >Query UI</a>
      </Link>
    </li>
  </ul>
);
