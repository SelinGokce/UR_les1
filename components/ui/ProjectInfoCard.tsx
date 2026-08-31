interface Props {
    title: string
    description: string
    tools: string
}

export default function ProjectInfoCard({ title, description, tools }: Props) {
    return (
        <div
            style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(217, 217, 217, 0) 100%)' }}
            className="w-full border border-white/20 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden px-4 py-6 sm:p-10 backdrop-blur-sm shadow-xl mb-8 sm:mb-12"
        >
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">{title}</h1>
            <div className="space-y-6 sm:space-y-8 w-full">
                <div>
                    <h3 className="text-xs sm:text-sm uppercase tracking-widest text-white/60 font-bold mb-1.5 sm:mb-2">Description</h3>
                    <p className="text-sm sm:text-base text-white leading-relaxed font-light">{description}</p>
                </div>
                <div>
                    <h3 className="text-xs sm:text-sm uppercase tracking-widest text-white/60 font-bold mb-1.5 sm:mb-2">Tools Used</h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                        {tools.split(',').map((tool, index) => (
                            <span key={index} className="bg-white/10 border border-white/20 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm text-white font-medium backdrop-blur-sm">
                                {tool.trim()}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}