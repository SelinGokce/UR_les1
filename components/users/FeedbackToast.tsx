interface FeedbackToastProps {
    feedback: { message: string; type: 'success' | 'error' } | null
}

export default function FeedbackToast({ feedback }: FeedbackToastProps) {
    if (!feedback) return null

    return (
        <div className={`fixed bottom-24 left-10 z-[250] p-4 rounded-2xl border backdrop-blur-md shadow-2xl font-mono text-sm max-w-sm transition-all animate-[fadeInUp_0.3s_ease-out_forwards] ${feedback.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
            <div className="flex items-center gap-2.5">
                <span>{feedback.type === 'success' ? '✅' : '🚨'}</span>
                <p>{feedback.message}</p>
            </div>
        </div>
    )
}