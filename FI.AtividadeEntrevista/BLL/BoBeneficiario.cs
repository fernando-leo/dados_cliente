using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
	public class BoBeneficiario
	{

        public long Incluir(DML.Beneficiario beneficiario)
        {
            DAL.DaoBeneficiario b = new DAL.DaoBeneficiario();
            return b.Incluir(beneficiario);
        }

        public void Alterar(DML.Beneficiario beneficiario)
        {
            DAL.DaoBeneficiario b = new DAL.DaoBeneficiario();
            b.Alterar(beneficiario);
        }

        public void Excluir(long id)
        {
            DAL.DaoBeneficiario b = new DAL.DaoBeneficiario();
            b.Excluir(id);
        }

        public List<DML.Beneficiario> Pesquisa(int iniciarEm, int quantidade, string campoOrdenacao, bool crescente, out int qtd)
        {
            DAL.DaoBeneficiario b = new DAL.DaoBeneficiario();
            return b.Pesquisa(iniciarEm, quantidade, campoOrdenacao, crescente, out qtd);
        }

        public List<DML.Beneficiario> Listar()
        {
            DAL.DaoBeneficiario b = new DAL.DaoBeneficiario();
            return b.Listar();
        }

        public bool VerificarExistencia(string CPF)
        {
            DAL.DaoBeneficiario beneficiario = new DAL.DaoBeneficiario();
            return beneficiario.VerificarExistencia(CPF);
        }
    }
}
