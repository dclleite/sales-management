export function cpfMask(cpf) {
  if (cpf) {
    let num = cpf.replace(/[^\d]/g, '') // remove todos os caracteres não numéricos
    let len = num.length // guarda o número de digitos até o momento

    if (len <= 6) {
      cpf = num.replace(/(\d{3})(\d{1,3})/g, '$1.$2')
    } else if (len <= 9) {
      cpf = num.replace(/(\d{3})(\d{3})(\d{1,3})/g, '$1.$2.$3')
    } else {
      cpf = num.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/g, '$1.$2.$3-$4')
    }
  }
  return cpf
}

export function cnpjMask(cnpj) {
  if (cnpj) {
    cnpj = cnpj.replace(/\D/g, '')
    cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2')
    cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2')
    cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2')
  }
  return cnpj
}

export function cellphoneMask(phone: string, isCellphone: boolean = true) {
  if (phone) {
    phone = phone.replace(/\D/g, '')
    phone = phone.replace(/^(\d\d)(\d)/g, '($1) $2')
    phone = isCellphone ? phone.replace(/(\d{5})(\d)/, '$1-$2') : phone.replace(/(\d{4})(\d)/, '$1-$2')
  }
  return phone
}

export function cepMask(cep) {
  if (cep) {
    cep = cep.replace(/\D/g, '')
    cep = cep.replace(/(\d{5})(\d)/, '$1-$2')
  }
  return cep
}

const masks = {
  cpfMask,
  cnpjMask,
  cellphoneMask,
  cepMask,
}
export default masks
