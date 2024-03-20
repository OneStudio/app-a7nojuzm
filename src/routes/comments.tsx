import NavLink from "~/tpl/NavLink"
import { getComments } from "~/lib/api.ts"
import CollectionList from "~/tpl/CollectionList"
export default function Comments() {
	return (<div class={"p-4 flex flex-col w-full h-full"}><div class={"h-[42px]"}><div nx-tag={"NavMenu"} class={"flex p-1"}><NavLink name={"home"} url={"/"} /><NavLink name={"comments"} url={"/commnts"} /><NavLink name={"add new"} url={"/add"} /></div></div><CollectionList loader={[getComments]} limit={10} offset={0}>{ (item) => <div nx-tag={"columns"} class={"flex p-4 h-full max-h-[200px] w-full border rounded-lg overflow-hidden mb-4"}><img nx-tag={"column"} src={"https://picsum.photos/300/200"} class={"h-full aspect-square bg-gray-200 rounded w-4/12"} /><div nx-tag={"column"} class={"flex flex-col gap-2 pl-3 w-8/12"}><div class={"font-medium text-xl"}>{item?.name ?? "{name}"}</div><div class={"flex gap-2 text-xs text-gray-400"}><div >12/12/2024</div><div >Category</div></div><div class={"text-sm text-gray-600 h-full"}>{item?.comment ?? "{comment}"}</div><div class={"text-sm text-gray-400 underline-dashed"}><a href={"#"} class={"text-blue-500 hover:underline"}>Read more{" "}</a></div></div></div>}</CollectionList></div>)
}