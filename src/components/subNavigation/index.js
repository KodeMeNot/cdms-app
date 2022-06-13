import { h } from 'preact';
import { Link } from 'preact-router/match';

const SubNavigation = (props) => {

  return (
    <div class="sub-nav">
      <ul class="outer-list-sub-nav">
        {
          props.subNavMenu.map((subNav) => (
            <Link href={subNav.path} onClick={() => props.closeSubNav()}>
              <li class="cursor-pointer">
                <em class={subNav.icon} /> <span>{subNav.label}</span>
              </li>
            </Link>
          ))
        }
      </ul>
    </div>
  );
};

export default SubNavigation;
