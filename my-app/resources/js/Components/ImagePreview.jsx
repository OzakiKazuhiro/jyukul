import React from "react";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const ImagePreview = ({ existingImages, newImages, onRemoveImage }) => {
    return (
        <>
            {(existingImages.length > 0 || newImages.length > 0) && (
                <>
                    <Text mb={2}>プレビュー</Text>
                    <Box display={"flex"} p={4} bg={"gray.200"} mb={4}>
                        {existingImages.map((image, index) => (
                            <Box key={image.id} px={2} position={"relative"}>
                                <img
                                    src={`${import.meta.env.VITE_APP_URL}/${
                                        image.file_path
                                    }`}
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
                                        onRemoveImage(index, "existing")
                                    }
                                />
                            </Box>
                        ))}
                        {newImages.map((image, index) => (
                            <Box key={image.name} px={2} position={"relative"}>
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
                                    onClick={() => onRemoveImage(index, "new")}
                                />
                            </Box>
                        ))}
                    </Box>
                </>
            )}
        </>
    );
};

export default ImagePreview;
