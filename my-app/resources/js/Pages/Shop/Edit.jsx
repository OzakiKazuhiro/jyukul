import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Box, Heading, Button, useToast } from "@chakra-ui/react";
import { router, useForm } from "@inertiajs/react";
import ShopForm from "@/Components/ShopForm";

const Edit = (props) => {
    const existingImages = props.shop.shop_images
        ? props.shop.shop_images.map((image) => ({
              id: image.id,
              file_name: image.file_name,
              file_path: image.file_path,
          }))
        : [];

    const { data, setData, errors } = useForm({
        id: props.shop.id,
        name: props.shop.name,
        location: props.shop.location,
        description: props.shop.description,
        images: [],
        existingImages: existingImages,
        deletedImages: [],
    });

    const toast = useToast();
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + data.existingImages.length > 3) {
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

    const handleRemoveEditImage = (index, type) => {
        if (type === "existing") {
            const images = data.existingImages;
            const deletedImage = images.splice(index, 1)[0];
            setData("existingImages", images);
            setData("deletedImages", [...data.deletedImages, deletedImage.id]);
        } else if (type === "new") {
            const images = data.images;
            images.splice(index, 1);
            setData("images", images);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("shop.update"), data);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        router.delete(route("shop.destroy", { id: data.id }));
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
                店舗の編集
            </Heading>
            <ShopForm
                data={data}
                setData={setData}
                errors={errors}
                onSubmit={handleSubmit}
                onImageChange={handleImageChange}
                existingImages={data.existingImages}
                onRemoveImage={handleRemoveEditImage}
                isEdit={true}
            />
            <Box display={"flex"} justifyContent={"center"}>
                <form onSubmit={handleDelete}>
                    <Button type="submit" colorScheme="red" m={4}>
                        削除する
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

Edit.layout = (page) => <MainLayout children={page} title={"店舗の編集"} />;
export default Edit;
