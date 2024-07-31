import { Key, ReactNode } from "react"
import { list } from "@/style"

type Props<T extends Record<string, unknown>> = {
    template: (item: T) => ReactNode,
    items: T[] | null,
}

export const UnorderedList = <T extends { id: Key }> ({ items, template }: Props<T>) => items
    ? <ul className={list}>{ items.map(item => <li key={item.id}>{template(item)}</li>) }</ul>
    : null