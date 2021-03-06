﻿using Foodmaps.Models.RequestModels;
using Foodmaps.Services.Questionnaire;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;

namespace Foodmaps.Web.Controllers.Api.Version1
{
    using Foodmaps.Models.ViewModels;
    using Foodmaps.MySQL.Services.Database;
    using Models;
    using System.Collections.Generic;

    public class QuestionnaireController : BaseController
    {
        private IQuestionnaireUtility questService;
        private IFatalErrorService fatalErrorService;
        const string CONTROLLER_NAME = "QuestionnaireController";
        public QuestionnaireController(IQuestionnaireUtility questService, IFatalErrorService fatalErrorService)
        {
            this.questService = questService;
            this.fatalErrorService = fatalErrorService;
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
                fatalErrorService.Insert(new FatalError(ex.ToString(), $"{CONTROLLER_NAME} | SaveAnswers"));
                return StatusCode(500, new
                {
                    Message = ex.ToString()
                });
            }
            return Ok();
        }

        [HttpPost, AllowAnonymous]
        public IActionResult SaveResearchAnswers([FromBody] ResearchAnswersModel model)
        {
            try
            {
                var resp = questService.SaveResearchAnswers(model);
                if (resp != HttpStatusCode.OK)
                {
                    return StatusCode((int)resp);
                }
            }
            catch (Exception ex)
            {
                fatalErrorService.Insert(new FatalError(ex.ToString(), $"{CONTROLLER_NAME} | SaveResearchAnswers"));
                return StatusCode(500, new
                {
                    Message = ex.ToString()
                });
            }
            return Ok();
        }

        [HttpGet("{id}"), Authorize]
        public IActionResult GetCompletedByPatient(int id)
        {
            try
            {
                if (UserId == null || UserId <= 0 || id <= 0)
                    return StatusCode(500);

                var userId = (int)UserId;
                var resp = questService.GetCompletedByPatient(id, userId, out IEnumerable<Questionnaire> questionnaires);
                if (resp != HttpStatusCode.OK)
                    return StatusCode((int)resp);


                return Ok(new
                {
                    Questionnaires = questionnaires
                });
            }
            catch (Exception ex)
            {
                fatalErrorService.Insert(new FatalError(ex.ToString(), $"{CONTROLLER_NAME} | GetCompletedByPatient"));
                return StatusCode(500, new
                {
                    Message = ex.ToString()
                });
            }
        }

        [HttpGet("{guid}"), Authorize]
        public IActionResult GetData(string guid)
        {
            try
            {
                if (UserId == null || UserId <= 0 || string.IsNullOrEmpty(guid))
                    return StatusCode(500);

                var userId = (int)UserId;

                var resp = questService.GetData(guid, userId, out IEnumerable<QuestionnaireDataViewModel> data);
                if (resp != HttpStatusCode.OK)
                    return StatusCode((int)resp);

                return Ok(new
                {
                    Data = data
                });
            }
            catch (Exception ex)
            {
                fatalErrorService.Insert(new FatalError(ex.ToString(), $"{CONTROLLER_NAME} | GetData"));
                return StatusCode(500, new
                {
                    Message = ex.ToString()
                });
            }
        }

        [HttpGet("{guid}"), Authorize]
        public IActionResult GetResearchData(string guid)
        {
            try
            {
                if (UserId == null || UserId <= 0 || string.IsNullOrEmpty(guid))
                    return StatusCode(500);

                var userId = (int)UserId;

                var resp = questService.GetResearchData(guid, userId, out IEnumerable<QuestionnaireDataViewModel> data);
                if (resp != HttpStatusCode.OK)
                    return StatusCode((int)resp);

                return Ok(new
                {
                    Data = data
                });
            }
            catch (Exception ex)
            {
                fatalErrorService.Insert(new FatalError(ex.ToString(), $"{CONTROLLER_NAME} | GetResearchData"));
                return StatusCode(500, new
                {
                    Message = ex.ToString()
                });
            }
        }

        [HttpGet("{guid}")]
        public IActionResult GetByGuid(string guid)
        {
            try
            {

                var resp = questService.GetByGuid(guid, out Questionnaire questionnaire);
                if (resp != HttpStatusCode.OK)
                    return StatusCode((int)resp);

                return Ok(new
                {
                    Questionnaire = questionnaire
                });
            }
            catch (Exception ex)
            {
                fatalErrorService.Insert(new FatalError(ex.ToString(), $"{CONTROLLER_NAME} | GetByGuid"));
                return StatusCode(500, new
                {
                    Message = ex.ToString()
                });
            }
        }
    }
}