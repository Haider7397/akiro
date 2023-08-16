import { useProperty } from "Framework/View";
import { Button, FormControl, Input, Label, Table } from "View/Common";
import { useEffect, useState } from "react";
import Actions, { useDispatch } from 'Flux';
import { tokenSlice } from "Flux/Slice/Token/TokenSlice";
import { useGetAllToken, useGetAuthenticatedUser } from "Flux/Selector";
import { useInteraction } from "Framework/View/Hooks/useInteraction";

export const ShowTokenPage = () =>{

    const dispatch = useDispatch()

    const allowedDigits$ = useProperty<string>("123456789");

    const onStart$ = useInteraction<void>();
    const onStop$ = useInteraction<void>();
    const onValidate$ = useInteraction<string>();

    const [loop, setLoop] = useState<boolean>(false);
    const [intervalID, setIntervalID] = useState<any>();
 
    const authenticatedUser = useGetAuthenticatedUser()
    const tokens = useGetAllToken()

    useEffect(() => {
        const onStart$$ = onStart$.subscribe((value:any) => {
            setLoop(true)
            setIntervalID(setInterval(()=>{
                dispatch(
                    Actions[tokenSlice.name].CreateTokenRequest({
                        id: authenticatedUser?.user.id,
                        allowedDigits: allowedDigits$.value
                    })
                )
                dispatch(
                    Actions[tokenSlice.name].GetAllTokenRequest({
                        userId: authenticatedUser?.user.id,
                    }) 
                )
            },2000))

        })

        return () => onStart$$.unsubscribe()
    }, [onStart$, dispatch,intervalID])

    useEffect(()=>{
        dispatch(
            Actions[tokenSlice.name].GetAllTokenRequest({
                userId: authenticatedUser?.user.id,
            }) 
        )
    },[])

    useEffect(() => {
        const onValidate$$ = onValidate$.subscribe((value:string) => {
            dispatch(
                Actions[tokenSlice.name].ValidateTokenRequest({
                    token: value,
                })
            )
            dispatch(
                Actions[tokenSlice.name].GetAllTokenRequest({
                    userId: authenticatedUser?.user.id,
                }) 
            )
        })

        return () => onValidate$$.unsubscribe()
    }, [onValidate$, dispatch])

    useEffect(() => {
        const onStop$$ = onStop$.subscribe((value:any) => {
            setLoop(false)
            clearInterval(intervalID)
        })

        return () => onStop$$.unsubscribe()
    }, [onStop$, intervalID])

    
    return(
        <div>
            <FormControl>
                <Label>Specify your digits</Label>
                <Input type='text' onChange$={allowedDigits$} placeholder={"123456789"} initialValue={allowedDigits$.value} />
            </FormControl>
            {
                !loop ? <Button variant='primary' onClick$={onStart$} value={undefined}>Start</Button>:
                <Button variant='primary' onClick$={onStop$} value={undefined}>Stop</Button>
            }
            <Table>
                <Table.Head>
                    <Table.Row>
                                <Table.Cell key={'token'}><div className="text-center text-sm font-bold">Token</div></Table.Cell>
                                <Table.Cell key={'validityStatus'}><div className="text-center text-sm font-bold">Validity Status</div></Table.Cell>
                                <Table.Cell key={'action'}><div className="text-center text-sm font-bold">Validate</div></Table.Cell>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {
                        tokens?.map((item,index) => (
                            <Table.Row key={index+1}>
                                <Table.Cell key={`${index+1}_token`}>
                                <div className="text-sm overflow-hidden whitespace-nowrap text-ellipsis text-center">
                                    {item.token}
                                </div>
                                </Table.Cell>
                                <Table.Cell key={`${index+1}_validityStatus`}>
                                    <div className="text-sm overflow-hidden whitespace-nowrap text-ellipsis text-center">
                                        {item.validityStatus}
                                    </div>
                                </Table.Cell>
                                <Table.Cell key={`${index+1}_forward_primer_box`}>
                                    <div className="text-sm overflow-hidden whitespace-nowrap text-ellipsis text-center">
                                        <Button variant={'cancel'} onClick$={onValidate$} value={item.token}>Validate</Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        </div>
    );
}