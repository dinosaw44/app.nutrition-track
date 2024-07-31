import { NextRequest } from "next/server";
import { search } from "@/mocks/data";

export function GET({ url }: NextRequest) {
    const query = new URL(url).searchParams.get('q')
    const results = query
        ? search(query)
        : []

    return Response.json(results)
}