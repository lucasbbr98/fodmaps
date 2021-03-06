﻿using System;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Foodmaps.Models.RequestModels;
using Foodmaps.Services.User;
using Foodmaps.Models;
using System.Collections.Generic;
using Foodmaps.MySQL.Services.Database;

namespace Foodmaps.Web.Controllers.Api.Version1
{
    public class UserController : BaseController
    {
        private IUserUtility userService;
        private IFatalErrorService fatalErrorService;
        const string CONTROLLER_NAME = "UserController";
        public UserController(IUserUtility userService, IFatalErrorService fatalErrorService)
        {
            this.userService = userService;
            this.fatalErrorService = fatalErrorService;
        }

        #region Patients

        [HttpPost, Authorize]
        public IActionResult CreatePatient([FromBody] CreatePatientModel model)
        {
            try
            {
                if (UserId == null || UserId <= 0)
                    return StatusCode(500);

                var userId = (int)UserId;
                var resp = userService.CreatePatient(model, userId);
                if (resp != HttpStatusCode.OK)
                {
                    return StatusCode((int)resp);
                }
            }
            catch (Exception ex)
            {
                fatalErrorService.Insert(new FatalError(ex.ToString(), $"{CONTROLLER_NAME} | CreatePatient"));
                return StatusCode(500, new
                {
                    Message = ex.ToString()
                });
            }
            return Ok();
        }


        [HttpGet, Authorize]
        public IActionResult GetPatientsCount()
        {
            int count = 0;
            try
            {
                if (UserId == null || UserId <= 0)
                    return StatusCode(500);

                var userId = (int)UserId;
                var resp = userService.GetPatientsCount(userId, out count);
                if (resp != HttpStatusCode.OK)
                {
                    return StatusCode((int)resp);
                }
            }
            catch (Exception ex)
            {
                fatalErrorService.Insert(new FatalError(ex.ToString(), $"{CONTROLLER_NAME} | GetPatientsCount"));
                return StatusCode(500, new
                {
                    Message = ex.ToString()
                });
            }

            return Ok(new
            {
                Value = count
            });
        }

        [HttpGet, Authorize]
        public IActionResult GetPatients()
        {
            Patient[] patients = null;
            try
            {
                if (UserId == null || UserId <= 0)
                    return StatusCode(500);

                var userId = (int)UserId;
                var resp = userService.GetPatients(userId, out patients);
                if (resp != HttpStatusCode.OK)
                {
                    return StatusCode((int)resp);
                }
            }
            catch (Exception ex)
            {
                fatalErrorService.Insert(new FatalError(ex.ToString(), $"{CONTROLLER_NAME} | GetPatients"));
                return StatusCode(500, new
                {
                    Message = ex.ToString()
                });
            }

            return Ok(new
            {
                Patients = patients
            });
        }

        #endregion

        #region Researches

        // This method creates both researches and specific questionnaires to users
        [HttpPost, Authorize]
        public IActionResult CreateQuestionnaire([FromBody] CreateQuestionnaireModel model)
        {
            try
            {
                if (UserId == null || UserId <= 0)
                    return StatusCode(500);

                var userId = (int)UserId;
                var resp = userService.CreateQuestionnaire(model, userId);
                if (resp != HttpStatusCode.OK)
                {
                    return StatusCode((int)resp);
                }
            }
            catch (Exception ex)
            {
                fatalErrorService.Insert(new FatalError(ex.ToString(), $"{CONTROLLER_NAME} | CreateQuestionnaire"));
                return StatusCode(500, new
                {
                    Message = ex.ToString()
                });
            }
            return Ok();
        }

        [HttpGet, Authorize]
        public IActionResult GetResearchesCount()
        {
            int count = 0;
            try
            {
                if (UserId == null || UserId <= 0)
                    return StatusCode(500);

                var userId = (int)UserId;
                var resp = userService.GetResearchesCount(userId, out count);
                if (resp != HttpStatusCode.OK)
                {
                    return StatusCode((int)resp);
                }
            }
            catch (Exception ex)
            {
                fatalErrorService.Insert(new FatalError(ex.ToString(), $"{CONTROLLER_NAME} | GetResearchesCount"));
                return StatusCode(500, new
                {
                    Message = ex.ToString()
                });
            }

            return Ok(new
            {
                Value = count
            });
        }

        [HttpGet, Authorize]
        public IActionResult GetResearches()
        {
            IEnumerable<Questionnaire> questionnaires = null;
            try
            {
                if (UserId == null || UserId <= 0)
                    return StatusCode(500);

                var userId = (int)UserId;
                var resp = userService.GetResearches(userId, out questionnaires);
                if (resp != HttpStatusCode.OK)
                {
                    return StatusCode((int)resp);
                }
            }
            catch (Exception ex)
            {
                fatalErrorService.Insert(new FatalError(ex.ToString(), $"{CONTROLLER_NAME} | GetResearches"));
                return StatusCode(500, new
                {
                    Message = ex.ToString()
                });
            }

            return Ok(new
            {
                Questionnaires = questionnaires
            });
        }

        [HttpGet("{patientId}"), Authorize]
        public IActionResult GetPendingQuestionnaire(int patientId)
        {
            Questionnaire questionnaire = null;
            try
            {
                var resp = userService.GetPendingQuestionnaire(patientId, out questionnaire);
                if (resp != HttpStatusCode.OK)
                {
                    return StatusCode((int)resp);
                }
            }
            catch (Exception ex)
            {
                fatalErrorService.Insert(new FatalError(ex.ToString(), $"{CONTROLLER_NAME} | GetPendingQuestionnaire"));
                return StatusCode(500, new
                {
                    Message = ex.ToString()
                });
            }

            return Ok(new
            {
                Questionnaire = questionnaire
            });
        }
        #endregion

    }
}
