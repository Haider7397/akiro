import { useGetAuthenticatedUser, useGetToken, useGetTokenStatus } from "Flux/Selector";
import { useProperty } from "Framework/View";
import { useInteraction } from "Framework/View/Hooks/useInteraction";
import { Box, Button, FormControl, Input, Label, Paragraph } from "View/Common";
import { Spacer } from "View/Common/Layout/Spacer";
import { useEffect } from "react";
import Actions, { useDispatch } from 'Flux';
import { tokenSlice } from "Flux/Slice/Token/TokenSlice";

export const GenerateTokenPage = () => {

    const dispatch = useDispatch()
    const token = useGetToken()
    const tokenStatus = useGetTokenStatus()

    const allowedDigits$ = useProperty<string>("123456789");
    const validateToken$ = useProperty<string>("");

    const onGenerate$ = useInteraction<void>();
    const onValidate$ = useInteraction<void>();

    const authenticatedUser = useGetAuthenticatedUser()

    useEffect(() => {
        const onGenerate$$ = onGenerate$.subscribe(() => {
            dispatch(
                Actions[tokenSlice.name].CreateTokenRequest({
                    id: authenticatedUser?.user.id,
                    allowedDigits: allowedDigits$.value
                })
            )
        })

        return () => onGenerate$$.unsubscribe()
    }, [onGenerate$, dispatch])

    useEffect(() => {
        const onValidate$$ = onValidate$.subscribe(() => {
            dispatch(
                Actions[tokenSlice.name].ValidateTokenRequest({
                    token: validateToken$.value,
                })
            )
        })

        return () => onValidate$$.unsubscribe()
    }, [onGenerate$, dispatch])



    return (
        <div>
            <FormControl>
                <Label>Specify your digits</Label>
                <Input type='text' onChange$={allowedDigits$} placeholder={"123456789"} initialValue={allowedDigits$.value} />
            </FormControl>
            {
                token && <Paragraph color={"primary"} highlight={"bold"}>Token: {token.token}</Paragraph>
            }
            <Button variant='primary' onClick$={onGenerate$}>Generate</Button>
            <FormControl>
                <Label>Validate your token</Label>
                <Input type='text' onChange$={validateToken$} placeholder={"XXXX-XXXX-XXXX-XXXX"} />
            </FormControl>
            {
                tokenStatus && <Paragraph color={"primary"} highlight={"bold"}>TokenStatus: {tokenStatus}</Paragraph>
            }
            <Button variant='primary' onClick$={onValidate$}>Validate</Button>
        </div>
    );
}