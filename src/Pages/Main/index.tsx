import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Checkbox, Flex, Grid, GridItem, Heading, IconButton, Input, Text } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import { useEffect, useRef, useState } from "react"
import skyBG from '../../Assets/Image/blue-sky.jpg'

export const Main = () => {
    const [list, setList] = useState([]);
    const [alert, setAlert] = useState(false);
    const [count, setCount] = useState(0);
    const inputted = useRef("");

    function addTask(inputted: { current: { value: string } }): void {
        const descriptions = inputted.current.value

        if (descriptions.match(/^(?!\s*$).+/g)) {
            const temp = [...list, {
                desc: descriptions,
                isCheck: false
            }];
            setList(temp);
            setAlert(false);
            localStorage.setItem('todolisted', JSON.stringify(temp));
        } else setAlert(true);

        inputted.current.value = "";
    }

    useEffect(() => {
        const listed = JSON.parse(localStorage.getItem('todolisted'));
        if(listed){
            setList(listed);
            let counted =  0;
            for(const list of listed){
                if(list.isCheck) counted++;
            }
            setCount(counted);
        }
    },[])

    const deleteTask = (index) => {
        const temp = [...list];
        temp.splice(index, 1);
        setList(temp);
        localStorage.setItem('todolisted', JSON.stringify(temp));
    }

    const checkedTask = (index) => {
        const temp = [...list];
        if (temp[index].isCheck) {
            temp[index].isCheck = false;
            setCount(count-1);
        } else {
            temp[index].isCheck = true;
            setCount(count+1);
        }

        setList(temp);
        localStorage.setItem('todolisted', JSON.stringify(temp));
    }

    return (
        <>
            <Box display={"flex"} justifyContent={"center"} backgroundImage={skyBG} minH={'100vh'}>
            {
                alert ? <Alert status='warning' position={'absolute'}>
                    <AlertIcon />
                    <AlertTitle>Task cannot be empty!</AlertTitle>
                    <AlertDescription>Please input any letter/words</AlertDescription>
                </Alert> : ''
            }
                <Box mt={20} borderRadius={"md"} borderWidth={"1px"} width={'1200px'} height={'fit-content'}>
                    {/* list section  */}
                    <Box padding={'40px'} backgroundColor={'#ffff'}>
                        {/* header */}
                        <Box>
                            <Heading as='h1' size='xl' noOfLines={1} textAlign={"center"} fontFamily={'monospace'} textDecoration={'underline'}>
                                Chores To Do List
                            </Heading>
                        </Box>

                        {/* list of todolist */}
                        {/* <Checkbox defaultChecked>Checkbox</Checkbox>   */}
                        {
                            list && list.map((el, idx) => (
                                // <Box my={5} display={"flex"}>
                                //     <Checkbox></Checkbox>
                                //     <Box key={idx} fontWeight="semibold">{el.desc}</Box>
                                // </Box>

                                <Grid key={idx} templateColumns={'1fr 7fr 2fr'} gap={7} my={5} ms={5}>
                                    <GridItem>
                                        <Checkbox mt={1.5} size={'lg'} colorScheme="green" onChange={() => checkedTask(idx)} isChecked={el.isCheck}></Checkbox>
                                    </GridItem>
                                    <GridItem>
                                        <Text noOfLines={1} fontSize={'xl'} textDecoration={list[idx].isCheck ? 'line-through' : 'none'}>{el.desc}</Text>
                                    </GridItem>
                                    <GridItem>
                                        <IconButton aria-label='Delete Task' fontSize={23} colorScheme="red" size={'md'} variant={'outline'} icon={<DeleteIcon />} onClick={() => deleteTask(idx)} />
                                    </GridItem>
                                </Grid>
                            ))
                        }

                    </Box>

                    {/* input section  */}
                    <Box borderTop={'1px'} padding={'40px'} backgroundColor={'#ffff'}>
                        {/* list of done list */}
                        <Box fontSize={'2xl'} fontWeight={'bold'} my={5} textAlign={'center'}>
                            Done : {count}
                        </Box>
                        <Heading as='h5' size='sm' mb={5}>
                            Add to do
                        </Heading>
                        <Input ref={inputted} placeholder="Please input your new task here ..." borderColor={"#EDF2F7"} />
                        <Button onClick={() => addTask(inputted)} backgroundColor={"aqua"} color={"black"} mt={"5"}> ADD TASK</Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
