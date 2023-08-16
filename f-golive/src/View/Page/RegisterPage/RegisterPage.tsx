import { useProperty } from 'Framework/View';
import { useInteraction } from 'Framework/View/Hooks/useInteraction';
import { PageLayout } from 'View/Layout';
import { Box, FormControl,Label,Input, Button, Paragraph } from "View/Common";
import { Spacer } from "View/Common/Layout/Spacer";
import { useEffect } from 'react';
import Actions ,{ useDispatch } from 'Flux';
import { authenticationSlice } from 'Flux/Slice/Authentication/AuthenticationSlice';
import { useNavigate } from 'react-router-dom';


export const RegisterPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const firstName$ = useProperty<string>("");
    const lastName$ = useProperty<string>("");
    const userName$ = useProperty<string>("");
    const email$ = useProperty<string>("");
    const password$ = useProperty<string>("");

    const onSubmit$= useInteraction<void>();

    useEffect(()=>{
        const onSubmit$$ = onSubmit$.subscribe(()=>{
            dispatch(
                Actions[authenticationSlice.name].registerRequest({
                    firstName:firstName$.value,
                    lastName: lastName$.value,
                    userName:userName$.value,
                    email: email$.value,
                    password: password$.value,
                })
            )
            navigate("/")
        })

        return () => onSubmit$$.unsubscribe()
    },[onSubmit$])

    return(
        <PageLayout>
            <Box 
                 title={'Welcome to the register page'}
                 action={<Button  variant='primary' onClick$={onSubmit$} value={undefined}>Sign Up</Button>}
            >
            <Spacer/>
            <FormControl>
                <Label>First Name</Label>
                <Input type='text' onChange$={firstName$} placeholder={"First Name"} />
            </FormControl>
            <FormControl>
                <Label>Last Name</Label>
                <Input type='text' onChange$={lastName$} placeholder={"Last Name"} />
            </FormControl>
            <FormControl>
                <Label>User Name</Label>
                <Input type='text' onChange$={userName$} placeholder={"User Name"} />
            </FormControl>
            <FormControl>
                <Label>Email</Label>
                <Input type='text' onChange$={email$} placeholder={"User Name"} />
            </FormControl>
            <FormControl>
                <Label>Password</Label>
                <Input type='password' onChange$={password$} placeholder={"Password"} />
            </FormControl>
            <div className='flex justify-center items-center'>
                <Paragraph>Already have an account? <a href='/' className='underline cursor-pointer text-blue-400'>Signin</a></Paragraph>
            </div>
            <Spacer/>
            </Box>
        </PageLayout>
    );
}