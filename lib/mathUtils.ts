export const getFactors = (num: number) => {
  let factors = new Set<number>() // Use a set to avoid duplicates
  for (let i = 1; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      factors.add(i) // Add the divisor
      factors.add(num / i) // Add the quotient
    }
  }
  return Array.from(factors).sort((a, b) => a - b) // Convert to array and sort
}

export const sumOfFactors = (num: number) =>
  getFactors(num)
    .slice(0, -1)
    .reduce((sum, num) => sum + num, 0)

export const factorial = (num: number) => {
  let sum = '1'
  for (let i = 1; i <= num; i++) {
    sum = (BigInt(sum) * BigInt(i)).toString()
  }
  return sum
}

export const gcd = (a: number, b: number): number => {
  return !b ? a : gcd(b, a % b)
}

export const lcm = (a: number, b: number): number => {
  return (a * b) / gcd(a, b)
}
