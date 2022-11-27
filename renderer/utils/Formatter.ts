export function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
}

export function priceValidation(value: string) {
  const val = value.replace(/[^0-9]+/g, '')
  if (val.length === 0) {
    return 0
  } else {
    return Number.parseFloat(val) / 100
  }
}
