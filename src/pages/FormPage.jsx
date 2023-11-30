import { useSelector } from "react-redux";
import AnordnungsForm from "../components/forms/AnordnungsForm";
import { getSelectedApplication } from "../store/slices/application";

const FormPage = () => {
  const selectedApplication = useSelector(getSelectedApplication);

  return <AnordnungsForm dataIn={selectedApplication} />;
};

export default FormPage;
