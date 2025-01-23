import {
    Box,
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

const Edit = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [loading, setLoading] = useState(false);
    const [hoverRating, setHoverRating] = useState({
        teaching_rating: 0,
        study_rating: 0,
        facility_rating: 0,
        cost_rating: 0,
    });
    const [values, setValues] = useState({
        review_id: props.review.id,
        teaching_rating: props.review.teaching_rating || 1, // 講師の教え方
        study_rating: props.review.study_rating || 1, // 定期テスト対策
        facility_rating: props.review.facility_rating || 1, // 自習室の環境
        cost_rating: props.review.cost_rating || 1, // 料金
        comment: props.review.comment,
    });

    const handleCheck = (e) => {
        e.preventDefault();
        onOpen();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        e.target.disabled = true;
        router.post(route("review.update"), values);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        router.delete(route("review.destroy", { id: values.review_id }));
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
                            この内容で更新しますか？
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
                                {loading ? <Spinner /> : "更新する"}
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
                    レビューを編集
                </Heading>
                <Text fontSize={"xl"} color={"gray.500"} mb={2}>
                    {props.review.shop.name}
                </Text>
                <form onSubmit={handleCheck}>
                    <FormControl isRequired mb={4}>
                        <FormLabel
                            htmlFor="teaching_rating"
                            fontWeight={"bold"}
                        >
                            講師の教え方
                        </FormLabel>
                        <HStack spacing={1} mb={4}>
                            {Array(5)
                                .fill("")
                                .map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        color={
                                            i < values.teaching_rating ||
                                            i < hoverRating.teaching_rating
                                                ? "red.500"
                                                : "gray.300"
                                        }
                                        cursor={"pointer"}
                                        onClick={() =>
                                            setValues({
                                                ...values,
                                                teaching_rating: i + 1,
                                            })
                                        }
                                        onMouseEnter={() =>
                                            setHoverRating({
                                                ...hoverRating,
                                                teaching_rating: i + 1,
                                            })
                                        }
                                        onMouseLeave={() =>
                                            setHoverRating({
                                                ...hoverRating,
                                                teaching_rating: 0,
                                            })
                                        }
                                    />
                                ))}
                        </HStack>
                        <FormLabel htmlFor="study_rating" fontWeight={"bold"}>
                            定期テスト対策の充実度
                        </FormLabel>
                        <HStack spacing={1} mb={4}>
                            {Array(5)
                                .fill("")
                                .map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        color={
                                            i < values.study_rating ||
                                            i < hoverRating.study_rating
                                                ? "blue.500"
                                                : "gray.300"
                                        }
                                        cursor={"pointer"}
                                        onClick={() =>
                                            setValues({
                                                ...values,
                                                study_rating: i + 1,
                                            })
                                        }
                                        onMouseEnter={() =>
                                            setHoverRating({
                                                ...hoverRating,
                                                study_rating: i + 1,
                                            })
                                        }
                                        onMouseLeave={() =>
                                            setHoverRating({
                                                ...hoverRating,
                                                study_rating: 0,
                                            })
                                        }
                                    />
                                ))}
                        </HStack>
                        <FormLabel
                            htmlFor="facility_rating"
                            fontWeight={"bold"}
                        >
                            自習室の環境
                        </FormLabel>
                        <HStack spacing={1} mb={4}>
                            {Array(5)
                                .fill("")
                                .map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        color={
                                            i < values.facility_rating ||
                                            i < hoverRating.facility_rating
                                                ? "green.500"
                                                : "gray.300"
                                        }
                                        cursor={"pointer"}
                                        onClick={() =>
                                            setValues({
                                                ...values,
                                                facility_rating: i + 1,
                                            })
                                        }
                                        onMouseEnter={() =>
                                            setHoverRating({
                                                ...hoverRating,
                                                facility_rating: i + 1,
                                            })
                                        }
                                        onMouseLeave={() =>
                                            setHoverRating({
                                                ...hoverRating,
                                                facility_rating: 0,
                                            })
                                        }
                                    />
                                ))}
                        </HStack>
                        <FormLabel htmlFor="cost_rating" fontWeight={"bold"}>
                            料金
                        </FormLabel>
                        <HStack spacing={1} mb={4}>
                            {Array(5)
                                .fill("")
                                .map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        color={
                                            i < values.cost_rating ||
                                            i < hoverRating.cost_rating
                                                ? "yellow.500"
                                                : "gray.300"
                                        }
                                        cursor={"pointer"}
                                        onClick={() =>
                                            setValues({
                                                ...values,
                                                cost_rating: i + 1,
                                            })
                                        }
                                        onMouseEnter={() =>
                                            setHoverRating({
                                                ...hoverRating,
                                                cost_rating: i + 1,
                                            })
                                        }
                                        onMouseLeave={() =>
                                            setHoverRating({
                                                ...hoverRating,
                                                cost_rating: 0,
                                            })
                                        }
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
                            value={values.comment}
                            bg="white"
                        ></Textarea>
                    </FormControl>
                    <Button type="submit" colorScheme="green" mt={4}>
                        更新する
                    </Button>
                </form>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
                <form onSubmit={handleDelete}>
                    <Button type="submit" colorScheme="red" m={4}>
                        削除する
                    </Button>
                </form>
            </Box>
        </>
    );
};
Edit.layout = (page) => <MainLayout children={page} title="レビュー編集" />;
export default Edit;
