import { PieChart } from "react-minimal-pie-chart";
import { objectEntries } from "ts-extras";

type Color = string
type Key<T extends string> = Exclude<T, 'theme'>
type Theme<T extends string> = { [k in Key<T>]: Color }
type Props<T extends string> = {
    theme: Theme<T>,
} & {
    [k in T]: number | Theme<T>
}

export default function Doughnut <T extends string>({ theme, ...record}: Props<T>) {
    const entries = objectEntries(record).map(([ key, value ]) => {
        return {
            title: key,
            value: value as number,
            color: theme[key as Key<T>],
        }
    })

    return <PieChart data={entries} lineWidth={40} paddingAngle={3} />
}