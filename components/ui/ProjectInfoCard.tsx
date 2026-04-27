interface Props {
    title: string
    description: string
    tools: string
}

export default function ProjectInfoCard({ title, description, tools }: Props) {
    return (
        <div
            style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(217, 217, 217, 0) 100%)' }}
            className="border border-white/20 rounded-[2rem] overflow-hidden p-10 backdrop-blur-sm shadow-xl mb-12"
        >
            <h1 className="text-4xl font-bold text-white mb-6">{title}</h1>
            <div className="space-y-8">
                <div>
                    <h3 className="text-sm uppercase tracking-widest text-white/60 font-bold mb-2">Description</h3>
                    <p className="text-xl text-white leading-relaxed font-light">{description}</p>
                </div>
                <div>
                    <h3 className="text-sm uppercase tracking-widest text-white/60 font-bold mb-2">Tools Used</h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {tools.split(',').map((tool, index) => (
                            <span key={index} className="bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-sm text-white font-medium backdrop-blur-sm">
                                {tool.trim()}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}