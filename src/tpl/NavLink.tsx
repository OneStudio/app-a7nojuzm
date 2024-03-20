
import { A, useNavigate } from '@solidjs/router';
import { createSignal } from 'solid-js';
export default function NavLink(props: { name: string; url: string; children?: any }) {
  let linkRef!: any;
  const navigate = useNavigate();
  const [expanded, expand] = createSignal("");
  const onMouseEnter = (e: any) => {
    e.preventDefault();
    expand(props.name);
    const target = e.target;
    const menuItem = !!target?.parentElement?.hasAttribute("data-menu");
    if (menuItem) {
      const secondChild = target?.children[1];
      secondChild.style.top = "0px";
      secondChild.style.left = target.offsetWidth + "px";
    }
  };
  
  return (
    <Show when={props?.children} fallback={<button data-com onClick={()=>navigate(props?.url)} class='px-4 py-1 border-b-1 hover:border-blue-600'>{props.name}</button>}>
      <div data-menuitem ref={linkRef} class='relative' onMouseEnter={onMouseEnter} onMouseLeave={() => expand("")}>
        <button data-com class='px-2 py-1 border-b-1 hover:border-blue-600'>{props.name}</button>
        <Show when={props?.expanded || expanded() === props.name}>
          <div data-com class='flex flex-col absolute shadow'>
            {props.children}
          </div>
        </Show>
      </div>
    </Show>
  );
}