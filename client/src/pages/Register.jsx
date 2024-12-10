import { Button, Image, Input, Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const RegisterPage = () => {
   const navigate = useNavigate();
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [PassVisible, SetIsPassVisible] = useState(false);
   const [ConfirmVisible, SetIsConfirmVisible] = useState(false);
   const [modalOpen, setModalOpen] = useState(false);
   const [modalMessage, setModalMessage] = useState('');
   const [modalType, setModalType] = useState('success');

   const togglePass = () => SetIsPassVisible(!PassVisible);
   const toggleConfirmPass = () => SetIsConfirmVisible(!ConfirmVisible);

   const handleRegister = async (e) => {
       e.preventDefault();
       try {
           const response = await fetch('http://localhost:5000/api/user/register', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                   username,
                   email,
                   password,
                   confirmPassword
               })
           });
           const data = await response.json();

           if (response.ok) {
               setModalType('success');
               setModalMessage('Registration successful!');
               setModalOpen(true);
               setTimeout(() => {
                   navigate('/login');
               }, 2000);
           } else {
               setModalType('error');
               setModalMessage(data.error || data.errors?.join('\n'));
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
                       className="h-screen object-cover rounded-none w-screen"
                       src="/image/register_bg.jpg"
                   />
               </div>

               <div className="w-full flex flex-col items-center p-12 gap-20">
                   <div className="space-y-8 text-center">
                       <p className="text-4xl font-bold">Register</p>
                       <p>Welcome To Smart Home</p>
                   </div>

                   <div className="space-y-8 w-full md:px-24">
                       <Input
                           type="text"
                           label="Username"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           labelPlacement="outside"
                           startContent={
                               <Icon icon="material-symbols:person" />
                           }
                       />

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

                       <div className="space-y-4">
                           <Input
                               type={ConfirmVisible ? "text" : "password"}
                               label="Confirm Password"
                               value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)}
                               labelPlacement="outside"
                               startContent={
                                   <Icon icon="mdi:password" />
                               }
                               endContent={
                                   <button className="focus:outline-none" type="button" onClick={toggleConfirmPass}>
                                       {ConfirmVisible ? (
                                           <Icon icon="formkit:eyeclosed" />
                                       ) : (
                                           <Icon icon="mdi:eye" />
                                       )}
                                   </button>
                               }
                           />
                           <Button size="sm" variant="light" className="text-xs opacity-50">
                               <a href="/login">Already have an account</a>
                           </Button>
                       </div>

                       <Button onClick={handleRegister} color="primary" radius="full" className="w-full">
                           Register
                       </Button>
                   </div>
               </div>
           </div>
           <ModalComponent />
       </>
   );
};

export default RegisterPage;