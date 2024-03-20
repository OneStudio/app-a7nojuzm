import NavLink from "~/tpl/NavLink"
import SingleLineText from "~/tpl/SingleLineText"
import { createComment } from "~/lib/api.ts"
import QuickForm from "~/tpl/QuickForm"
export default function Add() {
	return (<div class={"p-4 flex flex-col w-full h-full"}><div nx-tag={"NavMenu"} class={"flex p-1"}><NavLink name={"home"} url={"/"} /><NavLink name={"comments"} url={"/comments"} /><NavLink name={"add comment"} url={"/add"} /></div><QuickForm title={"Form Title"} loader={null} action={createComment} columns={1} submit={"Submit"} _droppable={true}>{ (values) => <div ><SingleLineText name={"name"} value={values?.name} label={"name"} placeholder={"Enter text..."} required={false} span={1} /><SingleLineText name={"comment"} value={values?.comment} label={"comment"} placeholder={"Enter text..."} required={false} span={1} /></div>}</QuickForm></div>)
}