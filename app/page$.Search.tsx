import { Button } from "@dinosaw44/ui/components/react/Button";
import { Input } from "@headlessui/react";

export default function Search() {
    return <form style={{ display: "flex" }}>
        <Input
            name="q"
            placeholder="Search"
            required
        />
        <Button primary submit label="submit" />
    </form>
}