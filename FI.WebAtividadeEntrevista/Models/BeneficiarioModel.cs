﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebAtividadeEntrevista.Models
{
	public class BeneficiarioModel
	{
        public long Id { get; set; }

        /// <summary>
        /// CPF
        /// </summary>
        [Required]
        public string CPF { get; set; }

        /// <summary>
        /// Nome
        /// </summary>
        [Required]
        public string Nome { get; set; }

		public long IDCLIENTE { get; set; }

	}
}