import { rest } from "msw";
import { products, search } from "./data";

export const handlers = [
    rest.get('*/api/search', ({ url }, response, context) => {
        const query = new URL(url).searchParams.get('q')

        if (query === null) {
            return response(context.status(204))
        }

        const results = search(query)
        
        return response(
            context.status(202),
            context.json(results)
        )
    }),
]