import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
    useToast,
    Heading,
    Text,
    IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { router, useForm } from "@inertiajs/react";

const Edit = (props) => {
    const existingImages = props.shop.shop_images
        ? props.shop.shop_images.map((image) => ({
              id: image.id,
              file_name: image.file_name,
              file_path: image.file_path,
          }))
        : [];

    const { data, setData, post, errors } = useForm({
        id: props.shop.id,
        name: props.shop.name,
        location: props.shop.location,
        description: props.shop.description,
        images: [],
        existingImages: existingImages, //既に登録されている画像
        deletedImages: [], // 削除された画像のIDを保持
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

    // 画像削除
    //イベントも渡す
    const handleRemoveImage = (index, type, e) => {
        if (type === "existing") {
            const images = data.existingImages;
            // index番目の要素を削除し、その後の要素を詰める
            // images.splice(index, 1);
            const deletedImage = images.splice(index, 1)[0]; // 削除された画像を取得
            setData("existingImages", images);
            setData("deletedImages", [...data.deletedImages, deletedImage.id]); // 削除された画像のIDを追加
        } else if (type === "new") {
            const images = data.images;
            // index番目の要素を削除し、その後の要素を詰める
            images.splice(index, 1);
            setData("images", images);

            // getElementByIdでinput要素を複数取得する
            const dataTransfer = new DataTransfer();
            const imageFiles = document.getElementById("images").files;

            Array.from(imageFiles).forEach((file, i) => {
                if (i !== index) {
                    dataTransfer.items.add(file);
                }
            });
            document.getElementById("images").files = dataTransfer.files;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("shop.update"), data);
    };
    // 削除
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
            <Heading as="h2" fontSize={{ base: 18, md: 24 }} mb={6}>
                店舗の編集
            </Heading>
            <form onSubmit={handleSubmit}>
                <FormControl id="name" mb={4}>
                    <FormLabel fontWeight={"bold"}>店舗名</FormLabel>
                    <Input
                        isRequired
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                </FormControl>
                <FormControl id="location" mb={4}>
                    <FormLabel fontWeight={"bold"}>場所</FormLabel>
                    <Input
                        isRequired
                        type="text"
                        id="location"
                        name="location"
                        value={data.location}
                        onChange={(e) => setData("location", e.target.value)}
                    />
                </FormControl>
                <FormControl id="description" mb={4}>
                    <FormLabel fontWeight={"bold"}>説明</FormLabel>
                    <Textarea
                        isRequired
                        id="description"
                        name="description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                    />
                </FormControl>
                <FormControl id="images" mb={4}>
                    <FormLabel fontWeight={"bold"}>
                        画像※３つまで選択可能（jpeg,png,jpg,webp）
                    </FormLabel>
                    <Text mb={2}>プレビュー</Text>

                    <Box display={"flex"} p={4} bg={"gray.200"}>
                        {data.existingImages.map((image, index) => (
                            <Box key={image.id} px={2} position={"relative"}>
                                <img
                                    src={
                                        import.meta.env.VITE_APP_URL +
                                        "/" +
                                        image.file_path
                                    }
                                    alt={image.file_name}
                                    style={{ width: 100 }}
                                />
                                <IconButton
                                    isRound={true}
                                    position={"absolute"}
                                    top={{ base: -4, md: -5 }}
                                    right="0"
                                    variant="solid"
                                    colorScheme="gray"
                                    aria-label="Done"
                                    fontSize={{ base: "10" }}
                                    icon={<CloseIcon />}
                                    onClick={() =>
                                        handleRemoveImage(index, "existing")
                                    }
                                />
                            </Box>
                        ))}
                        {/* プレビュー */}
                        {data.images.length > 0 && (
                            <Box display={"flex"}>
                                {data.images.map((image, index) => (
                                    <Box
                                        key={image.name}
                                        px={2}
                                        position={"relative"}
                                    >
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={image.name}
                                            style={{ width: 100 }}
                                        />
                                        <IconButton
                                            isRound={true}
                                            position={"absolute"}
                                            top={{ base: -4, md: -5 }}
                                            right="0"
                                            variant="solid"
                                            colorScheme="gray"
                                            aria-label="Done"
                                            fontSize={{ base: "10" }}
                                            icon={<CloseIcon />}
                                            onClick={() =>
                                                handleRemoveImage(index, "new")
                                            }
                                        />
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>
                    <Button
                        as="label"
                        htmlFor="fileInput"
                        colorScheme="teal"
                        cursor="pointer"
                        mt={3}
                    >
                        ファイルを選択
                    </Button>
                    <Input
                        type="file"
                        id="fileInput"
                        accept="image/jpeg, image/png, image/jpg, image/webp"
                        multiple
                        name="images"
                        onChange={handleImageChange}
                        display="none"
                    />
                </FormControl>
                <Button type="submit" colorScheme="teal">
                    更新
                </Button>
            </form>

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
