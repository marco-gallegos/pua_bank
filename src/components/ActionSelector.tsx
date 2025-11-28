import { useState } from "react"

interface ActionOption {
    id: string
    label: string
    icon: string
    color: string
    onClick: () => void
}

interface ActionSelectorProps {
    actions: ActionOption[]
}

export function ActionSelector({ actions }: ActionSelectorProps) {
    const [isOpen, setIsOpen] = useState(false)

    const handleActionClick = (action: ActionOption) => {
        action.onClick()
        setIsOpen(false)
    }

    return (
        <>
            {/* Action Menu - Shows when open */}
            <div
                className={`position-fixed bottom-0 start-0 end-0 bg-white border-top shadow-lg transition-all ${isOpen ? 'translate-y-0' : 'translate-y-100'
                    }`}
                style={{
                    transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
                    transition: 'transform 0.3s ease-in-out',
                    zIndex: 1040,
                    paddingBottom: 'env(safe-area-inset-bottom)'
                }}
            >
                <div className="container-fluid p-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0 fw-bold text-muted">Quick Actions</h6>
                        <button
                            className="btn btn-sm btn-light rounded-circle"
                            onClick={() => setIsOpen(false)}
                            style={{ width: '32px', height: '32px' }}
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <div className="row g-2">
                        {actions.map((action) => (
                            <div key={action.id} className="col-6 col-md-4 col-lg-3">
                                <button
                                    className={`btn btn-${action.color} w-100 d-flex flex-column align-items-center justify-content-center py-3 shadow-sm`}
                                    onClick={() => handleActionClick(action)}
                                    style={{ minHeight: '80px' }}
                                >
                                    <i className={`bi bi-${action.icon} fs-3 mb-2`}></i>
                                    <span className="small fw-bold">{action.label}</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
                    style={{ zIndex: 1039 }}
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Floating Action Button */}
            <button
                className="btn btn-primary rounded-circle shadow-lg position-fixed d-flex align-items-center justify-content-center"
                style={{
                    bottom: '1.5rem',
                    right: '1.5rem',
                    width: '64px',
                    height: '64px',
                    fontSize: '1.5rem',
                    zIndex: 1050,
                    transition: 'transform 0.3s ease-in-out'
                }}
                onClick={() => setIsOpen(!isOpen)}
                title="Quick Actions"
            >
                <i className={`bi bi-${isOpen ? 'x-lg' : 'plus-lg'}`}></i>
            </button>
        </>
    )
}
