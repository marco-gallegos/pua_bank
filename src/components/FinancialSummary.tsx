import { useStore } from '../store/useStore'

export function FinancialSummary() {
    const { getTotalIncomes, getTotalExpenses, getBalance } = useStore()

    const totalIncomes = getTotalIncomes()
    const totalExpenses = getTotalExpenses()
    const balance = getBalance()

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    return (
        <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
                <h5 className="card-title text-center mb-4 fw-bold text-secondary">Financial Summary</h5>

                <div className="row g-3">
                    {/* Incomes */}
                    <div className="col-4">
                        <div className="text-center p-3 bg-success bg-opacity-10 rounded">
                            <div className="text-muted small fw-bold mb-1">INCOMES</div>
                            <div className="fs-5 fw-bold text-success">
                                {formatCurrency(totalIncomes)}
                            </div>
                        </div>
                    </div>

                    {/* Expenses */}
                    <div className="col-4">
                        <div className="text-center p-3 bg-danger bg-opacity-10 rounded">
                            <div className="text-muted small fw-bold mb-1">EXPENSES</div>
                            <div className="fs-5 fw-bold text-danger">
                                {formatCurrency(totalExpenses)}
                            </div>
                        </div>
                    </div>

                    {/* Balance */}
                    <div className="col-4">
                        <div className={`text-center p-3 rounded ${balance >= 0 ? 'bg-primary bg-opacity-10' : 'bg-warning bg-opacity-10'}`}>
                            <div className="text-muted small fw-bold mb-1">BALANCE</div>
                            <div className={`fs-5 fw-bold ${balance >= 0 ? 'text-primary' : 'text-warning'}`}>
                                {formatCurrency(balance)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
