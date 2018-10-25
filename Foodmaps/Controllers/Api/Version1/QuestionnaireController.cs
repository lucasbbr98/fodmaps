using Foodmaps.Models.RequestModels;
using Foodmaps.Services.Questionnaire;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;

namespace Foodmaps.Web.Controllers.Api.Version1
{
    public class QuestionnaireController : BaseController
    {
        private IQuestionnaireUtility questService;
        public QuestionnaireController(IQuestionnaireUtility questService)
        {
            this.questService = questService;
        }


        [HttpPost, AllowAnonymous]
        public IActionResult SaveAnswers([FromBody] QuestionnaireAnswersModel model)
        {
            try
            {
                var resp = questService.SaveQuestionnaireAnswers(model);
                if (resp != HttpStatusCode.OK)
                {
                    return StatusCode((int)resp);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Message = ex.ToString()
                });
            }
            return Ok();
        }
    }
}