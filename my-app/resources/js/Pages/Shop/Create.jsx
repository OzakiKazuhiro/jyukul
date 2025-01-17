import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
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
import { router, useForm } from '@inertiajs/react';

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
      })

      e.target.value = "";
      return;
    }
    setData("images", files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(route("shop.store"),data);
  }
    
    return (
        <Box p={4} m={4} w={{ base: "90%", md: 700 }}>
            <Heading as="h2" fontSize={{ base: 18, md: 24 }} mb={6}>
                店舗新規作成
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
                    <FormLabel fontWeight={"bold"}>画像</FormLabel>
                    {/* プレビュー */}
                    {data.images.length > 0 && (
                        <>
                            <Text mb={2}>プレビュー</Text>  
                            <Box display={"flex"} p={4} bg={"gray.200"}>
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
                    <Input
                        type="file"
                        id="images"
                        accept=".jpg,.jpeg,.png"
                        multiple
                        name="images"
                        onChange={handleImageChange}
                    />
                </FormControl>
                <Button type="submit" colorScheme="teal">
                    作成
                </Button>
            </form>
        </Box>
    );
}
Create.layout = (page) => <MainLayout children={page} title={"店舗新規作成"} />;
export default Create;