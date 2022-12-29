import { BeatLoader } from "react-spinners"

export const Loading = () => {
    return (
        <div className=" absolute top-[30%] left-[55%]">
            <BeatLoader 
                size={20}
                color={"#070804"}
            />
        </div>
    )
}