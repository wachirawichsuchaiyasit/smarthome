import { Icon } from "@iconify/react/dist/iconify.js"
import { Input, Switch, Card, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";



export default function Outdoor() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOpen = () => {
        onOpen()
    }

    return (
        <>
            <div className="p-2 mt-4 md:container md:mx-auto">


                <div className="flex justify-between items-center">
                    <a href={"/"} className="flex  items-center">
                        <Icon icon="icon-park-outline:left" width="36" height="36" />
                        <h1 className="font-bold text-2xl uppercase">Outdoor</h1>
                    </a>
                    <Button isIconOnly color="primary" className="m-4 rounded-full" onClick={handleOpen}>
                        <Icon icon="material-symbols:add" width="24" height="24" />
                    </Button>
                </div>

                <div className="flex flex-col mt-4 gap-4 md:flex-row">

                    <div className="rounded-3xl bg-[#F4F4F4] w-full flex  p-6  justify-between md:w-fit md:gap-6 md:flex-col-reverse">
                        <div className="flex flex-col justify-between gap-5">
                            <h2 className="font-bold text-xl">Lamp</h2>
                            <Switch defaultSelected />
                        </div>
                        <Card className="border-none shadow-none ">
                            <Image
                                src="/img/imghome/outdoor.png"
                                width={164}
                                height={87}
                            />
                        </Card>
                    </div>

                    
                </div>
            </div>


            <FormData isOpen={isOpen} onClose={onClose} />
        </>
    )
}


const FormData = ({ isOpen, onClose }) => {

    return (
        <>
            <Modal
                size={"md"}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">เพิ่มข้อมูล</ModalHeader>
                            <ModalBody>
                                <Input
                                    type="text"
                                    label="Name"
                                    placeholder="Devices name"
                                    labelPlacement="outside"

                                />
                                <Input
                                    type="file"
                                    label="Upload image"
                                    placeholder="Devices name"
                                    labelPlacement="outside"

                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Create
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}