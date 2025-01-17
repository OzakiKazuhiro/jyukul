import {
    Box,
    Checkbox,
    Text,
    Heading,
    FormControl,
    FormLabel,
    Textarea,
    Button,
    HStack,
    useDisclosure,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { router } from "@inertiajs/react";
import { StarIcon } from "@chakra-ui/icons";

const Create = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [loading, setLoading] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);
    const [values, setValues] = useState({
        shop_id: props.shop.id,
        rating: 1,
        comment: "",
        anonymous: false, // 匿名かどうかの状態を追加
    });

    const handleCheck = (e) => {
        e.preventDefault();
        onOpen();
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setValues({
            ...values,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setValues({
    //         ...values,
    //         [name]: value,
    //     });
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        e.target.disabled = true;
        router.post(route("review.store"), values);
    };
    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>最終確認</AlertDialogHeader>
                        <AlertDialogBody>
                            この内容で投稿しますか？
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                キャンセル
                            </Button>
                            <Button
                                colorScheme="blue"
                                ml={3}
                                onClick={handleSubmit}
                            >
                                {loading ? <Spinner /> : "投稿する"}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <Box
                p={4}
                m={4}
                mx={"auto"}
                bg={"gray.100"}
                borderRadius={"md"}
                boxShadow={"md"}
                w={{ base: "90%", md: 700 }}
            >
                <Heading as="h2" size={"md"} mb={4} color={"blue.900"}>
                    レビューを投稿
                </Heading>
                <Text fontSize={"xl"} color={"gray.500"} mb={2}>
                    {props.shop.name}
                </Text>
                <form onSubmit={handleCheck}>
                    <FormControl isRequired mb={4}>
                        <FormLabel htmlFor="rating" fontWeight={"bold"}>
                            評価
                        </FormLabel>
                        <HStack spacing={1} mb={4}>
                            {Array(5)
                                .fill("")
                                .map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        color={
                                            i < values.rating || i < hoverRating
                                                ? "yellow.500"
                                                : "gray.300"
                                        }
                                        cursor={"pointer"}
                                        onClick={() =>
                                            setValues({
                                                ...values,
                                                rating: i + 1,
                                            })
                                        }
                                        onMouseEnter={() =>
                                            setHoverRating(i + 1)
                                        }
                                        onMouseLeave={() => setHoverRating(0)}
                                    />
                                ))}
                        </HStack>
                    </FormControl>
                    <FormControl isRequired mb={4}>
                        <FormLabel htmlFor="comment" fontWeight={"bold"}>
                            コメント
                        </FormLabel>
                        <Textarea
                            id="comment"
                            name="comment"
                            onChange={handleChange}
                        ></Textarea>
                    </FormControl>

                    {/* 匿名で投稿するチェックボックスを追加 */}
                    <FormControl mb={4}>
                        <HStack spacing={4}>
                            <Checkbox
                                name="anonymous"
                                isChecked={values.anonymous}
                                onChange={handleChange}
                            >
                                匿名で投稿する
                            </Checkbox>
                        </HStack>
                    </FormControl>

                    <Button type="submit" colorScheme="blue" mt={4}>
                        投稿する
                    </Button>
                </form>
            </Box>
        </>
    );
};
Create.layout = (page) => <MainLayout children={page} title="レビュー投稿" />;
export default Create;
