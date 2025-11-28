import { useState } from "react"
import { InvestmentCalculatorModal } from "../components/InvestmentCalculatorModal"

export function Home() {
    const [amount, setAmount] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("Food")
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [showDetails, setShowDetails] = useState(false)
    const [showCalculatorModal, setShowCalculatorModal] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({
            amount: parseFloat(amount),
            description,
            category,
            date
        })
        // Reset form or show success message
        setAmount("")
        setDescription("")
        setCategory("Food")
        setDate(new Date().toISOString().split('T')[0])
        alert("Expense added! (Check console)")
    }

    return (
        <>
            <div className="container-fluid p-0">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4 fw-bold text-primary">Add Expense</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="amount" className="form-label text-muted small fw-bold">AMOUNT</label>
                                        <div className="input-group input-group-lg">
                                            <span className="input-group-text bg-light border-end-0">$</span>
                                            <input
                                                type="number"
                                                className="form-control bg-light border-start-0"
                                                id="amount"
                                                placeholder="0.00"
                                                step="0.01"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3 text-center">
                                        <button
                                            type="button"
                                            className="btn btn-link text-decoration-none btn-sm"
                                            onClick={() => setShowDetails(!showDetails)}
                                        >
                                            {showDetails ? 'Hide Details' : 'Add Details'}
                                        </button>
                                    </div>

                                    {showDetails && (
                                        <>
                                            <div className="mb-3">
                                                <label htmlFor="description" className="form-label text-muted small fw-bold">DESCRIPTION</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg bg-light"
                                                    id="description"
                                                    placeholder="What is it for?"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="category" className="form-label text-muted small fw-bold">CATEGORY</label>
                                                <select
                                                    className="form-select form-select-lg bg-light"
                                                    id="category"
                                                    value={category}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                >
                                                    <option value="Food">Food</option>
                                                    <option value="Transport">Transport</option>
                                                    <option value="Utilities">Utilities</option>
                                                    <option value="Entertainment">Entertainment</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="date" className="form-label text-muted small fw-bold">DATE</label>
                                                <input
                                                    type="date"
                                                    className="form-control form-control-lg bg-light"
                                                    id="date"
                                                    value={date}
                                                    onChange={(e) => setDate(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </>
                                    )}

                                    <button type="submit" className="btn btn-primary w-100 btn-lg fw-bold shadow-sm">
                                        Add Expense
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Action Button for Investment Calculator */}
            <button
                className="btn btn-success rounded-circle shadow-lg position-fixed"
                style={{
                    bottom: '2rem',
                    right: '2rem',
                    width: '60px',
                    height: '60px',
                    fontSize: '1.5rem',
                    zIndex: 1000
                }}
                onClick={() => setShowCalculatorModal(true)}
                title="Investment Calculator"
            >
                <i className="bi bi-calculator"></i>
            </button>

            {/* Investment Calculator Modal */}
            <InvestmentCalculatorModal
                show={showCalculatorModal}
                onClose={() => setShowCalculatorModal(false)}
            />
        </>
    )
}
