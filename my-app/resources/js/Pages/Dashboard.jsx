import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import { Head, usePage, useForm } from "@inertiajs/react";
import {
    Box,
    Link,
    Button,
    Heading,
    VStack,
    Avatar,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    useToast,
    HStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function Dashboard({}) {
    const { auth } = usePage().props;
    const toast = useToast();
    const [isEditing, setIsEditing] = useState(false);

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        username: auth.name,
        email: auth.user.email,
        avatar: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("_method", "PATCH"); // Method spoofing
        formData.append("name", data.name);
        formData.append("email", data.email);
        if (data.avatar) {
            formData.append("avatar", data.avatar);
        }

        // Using post instead of patch for file upload
        post(route("profile.update"), {
            onSuccess: () => {
                console.log("プロフィール更新成功");
                setIsEditing(false);
                toast({
                    title: "プロフィールを更新しました",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            },
            onError: (errors) => {
                console.error(errors);
                toast({
                    title: "エラーが発生しました",
                    description: Object.values(errors).join(", "),
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            },
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData("avatar", file);
    };

    return (
        <Box p={6}>
            <Heading textAlign={"center"} mb={6}>
                マイページ
            </Heading>

            <Box maxW="md" mx="auto" mb={8}>
                <VStack spacing={4} align="center">
                    <Avatar
                        size="2xl"
                        name={auth.user.name}
                        src={auth.user.avatar_url}
                    />

                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <VStack spacing={4}>
                                <FormControl isInvalid={errors.name}>
                                    <FormLabel>新しいユーザー名</FormLabel>
                                    <Input
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    <FormErrorMessage>
                                        {errors.name}
                                    </FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={errors.avatar}>
                                    <FormLabel>アバター画像</FormLabel>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    <FormErrorMessage>
                                        {errors.avatar}
                                    </FormErrorMessage>
                                </FormControl>

                                <HStack spacing={4}>
                                    <Button
                                        type="submit"
                                        colorScheme="blue"
                                        isLoading={processing}
                                    >
                                        保存
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setIsEditing(false);
                                            reset();
                                        }}
                                    >
                                        キャンセル
                                    </Button>
                                </HStack>
                            </VStack>
                        </form>
                    ) : (
                        <Button
                            onClick={() => setIsEditing(true)}
                            colorScheme="blue"
                            variant="outline"
                        >
                            プロフィールを編集
                        </Button>
                    )}
                </VStack>
            </Box>

            <VStack m={4}>
                <Link
                    href={route("review.indexByUser", { userId: auth.user.id })}
                >
                    <Button colorScheme={"teal"}>投稿したレビュー</Button>
                </Link>
                <Box m={4}>
                    <Link
                        href={route("shop.indexByUser", {
                            userId: auth.user.id,
                        })}
                    >
                        <Button colorScheme={"green"}>
                            登録した学習塾一覧
                        </Button>
                    </Link>
                </Box>
            </VStack>
        </Box>
    );
}

Dashboard.layout = (page) => <MainLayout children={page} title="Dashboard" />;
