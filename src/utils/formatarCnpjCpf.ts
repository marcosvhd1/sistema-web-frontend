export function formatCnpjCpf(value: string)
{
  const cnpjCpf = value.replace(/\D/g, '');

  if (cnpjCpf.length === 11) {
    return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  }

  return cnpjCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5');
}

export function removePontuacaoCnpjCpf(value: string) {
  return value.replace(/[^\d]/g, '');
}

export function formatarData(data: string) {
  const partes = data.split('-');
  if (partes.length === 3) {
    const ano = partes[0];
    const mes = partes[1];
    const dia = partes[2];
    return `${dia}/${mes}/${ano}`;
  } else return data;
}

export const regex = new RegExp(/^\d+$/);

export function lpad(inputString: string) {
  while (inputString.length < 4) {
    inputString = '0' + inputString;
  }

  return inputString;
}