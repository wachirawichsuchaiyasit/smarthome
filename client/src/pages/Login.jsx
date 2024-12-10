import { Button, Image, Input ,  Modal, ModalContent, ModalHeader, ModalBody  } from "@nextui-org/react"

import { Icon } from "@iconify/react/dist/iconify.js"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
   const navigate = useNavigate();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [PassVisible, SetIsPassVisible] = useState(false);
   const [modalOpen, setModalOpen] = useState(false);
   const [modalMessage, setModalMessage] = useState('');
   const [modalType, setModalType] = useState('success');

   const togglePass = () => SetIsPassVisible(!PassVisible);

   const handleLogin = async (e) => {
       e.preventDefault();
       try {
           const response = await fetch('http://localhost:5000/api/user/login', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({ email, password })
           });
           const data = await response.json();

           if (response.ok) {
               setModalType('success');
               setModalMessage('Login successful!');
               setModalOpen(true);
               setTimeout(() => {
                   navigate('/');
               }, 2000);
           } else {
               setModalType('error');
               setModalMessage(data.error);
               setModalOpen(true);
           }
       } catch (error) {
           setModalType('error');
           setModalMessage('Connection error');
           setModalOpen(true);
       }
   };

   const ModalComponent = () => (
       <Modal 
           isOpen={modalOpen} 
           onClose={() => setModalOpen(false)}
           className="py-6"
       >
           <ModalContent>
               <ModalHeader className={modalType === 'success' ? 'text-green-500' : 'text-red-500'}>
                   {modalType === 'success' ? 'Success' : 'Error'}
               </ModalHeader>
               <ModalBody>
                   <p>{modalMessage}</p>
                   <Button 
                       color={modalType === 'success' ? 'success' : 'danger'}
                       onClick={() => setModalOpen(false)}
                       className="mt-4"
                   >
                       Close
                   </Button>
               </ModalBody>
           </ModalContent>
       </Modal>
   );

   return (
       <>
           <div className="flex">
               <div className="w-full hidden md:block">
                   <Image
                       className="w-screen h-screen rounded-none object-cover"
                       src="/image/login.jpg"
                   />
               </div>
               <div className="w-full flex flex-col items-center p-12 space-y-24">
                   <div className="space-y-8 text-center">
                       <p className="text-4xl font-bold">Login</p>
                       <p>Welcome To Smart Home</p>
                   </div>

                   <div className="space-y-12 w-full md:px-24">
                       <Input
                           type="email"
                           label="Email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           labelPlacement="outside"
                           startContent={
                               <Icon icon="ic:baseline-email" />
                           }
                       />

                       <div className="space-y-4">
                           <Input
                               type={PassVisible ? "text" : "password"}
                               label="Password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               labelPlacement="outside"
                               startContent={
                                   <Icon icon="mdi:password" />
                               }
                               endContent={
                                   <button className="focus:outline-none" type="button" onClick={togglePass}>
                                       {PassVisible ? (
                                           <Icon icon="formkit:eyeclosed" />
                                       ) : (
                                           <Icon icon="mdi:eye" />
                                       )}
                                   </button>
                               }
                           />
                           <Button size="sm" variant="light" className="text-xs opacity-50">
                               <a href="/register">Create Account</a>
                           </Button>
                       </div>

                       <Button onClick={handleLogin} color="primary" radius="full" className="w-full">
                           Login
                       </Button>
                   </div>
               </div>
           </div>
           <ModalComponent />
       </>
   );
};

export default LoginPage;