import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';

const sendEmail = async (destinatario: string[], destinatario_cc: string[], destinatario_cco: string[], assunto: string, mensagem: string, idEmissorSelecionado: number, HEADERS: any): Promise<any | ApiException> => {
  try {
    return await Api().get(`/email?destinatario=${destinatario}&destinatario_cc=${destinatario_cc}&destinatario_cco=${destinatario_cco}&assunto=${assunto}&mensagem=${mensagem}&id_emissor=${idEmissorSelecionado}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

export const EmailService = {
  sendEmail,
};