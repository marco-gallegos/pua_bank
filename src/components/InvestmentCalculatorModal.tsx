import { useState } from "react"
import { calculateInvestmentProfit, type InvestmentResult } from "../utils/investmentCalculator"

interface InvestmentCalculatorModalProps {
    show: boolean
    onClose: () => void
}

export function InvestmentCalculatorModal({ show, onClose }: InvestmentCalculatorModalProps) {
    const [amount, setAmount] = useState<string>("")
    const [percentage, setPercentage] = useState<string>("")
    const [result, setResult] = useState<InvestmentResult | null>(null)

    const handleCalculate = () => {
        const investmentAmount = parseFloat(amount)
        const annualPercentage = parseFloat(percentage)

        if (isNaN(investmentAmount) || isNaN(annualPercentage)) {
            alert("Please enter valid numbers")
            return
        }

        if (investmentAmount <= 0 || annualPercentage <= 0) {
            alert("Please enter positive values")
            return
        }

        const calculatedResult = calculateInvestmentProfit(investmentAmount, annualPercentage)
        setResult(calculatedResult)
    }

    const handleReset = () => {
        setAmount("")
        setPercentage("")
        setResult(null)
    }

    const handleClose = () => {
        handleReset()
        onClose()
    }

    return (
        <>
            <div
                className={`modal fade ${show ? 'show' : ''}`}
                style={{ display: show ? 'block' : 'none' }}
                tabIndex={-1}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title fw-bold">
                                <i className="bi bi-calculator me-2"></i>
                                Investment Profit Calculator
                            </h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                onClick={handleClose}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="investmentAmount" className="form-label text-muted small fw-bold">
                                    INVESTMENT AMOUNT
                                </label>
                                <div className="input-group input-group-lg">
                                    <span className="input-group-text bg-light border-end-0">$</span>
                                    <input
                                        type="number"
                                        className="form-control bg-light border-start-0"
                                        id="investmentAmount"
                                        placeholder="10000.00"
                                        step="0.01"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="annualPercentage" className="form-label text-muted small fw-bold">
                                    ANNUAL PERCENTAGE
                                </label>
                                <div className="input-group input-group-lg">
                                    <input
                                        type="number"
                                        className="form-control bg-light border-end-0"
                                        id="annualPercentage"
                                        placeholder="5.0"
                                        step="0.01"
                                        value={percentage}
                                        onChange={(e) => setPercentage(e.target.value)}
                                    />
                                    <span className="input-group-text bg-light border-start-0">%</span>
                                </div>
                            </div>

                            <div className="d-grid gap-2 mb-4">
                                <button
                                    className="btn btn-primary btn-lg fw-bold shadow-sm"
                                    onClick={handleCalculate}
                                >
                                    Calculate Profit
                                </button>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={handleReset}
                                >
                                    Reset
                                </button>
                            </div>

                            {result && (
                                <div className="alert alert-success border-0 shadow-sm">
                                    <h6 className="alert-heading fw-bold text-success mb-3">
                                        <i className="bi bi-check-circle me-2"></i>
                                        Calculation Results
                                    </h6>
                                    <div className="row g-3">
                                        <div className="col-6">
                                            <div className="card bg-light border-0">
                                                <div className="card-body text-center">
                                                    <p className="text-muted small mb-1 fw-bold">MONTHLY PROFIT</p>
                                                    <h4 className="text-success fw-bold mb-0">
                                                        ${result.monthlyProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="card bg-light border-0">
                                                <div className="card-body text-center">
                                                    <p className="text-muted small mb-1 fw-bold">ANNUAL PROFIT</p>
                                                    <h4 className="text-success fw-bold mb-0">
                                                        ${result.annualProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {show && <div className="modal-backdrop fade show"></div>}
        </>
    )
}
