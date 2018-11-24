namespace Foodmaps.Models.ViewModels
{
    public interface IQuestionnaireDataViewModel
    {
        Questionnaire Questionnaire { get; }
        Answer Answer { get; }
        Patient Patient { get; }
        Food Food { get; }

    }

    public class QuestionnaireDataViewModel : IQuestionnaireDataViewModel
    {
        public Questionnaire Questionnaire { get; set; }
        public Answer Answer { get; set; }
        public Patient Patient { get; set; }
        public Food Food { get; set; }

        public QuestionnaireDataViewModel() { }

        public QuestionnaireDataViewModel(Questionnaire q, Answer a, Patient p, Food f)
        {
            this.Questionnaire = q;
            this.Answer = a;
            this.Patient = p;
            this.Food = f;
        }

    }
}
