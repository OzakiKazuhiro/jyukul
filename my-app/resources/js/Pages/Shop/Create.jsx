import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Box, Heading, useToast } from "@chakra-ui/react";
import { useForm } from "@inertiajs/react";
import ShopForm from "@/Components/ShopForm";

const Create = () => {
    const { data, setData, post, errors } = useForm({
        name: "",
        location: "",
        description: "",
        images: [],
    });

    const toast = useToast();
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 3) {
            toast({
                title: "画像は3つまで選択可能です。",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            e.target.value = "";
            return;
        }
        setData("images", files);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("shop.store"));
    };

    const handleRemoveCreateImage = (index, type) => {
        if (type === "new") {
            const images = [...data.images];
            images.splice(index, 1);
            setData("images", images);
        }
    };

    return (
        <Box
            p={4}
            mx="auto"
            mt={4}
            w={{ base: "90%", sm: "400px", md: "600px", lg: "800px" }}
        >
            <Heading
                as="h2"
                fontSize={{ base: 18, md: 24 }}
                mb={6}
                textAlign="center"
            >
                学習塾・新規作成
            </Heading>
            <ShopForm
                data={data}
                setData={setData}
                errors={errors}
                onSubmit={handleSubmit}
                onImageChange={handleImageChange}
                onRemoveImage={handleRemoveCreateImage}
            />
        </Box>
    );
};

Create.layout = (page) => <MainLayout children={page} title={"店舗新規作成"} />;
export default Create;
