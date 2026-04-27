interface Props {
    title: string
}

export default function ProjectHeader({ title }: Props) {
    return (
        <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-medium text-white whitespace-nowrap">{title}</h2>
            <div className="h-[1.5px] bg-white/30 w-full mt-2"></div>
        </div>
    )
}