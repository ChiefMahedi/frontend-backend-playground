import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
interface StatsCardProps {
    number: string,
    label: string,
    icon: IconProp
}
export default function StatsCard(statsCardProps: StatsCardProps) {
    return (
        <>
            <div className="w-48 border shadow-xl m-3 px-1 py-5 rounded flex flex-col justify-center items-center">
                <div>
                    <FontAwesomeIcon className="text-2xl mb-2 text-sidebar " icon={statsCardProps.icon} />
                </div>
                <p className="text-black font-semibold mb-1	font-poppins	text-xl">{statsCardProps.number}</p>
                <p className="text-sm text-zinc-500	font-poppins">{statsCardProps.label}</p>
            </div>
        </>
    )
}