import Axios, {AxiosError} from 'axios';

const registerInterceptor = (
    setError: (err: string) => void,
    setWarning: (err: string) => void
) => {
  Axios.interceptors.request.use(
      conf => conf,
      error => Promise.reject(error)
  );

  Axios.interceptors.response.use(
      next => Promise.resolve(next),
      (error: AxiosError) => {
        if (error.isAxiosError) {
          if (error.response) {
            if (error.response.status === 403) {
              setWarning("Please sign in");
            } else {
              if (error.response.data) {
                if (error.response.data.value) {
                  setError(error.response.data.value);
                } else if (error.response.data.error) {
                  setError(error.response.data.error);
                } else {
                  setError(error.response.data);
                }
              } else {
                setError("Unexpected error")
              }
            }
          } else if (error.request) {
            setError("Errore durante la comunicazione con il server")
          } else {
            setError("Unexpected error");
          }
        } else {
          setError("Unexpected error");
        }
        return Promise.reject(error);
      }
  );
}

export default registerInterceptor;
