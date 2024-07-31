import { seed, rand, randFood, randNumber, randUuid } from "@ngneat/falso";
import Searcher from "fuzzy-search";

const initial = (() => {
    const DATA_SEED = "QA_MOCK_DATA_SEED"
    const dataSeed = process.env[DATA_SEED]

    if (!dataSeed?.length)
        throw Error(`${DATA_SEED}: ${dataSeed}`)

    return seed(dataSeed)
})()

type UnitVolume = 'ml'
type UnitWeight = 'g'

type Macro = 'carbs' | 'fat' | 'protein'
type Unit = UnitVolume | UnitWeight

export type Product = {
    name: string,
    id: string,
    unit: {
        type: Unit,
        quantity: number,
    },
    energy: number,
    macros: {
        [k in Macro]: number
    }
}

const productCount = (() => {
    const PRODUCT_COUNT = "QA_MOCK_PRODUCT_COUNT"
    const productCount = parseInt(process.env[PRODUCT_COUNT]!)

    if (Number.isNaN(productCount))
        throw Error(`${PRODUCT_COUNT}: ${productCount}`)

    return productCount
})()


export const products: Product[] = Array.from({ length: productCount }, () => ({
    name: randFood(),
    id: randUuid(),
    unit: {
        type: 'g',
        quantity: rand([ 30, 50, 100, 250, 300, 400, 500, 750 ])
    },
    energy: randNumber({ max: 500 }),
    macros: {
        carbs: randNumber({ max: 60 }),
        fat: randNumber({ max: 50 }),
        protein: randNumber({ max: 40 }),
    }
}))

export function search(query: string) {
    const data = new Searcher(products, ['name'], {
        sort: true,
    })

    return data.search(query)
}