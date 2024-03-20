
import { createEffect, createSignal } from 'solid-js';
import { isServer, Show, For } from 'solid-js/web';
import { createAsync } from "@solidjs/router";

export default function CollectionList(props: { loader?: [any, any], children?:any }) {
  const loaderFunc = props?.loader?.[0];
  const args = props?.loader?.[1];
  const data = createAsync(async () => {
    if (!loaderFunc) return Promise.resolve({});
    if(!isServer && window?.$$mode !== 'preview') {
      return {
        columns: [],
        columnTypes: [],
        rows: [],
      }
    }
    const data = args ? await loaderFunc(args) : await loaderFunc();
    return data
  });

  const children = (row: any) => {
    const children = props?.children?.(row)
    if(!children) return <div data-com class='flex flex-col items-center justify-center h-36 border bg-gray-100'>Drop a Block</div>
    return children;
  };


  return (
    <div data-com class='flex flex-col text-m relative h-full w-full'>
      <Show when={!loaderFunc}>
        <div data-com class='flex flex-col items-center justify-center h-12 border bg-gray-100'>
          <div data-com class='text-lui-400'>Loader function not provided to Collection List</div>
        </div>
      </Show>
      <For each={data()?.rows ?? []} fallback={<div data-com>{children([])}</div>}>
        {(row) => props?.children?.(row)}
      </For>
    </div>);
}
