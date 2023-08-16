import { useProperty } from 'Framework/View';
import { useInteraction } from 'Framework/View/Hooks/useInteraction';
import { PageLayout } from 'View/Layout';
import { Box, FormControl,Label,Input, Button, Paragraph } from "View/Common";
import { Spacer } from "View/Common/Layout/Spacer";
import { useEffect } from 'react';
import Actions ,{ useDispatch } from 'Flux';
import { authenticationSlice } from 'Flux/Slice/Authentication/AuthenticationSlice';
import { useGetAuthenticatedUser } from 'Flux/Selector';
import { Navigate } from 'react-router-dom';


export const LoginPage = () => {

    const dispatch = useDispatch()
    const authenticatedUser = useGetAuthenticatedUser()

    const email$ = useProperty<string>("");
    const password$ = useProperty<string>("");

    const onSubmit$= useInteraction<void>();

    useEffect(()=>{
        const onSubmit$$ = onSubmit$.subscribe(()=>{
            dispatch(
                Actions[authenticationSlice.name].loginRequest({
                    email: email$.value,
                    password: password$.value,
                })
            )
        })

        return () => onSubmit$$.unsubscribe()
    },[onSubmit$])


    if (authenticatedUser) {
        return <Navigate to={'/home'} />
      }

    return(
        <PageLayout>
            <Box 
                 title={'Welcome to the login page'}
                 action={<Button  variant='primary' onClick$={onSubmit$} value={undefined}>Sign In</Button>}
            >
            <Spacer/>
            <FormControl>
                <Label>Email</Label>
                <Input type='text' onChange$={email$} placeholder={"User Name"} />
            </FormControl>
            <FormControl>
                <Label>Password</Label>
                <Input type='password' onChange$={password$} placeholder={"Password"} />
            </FormControl>
            <div className='flex justify-center items-center'>
                <Paragraph>Don't have an account? <a href='/register' className='underline cursor-pointer text-blue-400'>Signup</a></Paragraph>
            </div>
            <Spacer/>
            </Box>
        </PageLayout>
    );
}