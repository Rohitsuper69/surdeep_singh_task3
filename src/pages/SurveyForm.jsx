import React from "react";
import useForm from "../utils//useForm";
import validateForm from "../utils/validateForm";
import axios from "axios";

const fetchAdditionalQuestions = async (topic) => {
  const response = await axios.get(
    `https://quizapi.io/api/v1/questions?apiKey=rQ2Q8DxhDKUXVb0QlOLhHCBIZ1hpY3IxsNnKzUlq&category=code&limit=10&tags=JavaScript`
  );
  return response.data;
};

const SurveyForm = () => {
  const initialValues = {
    fullName: "",
    email: "",
    surveyTopic: "",
    favoriteLanguage: "",
    yearsOfExperience: "",
    exerciseFrequency: "",
    dietPreference: "",
    highestQualification: "",
    fieldOfStudy: "",
    feedback: "",
  };

  const {
    formValues,
    errors,
    submittedData,
    additionalQuestions,
    handleChange,
    handleSubmit,
  } = useForm(initialValues, validateForm, fetchAdditionalQuestions);

  const renderAdditionalQuestions = () => {
    if (additionalQuestions.length === 0) {
      return <p>Loading additional questions...</p>;
    }

    return (
      <div>
        <h2>Additional Questions</h2>
        <ul>
          {additionalQuestions.map((question, index) => (
            <li key={index}>
              <strong>{question.question}</strong>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1>Survey Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formValues.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p>{errors.fullName}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label>Survey Topic:</label>
          <select
            name="surveyTopic"
            value={formValues.surveyTopic}
            onChange={handleChange}
          >
            <option value="">Select Topic</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
          {errors.surveyTopic && <p>{errors.surveyTopic}</p>}
        </div>

        {formValues.surveyTopic === "Technology" && (
          <div>
            <label>Favorite Programming Language:</label>
            <select
              name="favoriteLanguage"
              value={formValues.favoriteLanguage}
              onChange={handleChange}
            >
              <option value="">Select Language</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
            </select>
            {errors.favoriteLanguage && <p>{errors.favoriteLanguage}</p>}

            <label>Years of Experience:</label>
            <input
              type="number"
              name="yearsOfExperience"
              value={formValues.yearsOfExperience}
              onChange={handleChange}
            />
            {errors.yearsOfExperience && <p>{errors.yearsOfExperience}</p>}
          </div>
        )}

        {formValues.surveyTopic === "Health" && (
          <div>
            <label>Exercise Frequency:</label>
            <select
              name="exerciseFrequency"
              value={formValues.exerciseFrequency}
              onChange={handleChange}
            >
              <option value="">Select Frequency</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Rarely">Rarely</option>
            </select>
            {errors.exerciseFrequency && <p>{errors.exerciseFrequency}</p>}

            <label>Diet Preference:</label>
            <select
              name="dietPreference"
              value={formValues.dietPreference}
              onChange={handleChange}
            >
              <option value="">Select Diet</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
            {errors.dietPreference && <p>{errors.dietPreference}</p>}
          </div>
        )}

        {formValues.surveyTopic === "Education" && (
          <div>
            <label>Highest Qualification:</label>
            <select
              name="highestQualification"
              value={formValues.highestQualification}
              onChange={handleChange}
            >
              <option value="">Select Qualification</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
            {errors.highestQualification && (
              <p>{errors.highestQualification}</p>
            )}

            <label>Field of Study:</label>
            <input
              type="text"
              name="fieldOfStudy"
              value={formValues.fieldOfStudy}
              onChange={handleChange}
            />
            {errors.fieldOfStudy && <p>{errors.fieldOfStudy}</p>}
          </div>
        )}

        <div>
          <label>Feedback:</label>
          <textarea
            name="feedback"
            value={formValues.feedback}
            onChange={handleChange}
          ></textarea>
          {errors.feedback && <p>{errors.feedback}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div>
          <h2>Submitted Data:</h2>
          <p>Full Name: {submittedData.fullName}</p>
          <p>Email: {submittedData.email}</p>
          <p>Survey Topic: {submittedData.surveyTopic}</p>
          {submittedData.surveyTopic === "Technology" && (
            <div>
              <p>Favorite Language: {submittedData.favoriteLanguage}</p>
              <p>Years of Experience: {submittedData.yearsOfExperience}</p>
            </div>
          )}
          {submittedData.surveyTopic === "Health" && (
            <div>
              <p>Exercise Frequency: {submittedData.exerciseFrequency}</p>
              <p>Diet Preference: {submittedData.dietPreference}</p>
            </div>
          )}
          {submittedData.surveyTopic === "Education" && (
            <div>
              <p>Highest Qualification: {submittedData.highestQualification}</p>
              <p>Field of Study: {submittedData.fieldOfStudy}</p>
            </div>
          )}
          <p>Feedback: {submittedData.feedback}</p>
        </div>
      )}

      {submittedData &&
        additionalQuestions.length > 0 &&
        renderAdditionalQuestions()}
    </div>
  );
};

export default SurveyForm;
