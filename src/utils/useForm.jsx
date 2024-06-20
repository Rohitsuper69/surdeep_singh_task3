import { useState } from "react";

const useForm = (initialValues, validate, fetchAdditionalQuestions) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormValues({
        ...formValues,
        [name]: checked,
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const additionalData = await fetchAdditionalQuestions(
          formValues.surveyTopic
        );
        setAdditionalQuestions(additionalData);
        setSubmittedData(formValues);
      } catch (error) {
        console.error("Error fetching additional questions:", error);
      }
    }
  };

  return {
    formValues,
    errors,
    submittedData,
    additionalQuestions,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
