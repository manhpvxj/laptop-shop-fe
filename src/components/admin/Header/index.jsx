import { UserPopover } from "..";
export default function Header() {
    return (
        <div className="flex justify-end">
            <div className="mr-6 mt-9">
            <UserPopover />
            </div>
        </div>
    )
}