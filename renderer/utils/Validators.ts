export function validateEmail(email) {
  let reg = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/
  return reg.test(email) === true && email.length > 5 && email.length <= 50
}

export function validatePhone(phone) {
  let reg = /^(?:(?:\+|00)?(55)\s?)?(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/

  return phone.length <= 20 && phone.length >= 11 && reg.test(phone) === true
}

export function validateCellphone(cellphone) {
  let reg = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/
  return cellphone.length <= 20 && cellphone.length >= 11 && reg.test(cellphone)
}

export function isInt(n) {
  return n % 1 === 0
}

export function validateCpf(cpf: string) {
  if (cpf) {
    cpf = cpf.replace(/[^\d]+/g, '')

    if (cpf.length === 11) {
      let soma = 0
      let resto = 0

      if (
        cpf === '00000000000' ||
        cpf === '11111111111' ||
        cpf === '22222222222' ||
        cpf === '33333333333' ||
        cpf === '44444444444' ||
        cpf === '55555555555' ||
        cpf === '66666666666' ||
        cpf === '77777777777' ||
        cpf === '88888888888' ||
        cpf === '99999999999'
      ) {
        return false
      }

      for (let i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
      }
      resto = (soma * 10) % 11

      if (resto === 10 || resto === 11) resto = 0
      if (resto !== parseInt(cpf.substring(9, 10))) return false

      soma = 0
      for (let i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
      }
      resto = (soma * 10) % 11

      if (resto === 10 || resto === 11) resto = 0
      if (resto !== parseInt(cpf.substring(10, 11))) return false
      return true
    }
  }
  return false
}

export function validateCnpj(cnpj: string) {
  if (cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '')

    if (cnpj === '') return false

    if (cnpj.length !== 14) return false

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj === '00000000000000' ||
      cnpj === '11111111111111' ||
      cnpj === '22222222222222' ||
      cnpj === '33333333333333' ||
      cnpj === '44444444444444' ||
      cnpj === '55555555555555' ||
      cnpj === '66666666666666' ||
      cnpj === '77777777777777' ||
      cnpj === '88888888888888' ||
      cnpj === '99999999999999'
    ) {
      return false
    }
    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho)
    let digitos = cnpj.substring(tamanho)
    let soma = 0
    let pos = tamanho - 7
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--
      if (pos < 2) pos = 9
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
    if (resultado !== parseInt(digitos.charAt(0))) return false

    tamanho = tamanho + 1
    numeros = cnpj.substring(0, tamanho)
    soma = 0
    pos = tamanho - 7
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--
      if (pos < 2) pos = 9
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
    if (resultado !== parseInt(digitos.charAt(1))) return false

    return true
  }
  return false
}

const validators = {
  validateEmail,
  validatePhone,
  validateCellphone,
  isInt,
  validateCpf,
  validateCnpj,
}
export default validators
