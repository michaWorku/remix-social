import { ComponentPropsWithoutRef } from "react"

export type Props = ComponentPropsWithoutRef<'div'> & {
    header?: string | null
}