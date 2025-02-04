import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import {
    Box,
    Button,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Text,
    useToast,
} from "@chakra-ui/react";
import { router, useForm } from "@inertiajs/react";

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
        router.post(route("shop.store"), data);
    };

    return (
        <Box p={4} m={4}>
            <Heading
                as="h2"
                textAlign="center"
                fontSize={{ base: 18, md: 24 }}
                mb={6}
            >
                学習塾・新規作成
            </Heading>
            <form onSubmit={handleSubmit}>
                <FormControl id="name" mb={4}>
                    <FormLabel fontWeight={"bold"}>学習塾名</FormLabel>
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
                    {/* プレビュー */}
                    {data.images.length > 0 && (
                        <>
                            <Text mb={2}>プレビュー</Text>
                            <Box display={"flex"} p={4} bg={"gray.200"} mb={4}>
                                {data.images.map((image) => (
                                    <Box key={image.name} px={2}>
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={image.name}
                                            style={{ width: 100 }}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </>
                    )}
                    <Box>
                        <Button
                            as="label"
                            htmlFor="fileInput"
                            colorScheme="teal"
                            cursor="pointer"
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
                            display="none" // ファイル選択のネイティブボタンを非表示に
                        />
                    </Box>
                </FormControl>
                <Button type="submit" colorScheme="teal">
                    作成
                </Button>
            </form>
        </Box>
    );
};
Create.layout = (page) => <MainLayout children={page} title={"店舗新規作成"} />;
export default Create;
