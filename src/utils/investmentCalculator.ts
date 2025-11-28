export interface InvestmentResult {
    monthlyProfit: number
    annualProfit: number
}

/**
 * Calculates investment profits based on amount and annual percentage
 * @param amount - The investment amount
 * @param annualPercentage - The annual interest rate as a percentage (e.g., 5 for 5%)
 * @returns Object containing monthly and annual profit
 */
export function calculateInvestmentProfit(
    amount: number,
    annualPercentage: number
): InvestmentResult {
    const annualProfit = (amount * annualPercentage) / 100
    const monthlyProfit = annualProfit / 12

    return {
        monthlyProfit: parseFloat(monthlyProfit.toFixed(2)),
        annualProfit: parseFloat(annualProfit.toFixed(2))
    }
}
