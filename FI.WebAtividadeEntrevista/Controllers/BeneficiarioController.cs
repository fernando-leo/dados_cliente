using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAtividadeEntrevista.Models;

namespace WebAtividadeEntrevista.Controllers
{
	public class BeneficiarioController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Beneficiarios()
        {
            Beneficiario beneficiario = new Beneficiario();
            return View("modalBeneficiarios", beneficiario);
        }

        [HttpPost]
        public JsonResult SalvarBeneficiarios(BeneficiarioModel[] beneficiarioArray)
		{
			try
			{
                foreach (BeneficiarioModel beneficiario in beneficiarioArray)
                {
                    Incluir(beneficiario);
                }
                return Json("Cadastro efetuado com sucesso");
            }
			catch (Exception e)
			{
                return Json("Ocorreu um erro ao salvar os beneficiários");
            }
        }

        [HttpPost]
        public JsonResult Incluir(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                if (!bo.VerificarExistencia(model.CPF))
                {
                    model.Id = bo.Incluir(new Beneficiario()
                    {
                        IDCLIENTE = model.IDCLIENTE,
                        Nome = model.Nome,
                        CPF = model.CPF
                    });

                    return Json("Cadastro efetuado com sucesso");
                }
                else
                    return Json("CPF já cadastrado");
            }
        }

        [HttpPost]
        public JsonResult BeneficiarioList(int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            try
            {
                int qtd = 0;
                string campo = string.Empty;
                string crescente = string.Empty;
                string[] array = jtSorting.Split(' ');

                if (array.Length > 0)
                    campo = array[0];

                if (array.Length > 1)
                    crescente = array[1];

                List<Beneficiario> beneficiarios = new BoBeneficiario().Pesquisa(jtStartIndex, jtPageSize, campo, crescente.Equals("ASC", StringComparison.InvariantCultureIgnoreCase), out qtd);

                //Return result to jTable
                return Json(new { Result = "OK", Records = beneficiarios, TotalRecordCount = qtd });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }
    }
}