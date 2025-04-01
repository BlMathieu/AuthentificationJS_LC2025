import { FormEvent, ReactElement } from "react"

interface formParams {
    handleForm: (event: FormEvent) => void,
    children?:ReactElement
}
export default function BaseForm(props: formParams): ReactElement {
    return <>
        <form className="flex flex-col justify-center bg-[#0A2626] border-1 p-5 m-2 min-h-86 [&>fieldset>div]:m-4" onSubmit={props.handleForm}>
            {props.children}
        </form>
    </>
}