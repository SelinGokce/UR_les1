interface EasterEggHintProps {
    onClick?: () => void
}

export default function EasterEggHint({ onClick }: EasterEggHintProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full text-[10px] sm:text-[11px] text-white/50 font-mono pt-2 sm:pt-4 text-center tracking-wide leading-relaxed hover:text-white/80 active:scale-95 transition-all cursor-pointer focus:outline-none"
        >
            <span className="underline decoration-white/30">Tip:</span> Press{" "}
            <kbd className="bg-white/15 px-1 py-0.5 rounded border border-white/20 text-white font-sans text-[9px] sm:text-xs">
                Ctrl
            </kbd>{" "}
            +{" "}
            <kbd className="bg-white/15 px-1 py-0.5 rounded border border-white/20 text-white font-sans text-[9px] sm:text-xs">
                Shift
            </kbd>{" "}
            +{" "}
            <kbd className="bg-white/15 px-1 py-0.5 rounded border border-white/20 text-white font-sans text-[9px] sm:text-xs">
                A
            </kbd>{" "}
            (or tap here) to unlock demo controls
        </button>
    )
}