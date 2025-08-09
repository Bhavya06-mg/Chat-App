import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from "axios"
import { ChatState } from '../../Context/ChatProvider'


  const Login = () => {
  const toast = useToast()
  const history =useHistory();
  const [show, setShow] = useState(false)
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [loading, setLoading] = useState(false)

  const { setUser } =ChatState()


   const handleClick = () => setShow(!show)

   const submitHandler = async() =>{
    setLoading(true);
    if(!email || !password){
      toast({
        title:"Please Fill all the Fields",
        status:"warning",
        duration: 5000,
        isClosable: true,
        position:"bottom"
      })
      setLoading(false);
      return
    }
    try{
      const config = {
        headers: {
          "content-Type":"application/json",
        },
      };

    const { data } = await axios.post(
        "/api/user/login",
        {
          email,
          password, 
        },
        config
      )
      console.log("Login success, response data:", data); 
      toast({
        title:"Login Successful",
        status:"success",
        duration: 5000,
        isClosable: true,
        position:"bottom"
      })
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false)
      history.push('/chats')
    }
    catch(error){
      toast({
        title: "error occured",
        description:error.response.data.message,
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom"
      })
      setLoading(false)
    }


   }
 
   return (
     <VStack spacing={'5px'} color='black'> 
         <FormControl id ='email' isRequired >
         <FormLabel>Email</FormLabel>
         <Input 
         value={email}
         placeholder='Enter Your Email'
         onChange={(e) => setEmail(e.target.value)}
         />
       </FormControl>
 
        <FormControl id ='password' isRequired >
       <FormLabel>Password</FormLabel>
       <InputGroup size="md">
       <Input 
         type={show?"text":"password"}
         placeholder='Enter Your Password'
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         />
         <InputRightElement width="4.5rem" onClick={handleClick}>
         <Button h="1.75rem" size="sm" colorScheme='blue'>
           {show ? "Hide" : "Show"}
         </Button>
         </InputRightElement>
       </InputGroup>
         
       </FormControl>
 
 
 
 <Button
  colorScheme ="blue"
   width="100%"
   style={{ marginTop: 15 }}
   onClick={submitHandler}
   isLoading={loading}
   >
   Login
 
 </Button>
 <Button
  variant="solid"
  colorScheme="red"
  width="100%"
  onClick={() => {
    setEmail("guest@example.com");
    setPassword("123456");
 }}
 >
Get Guest User Credential
  
 </Button>
 
     </VStack>
   )
}

export default Login