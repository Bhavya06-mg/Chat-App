import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import  { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from "axios"
import { useHistory } from 'react-router-dom'


const SignUp = () => {

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const toast = useToast()
  const history =useHistory();

  const [name,setName] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [confirmPswd,setConfirmpassword] = useState();
  const [pic,setPic] = useState();
  const [loading, setLoading] = useState(false)


  const submitHandler = async () =>{
    setLoading(true)
    if(!name || !email || !password || !confirmPswd) {
      toast({
        title:"Please fill all the fields",
        status:"warning",
        duration: 5000,
        isClosable :true,
        position: "bottom",
      })
      setLoading(false);
      return;
    }
    if(password !== confirmPswd){
      toast({
        title:"Passwords Do Not Match",
        status:"warning",
        duration: 5000,
        isClosable:true,
        position:"bottom"
      })
      setLoading(false)
      return;
    }
    try{
      const config = {
        headers: {
          "Content-type":"application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password, 
          pic,
        },
        config
      )
      console.log(data);
      toast({
        title:"registration Successful",
        status:"success",
        duration: 5000,
        isClosable: true,
        position:"bottom"
      })
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false)
      history.push('/chats')
    }
    catch(error){
      toast({
        title: "error occured",
        description: error.response?.data?.message || error.message,
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom"
      })
      setLoading(false)
    }
  }

   const postDetails = (pics) =>{
    setLoading(true);
    if(pics === undefined){
      toast({
        title:"Plese select sn Image!",
        status:"warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      return;

    }
    console.log(pics);
    if(pics.type === "image/jpeg" || pics.type ==="image/png"){
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset","chat-app");
      data.append("cloud_name","dtico7vtw")
      fetch("https://api.cloudinary.com/v1_1/dtico7vtw/image/upload",{
        method: "post",
        body: data,
      }).then((res) => res.json()).then((data) =>{
        setPic(data.url.toString());
        console.log(data.url.toString());
        setLoading(false);
      })
         .catch((err) => {
          console.log(err);
          setLoading(false);
        });

    }
    else{
      toast({
        title:"Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position:"bottom",
      });
      setLoading(false);
      return;
    }
  }

  

  return (
    <VStack spacing={'5px'} color='black'>
      
      <FormControl id ='first-name' isRequired >
        <FormLabel>Name</FormLabel>
        <Input 
        placeholder='Enter Your Name'
        onChange={(e) => setName(e.target.value)}
        />
      </FormControl>


        <FormControl id ='email' isRequired >
        <FormLabel>E-mail</FormLabel>
        <Input 
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
        onChange={(e) => setPassword(e.target.value)}
        />
        <InputRightElement width="4.5rem" onClick={handleClick}>
        <Button h="1.75rem" size="sm" colorScheme='blue'>
          {show ? "Hide" : "Show"}
        </Button>
        </InputRightElement>
      </InputGroup>
        
      </FormControl>


<FormControl id ='confirm-password' isRequired >
      <FormLabel>Confirm Password</FormLabel>
      <InputGroup size="md">
      <Input 
        type={show?"text":"password"}
        placeholder='Confrim Password '
        onChange={(e) => setConfirmpassword(e.target.value)}
        />
        <InputRightElement width="4.5rem" onClick={handleClick}>
        <Button h="1.75rem" size="sm" colorScheme='blue'>
          {show ? "Hide" : "Show"}
        </Button>
        </InputRightElement>
      </InputGroup>
        
      </FormControl>

<FormControl id ="pic"  >
        <FormLabel>Upload your Picture</FormLabel>
        <Input 
        type='file'
        p={1.5}
        accept='image/*'
        onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

<Button
  colorScheme='blue'
  width="100%"
  style={{ marginTop: 15 }}
  onClick={submitHandler}
  isLoading={loading}
  >
  Sign Up

</Button>

    </VStack>
  )
}

export default SignUp