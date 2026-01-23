interface ProjectActionsProps {
    demoUrl?: string
    gitHubUrl?: string
}

export default function ProjectActions({ demoUrl, gitHubUrl }: ProjectActionsProps) {
    return (
        <div className="flex gap-4">
            {demoUrl && (
                <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        px-4 py-2
                        bg-blue-600
                        text-white
                        rounded-md
                        transition
                        hover:bg-blue-700
                        active:scale-95
                    "
                >
                    Live Demo
                </a>
            )}

            {gitHubUrl && (
                <a
                    href={gitHubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        px-4 py-2
                        bg-gray-800
                        text-white
                        rounded-md
                        transition
                        hover:bg-gray-900
                        active:scale-95
                    "
                >
                    GitHub
                </a>
            )}
        </div>
    )
}
