import { useNavigation } from "react-router-dom"


const SubmitButton = ({ text }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state.status === 'submitting'
  return (
    <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
      {
        isSubmitting ?
          <>
            <span className="loading loading-spinner"></span>
          </> : text || 'submit'
      }
    </button>
  )
}

export default SubmitButton
