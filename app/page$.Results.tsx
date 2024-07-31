"use client";

import { UnorderedList as List } from "@/components/List"
import { Product } from "@/mocks/data";
import { card, table } from "@/style";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import Doughnut from "./page$.Doughnut"

const Items = () => {
    const searchParams = useSearchParams()
    const query = searchParams.get('q')
    
    const [products, setProducts] = useState<Product[] | null>(null)

    useEffect(() => {
        async function getProducts() {
            const { href } = (() => {
                console.log(location.host)
                const url = new URL("/api/search", location.origin)

                if (query === null) {
                    setProducts([])
                    return { href: null }
                }

                url.searchParams.set('q', query)
                
                return url
            })()

            if (href) {
                const response = await fetch(href)
                const products = await response.json()
                
                setProducts(products)
            }
        }

        getProducts()
    }, [query])

    if (query === null) {
        return
    }

    const Summary = () => products === null
        ? <p>Searching...</p>
        : <p>Showing {products.length} results for {query}</p>


    const Item = ({ name, id, energy, macros, unit }: Product) => <article className={card} style={{ 
        display: "flex",
        gap: ".5rem",
        alignItems: "center"
    }}>
        <span style={{ display: "inline-block" }}>
            <hgroup>
                <h1>{name} ({unit.quantity}{unit.type})</h1>
                <small>{id}</small>
            </hgroup>
            <table className={table}>
                <tr>
                    <th>Energy</th>
                    <th>Protein</th>
                    <th>Carbs</th>
                    <th>Fat</th>
                </tr>
                <tr>
                    <td>{energy}kcal</td>
                    <td>{macros.protein}g</td>
                    <td>{macros.carbs}g</td>
                    <td>{macros.fat}g</td>
                </tr>
            </table>
        </span>
        <span style={{ maxWidth: "4rem", margin: "auto" }}>
            <Doughnut theme={{ carbs: "#62e9f3", protein: "#6c62f3", fat: "#f3b562" }} {...macros} />
        </span>
    </article>

    return <>
        <hgroup>
            <h1>Results</h1>
            <Summary />
        </hgroup>
        <List template={Item} items={products} />
    </>
}

export default function Results() {
    return <section>
        <Suspense>
            <Items />
        </Suspense>
    </section>
}