import { useGetAuthenticatedUser} from "Flux/Selector";
import { PageLayout } from "View/Layout";
import { Navigate } from "react-router-dom";
import { GenerateTokenPage } from "./components/GenerateTokenPage/GenerateTokenPage";
import { ShowTokenPage } from "./components/ShowTokenPage/ShowTokenPage";
import { Box, Button } from "View/Common";
import { useEffect, useState } from "react";
import { useInteraction } from "Framework/View/Hooks/useInteraction";
import { Spacer } from "View/Common/Layout/Spacer";

export const HomePage = () => {


    const authenticatedUser = useGetAuthenticatedUser()

    const onChangeView$ = useInteraction<void>();


    const [changeView, setChangeView] = useState<boolean>(false);

    useEffect(()=>{
        const onChangeView$$ = onChangeView$.subscribe(()=>{
            setChangeView(!changeView)
        })

        return () => onChangeView$$.unsubscribe()
    },[onChangeView$,changeView])

    if (!authenticatedUser) {
        return <Navigate to={'/'} />
    }


    return(
        <PageLayout>
            <Box
            title={!changeView ? 'Generate and validate 16 digit token' : 'Generate tokens in loop'}
            >
                <Spacer />
                <div className="flex justify-end items-center">
                    <Button variant='primary' onClick$={onChangeView$} value={undefined}>{!changeView ? 'Generate in Loop' : 'Generate single token'}</Button>
                </div>
                {
                    !changeView ? <GenerateTokenPage/>:<ShowTokenPage />
                }
            </Box>
        </PageLayout>
    );
}