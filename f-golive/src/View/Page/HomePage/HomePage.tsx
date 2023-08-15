import { useGetAuthenticatedUser } from "Flux/Selector";
import { Navigate } from "react-router-dom";

export const HomePage = () => {

    const authenticatedUser = useGetAuthenticatedUser()

    if (!authenticatedUser) {
        return <Navigate to={'/'} />
      }


    return(
        <div>Hi</div>
    );
}