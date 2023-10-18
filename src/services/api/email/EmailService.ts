import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';

const sendEmail = async (destinatario: string, destinatario_cc: string[], destinatario_cco: string[], assunto: string, mensagem: string, idNfe: number, enviaPdf: boolean, idEmissorSelecionado: number, HEADERS: any): Promise<any | ApiException> => {
  try {
    return await Api().post(`/email?destinatario=${destinatario}&assunto=${assunto}&mensagem=${mensagem}&id_nfe=${idNfe}&envia_pdf=${enviaPdf}&id_emissor=${idEmissorSelecionado}`, 
      {
        destinatario_cc,
        destinatario_cco,
      }, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

export const EmailService = {
  sendEmail,
};