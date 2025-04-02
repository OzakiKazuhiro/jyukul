import React from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
} from "@chakra-ui/react";
import ImagePreview from "./ImagePreview";

const ShopForm = ({
    data,
    setData,
    onSubmit,
    onImageChange,
    existingImages = [],
    onRemoveImage,
    isEdit = false,
}) => {
    return (
        <Box p={4} m={4}>
            <form onSubmit={onSubmit}>
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
                    <ImagePreview
                        existingImages={existingImages}
                        newImages={data.images}
                        onRemoveImage={onRemoveImage}
                    />
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
                            onChange={onImageChange}
                            display="none"
                        />
                    </Box>
                </FormControl>
                <Button type="submit" colorScheme="teal">
                    {isEdit ? "更新" : "作成"}
                </Button>
            </form>
        </Box>
    );
};

export default ShopForm;
